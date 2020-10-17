<script>
  import collect from 'collect.js';
  import Hls from 'hls.js';
  import { debounce } from 'throttle-debounce';

  export default {
    props: {
      slices: {
        type: Number,
        required: false,
        default: 4,
      },
      entries: {
        type: Array,
        required: true,
      },
      loopVideos: {
        type: Boolean,
        default: true,
      },
      allowSwipe: {
        type: Boolean,
        default: true,
      },
      timePerSlide: {
        type: Number,
        default: 8,
      },
      startEq: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        app: null,
        pixiSlides: [],
        loader: new PIXI.Loader(),
        currentSlideEq: 0,
        sliderHasStarted: false,
        videoIsPlaying: false,
        loadingCount: 0,
        currentVideoDuration: 8,
        sliderTimeout: null,
        isTransitioning: false,
        entriesInOrder: [],
        appWidth: 0,
        appHeight: 0,

        currentVideoWidth: 854,
        currentVideoHeight: 480,

        scrollRatio: 0,
      };
    },
    computed: {
      opacity () {
        return 1 - Math.min(this.scrollRatio, 0.75);
      },
      videoScale () {
        return (this.appWidth / this.appHeight > this.currentVideoWidth / this.currentVideoHeight) ? this.appWidth / this.currentVideoWidth : this.appHeight / this.currentVideoHeight;
      },
      sliderIsOnAutoplay () {
        return this.loopVideos && !this.isSingleVideo;
      },
      isSingleVideo () {
        return this.entries.length === 1;
      },
    },
    created () {
      this.loadEntries();
    },
    mounted () {
      const ticker = PIXI.Ticker.shared;
      ticker.autoStart = false;
      ticker.stop();

      this.app = this.createPIXIApp();
      this.setAppDimensions();
      this.$refs.canvas.appendChild(this.app.view);

      this.loadAllSlides();
      ticker.start();

      document.addEventListener('keyup', this.listenToArrowKeys);
      window.addEventListener('resize', this.resizeHandler);
      this.$nuxt.$on('video-teaser-slide', this.slideToIndex);
      window.addEventListener('scroll', this.scrollHandler, { passive: true });

      this.scrollHandler();
    },
    beforeDestroy () {
      this.loader.reset();
      if (this.app && this.app.children) {
        while (this.app && this.app.children && this.app.children[0]) {
          this.app.removeChild(this.app.children[0]);
        }
        this.app.stop();
        this.app.destroy(false, {
          children: true,
          texture: true,
          baseTexture: true,
        });
        this.app = null;
      }
      this.pixiSlides = [];
      document.removeEventListener('keyup', this.listenToArrowKeys);
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('scroll', this.scrollHandler);
      this.$nuxt.$off('video-teaser-slide', this.slideToIndex);
    },
    methods: {
      /*
      Helpers
       */
      partSize (multiplier = 1) {
        return 1 / this.slices * multiplier;
      },
      /*
      Initialisation
       */
      loadEntries () {
        let entries = collect(this.entries);
        const firstPart = entries.splice(this.startEq);
        entries = firstPart.merge(entries.all());
        this.entriesInOrder = entries.toArray();
      },
      createPIXIApp () {
        return new PIXI.Application({
          transparent: false,
          width: window.innerWidth,
          height: window.innerHeight,
        });
      },
      /*
      Loading
      */
      loadAllSlides () {
        this.loadNextSlide();
      },
      initLoader () {
        this.loader = new PIXI.Loader();
        // this.loader.reset();
        // Trigger next video on load
        this.loader.onProgress.add((event, resource) => {
          if (resource.error === null) {
            this.createVideoTexture(resource.url);
          } else {
            this.loadingCount++;
            this.loadNextSlide();
          }
        });
      },
      loadNextSlide () {
        if (this.loadingCount >= this.entriesInOrder.length) {
          // All slides were loaded
          return;
        }

        const entryToLoad = this.entriesInOrder[this.loadingCount];

        if (entryToLoad.video) {
          // Load video
          this.initLoader();
          this.loader.add(entryToLoad.slug, entryToLoad.video.sd.url);
          this.loader.load();
        } else {
          // Add a blank slide
          this.addSlide(PIXI.Texture.EMPTY, 'blank');
        }
      },
      /*
      Texture Init
       */
      createMask () {
        const slices = 4;
        const can = document.createElement('canvas');
        const ctx = can.getContext('2d');
        const w = window.innerWidth;
        const h = window.innerHeight;
        can.width = w;
        can.height = h;

        for (let i = 0; i < slices; i++) {
          const gradient = ctx.createLinearGradient(
            i * (w / slices), 0,
            (i * (w / slices)) + (w / slices), 0,
          );
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(1, '#000');
          ctx.fillStyle = gradient;
          ctx.fillRect(i * (w / slices), 0, w / slices, h);
        }

        return can;
      },
      createVideoTexture (src) {
        console.log('adding video', src);
        const $video = document.createElement('video');
        // const isHslFile = src.endsWith('m3u8');
        $video.crossOrigin = 'anonymous';
        $video.preload = 'auto';
        $video.muted = true;
        $video.playsinline = true;
        // $video.controls = true;
        // $video.autoplay = true;

        // if (isHslFile) {
        //   $video.width = this.currentVideoWidth;
        //   $video.height = this.currentVideoHeight;
        // }

        // Slide to next slide 1.5s before video ends
        // $video.addEventListener('timeupdate', () => {
        //   const threshold = 1.5;
        //   if ($video.currentTime >= $video.duration - threshold) {
        //     this.videoReachedEnd();
        //   }
        // });

        $video.addEventListener('ended', () => {
          this.videoReachedEnd();
          this.videoEndHandler($video);
        });

        // Load video source
        // if (Hls.isSupported() && isHslFile) {
        //   const hls = new Hls();
        //   hls.loadSource(src);
        //   hls.attachMedia($video);
        //
        //   // Keep texture size, when switching hls video level
        //   texture.baseTexture.on('update', () => {
        //     if (texture.width !== this.currentVideoWidth) {
        //       texture.baseTexture.setRealSize(this.currentVideoWidth, this.currentVideoHeight);
        //     }
        //   }, this);
        //   // hls.on(Hls.Events.LEVEL_SWITCHED, function () {});
        //
        //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //     this.addSlide(texture, 'video');
        //   });
        // } else if ($video.canPlayType('application/vnd.apple.mpegurl') || !isHslFile) {

        // $video.addEventListener('loadedmetadata', () => {

        $video.src = src;
        $video.pause();
        $video.currentTime = 0;

        const texture = PIXI.Texture.from($video);
        texture.baseTexture.resource.autoPlay = false;
        texture.baseTexture.resource.muted = true;

        this.addSlide(texture, 'video');

        // });

        // }
      },
      createSlide (texture, width, height) {
        const slide = new PIXI.Container();

        const slices = new Array(this.$props.slices).fill('').map(() => new PIXI.Container());
        const partSize = this.partSize();

        slices.forEach((container, i) => {
          const rect = new PIXI.Graphics();
          const videoSprite = new PIXI.Sprite(texture);

          const moveDelta = {
            x: 0, y: 0,
          };

          if (width / height > this.currentVideoWidth / this.currentVideoHeight) {
            moveDelta.y = this.videoScale * this.currentVideoHeight - height;
          } else {
            moveDelta.x = this.videoScale * this.currentVideoWidth - width;
          }

          // Stretch to fullscreen
          videoSprite.width = this.videoScale * this.currentVideoWidth;
          videoSprite.height = this.videoScale * this.currentVideoHeight;

          // Rectangle
          rect.beginFill(0xFFFFFF);
          rect.drawRect(
            partSize * width * i,
            0,
            partSize * width + 1,
            height,
          );
          rect.endFill();

          container.position.x = width * 3;
          videoSprite.position.x = partSize * width * -i;

          videoSprite.position.x -= moveDelta.x / 2;
          videoSprite.position.y -= moveDelta.y / 2;

          container.addChild(videoSprite);
          container.mask = rect;

          slide.addChild(container);
        });

        return { slide, slices, partSize };
      },
      addSlide (texture, type) {
        const { slide, slices, partSize } = this.createSlide(texture, this.app.screen.width, this.app.screen.height);

        this.pixiSlides.push({
          slide,
          slices,
          partSize,
          texture,
          type,
        });

        this.app.stage.addChild(slide);
        this.entriesInOrder[this.loadingCount].loaded = true;
        this.startSlider();

        // Load next slide
        this.loadingCount++;
        this.loadNextSlide();
      },

      /*
      Video Events
       */
      videoReachedEnd () {
        if (this.sliderIsOnAutoplay) {
          this.slideToNext();
        }
      },
      videoEndHandler ($video) {
        if (!this.sliderIsOnAutoplay) {
          $video.play();
          this.resetProgressBar();
        }
      },

      /*
      Sliding
       */
      startSlider () {
        if (!this.sliderHasStarted) {
          console.log('start slider');
          this.sliderHasStarted = true;
          this.slideIn(0);
        }
      },
      slideToIndex (eq) {
        const index = collect(this.entriesInOrder).search(entry => entry.index === eq);
        this.slide(index);
      },
      slide (eq = 0) {
        clearTimeout(this.sliderTimeout);

        this.slideOut();
        this.slideIn(eq);
        this.$emit('slide', this.entriesInOrder[eq].index);
      },
      slideOut () {
        const oldSlide = this.pixiSlides[this.currentSlideEq];

        if (!oldSlide) {
          return;
        }

        oldSlide.slide.zOrder = 1;
        oldSlide.slices.forEach((videoSprite, i) => {
          gsap.to(videoSprite.position, 1.75, {
            x: -this.app.screen.width - (this.app.screen.width * 0.2),
            ease: 'power4.out',
            onComplete: () => {
              if (oldSlide.slices.length - 1 === i && oldSlide.type === 'video') {
                oldSlide.texture.baseTexture.resource.source.pause();
                oldSlide.texture.baseTexture.resource.source.currentTime = 0;
              }
            },
          });
        });
      },
      slideIn (eq) {
        const newSlide = this.pixiSlides[eq];

        if (!newSlide) {
          return;
        }

        newSlide.slide.zOrder = 2;

        if (newSlide.type === 'video') {
          // on sliding in, start the video
          console.log('attempting to play video', eq);
          try {
            newSlide.texture.baseTexture.resource.source.play();
          } catch (e) {
            console.log('could not play video', e);
          }
          this.currentVideoDuration = newSlide.texture.baseTexture.resource.source.duration;
        } else {
          // if it is a blank slide, set a timeout to slide
          // to the next one (since there is no video event)
          this.sliderTimeout = setTimeout(this.slideToNext, this.timePerSlide * 1000);
          this.currentVideoDuration = this.timePerSlide;
        }

        this.resetSlicesPosition(newSlide.slices);

        newSlide.slices.forEach((videoSprite, i) => {
          gsap.to(videoSprite.position, 1.5, {
            x: newSlide.partSize * this.app.screen.width * i,
            ease: 'power4.in',
          });
        });

        this.currentSlideEq = eq;

        this.resetProgressBar();

        this.isTransitioning = true;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1500);
      },

      resetSlicesPosition (slices) {
        slices.forEach((slice) => {
          // inferred from `container.position.x = width * 3;`
          slice.position.x = this.app.screen.width * 3;
        });
      },

      isAbleToSlide (swiping) {
        return !this.isTransitioning &&
          !this.isSingleVideo &&
          (this.loopVideos || (swiping && this.allowSwipe));
      },

      getNextEq (eq) {
        return eq + 1 > this.entriesInOrder.length - 1 ? 0 : eq + 1;
      },
      getPrevEq (eq) {
        return eq - 1 < 0 ? this.entriesInOrder.length - 1 : eq - 1;
      },

      slideToNext (swiping = false) {
        if (!this.isAbleToSlide(swiping)) {
          return;
        }

        // Skip about when sliding -> its only shown once
        let nextEq = this.getNextEq(this.currentSlideEq);
        if (this.entriesInOrder[nextEq].slug === 'about') {
          nextEq = this.getNextEq(nextEq);
        }

        // Abort if next slide is not loaded
        // if (!this.entriesInOrder[nextEq].loaded) {
        //   console.log('next slide is not present yet!');
        //   if (!swiping) {
        //     this.sliderTimeout = setTimeout(() => {
        //       this.slideToNext();
        //     }, 1000);
        //   };
        //   return;
        // }

        this.slide(nextEq);
      },
      slideToPrev (swiping = false) {
        if (!this.isAbleToSlide(swiping)) {
          return;
        }

        // Skip about when sliding -> its only shown once
        let prevEq = this.getPrevEq(this.currentSlideEq);
        if (this.entriesInOrder[prevEq].slug === 'about') {
          prevEq = this.getPrevEq(prevEq);
        }

        this.slide(prevEq);
      },

      swipeToNext () {
        this.slideToNext(true);
      },
      swipeToPrev () {
        this.slideToPrev(true);
      },

      listenToArrowKeys (event) {
        switch (event.code) {
          case 'ArrowLeft':
            this.swipeToPrev();
            break;
          case 'ArrowRight':
            this.swipeToNext();
            break;
        }
      },

      /*
      Progress bar
       */
      resetProgressBar () {
        this.videoIsPlaying = false;
        setTimeout(() => {
          this.videoIsPlaying = true;
        }, 200);
      },
      /*
      Resize / Responsive
       */
      resizeHandler: debounce(50, function () {
        this.setAppDimensions();
        this.app.queueResize();
      }),
      scrollHandler () {
        this.scrollRatio = window.scrollY/window.innerHeight;
      },
      setAppDimensions () {
        this.app.width = window.innerWidth;
        this.app.height = window.innerHeight;
        this.appWidth = window.innerWidth;
        this.appHeight = window.innerHeight;
      },
    },
  };

</script>

<template>
  <div
    v-touch:swipe.left="swipeToNext"
    v-touch:swipe.right="swipeToPrev"
    class="video-teaser"
  >
    <div
      ref="canvas"
      class="video-teaser__canvas"
      :style="{'opacity': opacity}"
    />
    <section
      v-for="(entry, i) in entriesInOrder"
      :key="'video-teaser-slice-'+i"
      :class="{'video-teaser__slider--active': currentSlideEq === i}"
      class="video-teaser__slider"
    >
      <div
        v-for="(slice, j) in slices"
        :key="'video-teaser-slice-'+i+'-'+j"
        class="video-teaser__slice"
        :style="{
          'clip-path': `inset(0% ${100 - partSize(j + 1) * 101}% 0% ${partSize(j) * 99.9}%)`,
          '-webkit-clip-path': `inset(0% ${100 - partSize(j + 1) * 101}% 0% ${partSize(j) * 99.9}%)`,
        }"
      >
        <div class="video-teaser__slideInner">
          <div class="video-teaser__header">
            <h2 class="video-teaser__title">
              {{ entry.title }}
            </h2>
            <h3 class="video-teaser__subtitle">
              {{ entry.subtitle }}
            </h3>
          </div>
        </div>
      </div>
    </section>
    <div
      v-if="sliderIsOnAutoplay"
      class="video-teaser-progress"
      :style="{'--timer': currentVideoDuration}"
      :class="{'play': videoIsPlaying}"
    />
  </div>
</template>

<style lang="scss">
.video-teaser {
  position: relative;
  display: block;
  width: 100vw;
  max-width: 100%;
  height: -webkit-fill-available;
  height: 100vh;
  overflow: hidden;

  &__canvas {
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
}

//.video-teaser__swipe-handler {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//}

.video-teaser__slider,
.video-teaser__slice,
.video-teaser__slideInner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.video-teaser__slideInner {
  transform: translateX(100%);
}

.video-teaser__slider--active .video-teaser__slice {
  @for $i from 1 through 6 {
    &:nth-child(#{$i}) .video-teaser__slideInner {
      transition-delay: 100ms + $i * 100ms;
    }
  }
}

.video-teaser__slider--active .video-teaser__slideInner {
  transform: translateX(0%);
  transition: 800ms transform cubic-bezier(0.7, 0.3, 0, 1);

}

.video-teaser__header {
  position: absolute;
  top: 4.5rem;
  left: 10rem;
  right: 20rem;
  color: var(--color-text--inverted);

  @include bp('phone') {
    top: 10rem;
    left: var(--size-gutter);
  }
}

.video-teaser__title {
  @include typo('title--hero');
  @include bp('phone') {
    font-size: 5rem;
  }
}

.video-teaser__subtitle {
  @include typo('default');
  margin-top: var(--size-rat);
  opacity: 0;
}

.video-teaser__slider--active .video-teaser__subtitle {
  transition: 300ms opacity 1100ms;
  opacity: 1;
  color: var(--color-text--inverted);
}

.video-teaser-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  &::after {
    position: absolute;
    content: '';
    background: #fff;
    left: 0;
    top: 0;
    right: 0;
    height: 3px;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &.play::after {
    transition: calc(var(--timer) * 1s) transform linear;
    transform: scaleX(1);
  }
}

.content {
  position: relative;
  z-index: 1;
  background: #fff;
}
</style>
