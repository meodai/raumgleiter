<script>
  import collect from 'collect.js';
  import { throttle, debounce } from 'throttle-debounce';

  export default {
    props: {
      entries: {
        type: Array,
        required: true,
      },
      allowSwipe: {
        type: Boolean,
        default: true,
      },
      startEq: {
        type: Number,
        default: 0,
      },
      slices: {
        type: Number,
        required: false,
        default: 4,
      },
      loopVideos: {
        type: Boolean,
        default: true,
      },
      timePerSlide: {
        type: Number,
        default: 8,
      },
    },
    data () {
      return {
        app: null,
        pixiSlides: [],
        entriesInOrder: [],
        videoElements: [],
        loadingCount: -1,
        currentSlideEq: 0,
        sliderHasStarted: false,
        videoIsPlaying: false,
        isMuted: true,
        sliderTimeout: null,
        isTransitioning: false,

        appWidth: 0,
        appHeight: 0,
        scrollRatio: 0,
        videoQuality: 720,
      };
    },
    computed: {
      currentVideoElement () {
        return this.videoElements[this.currentSlideEq] || null;
      },
      currentEntry () {
        return this.entriesInOrder[this.currentSlideEq] || null;
      },
      videoResolution () {
        const resolutions = {
          1080: [1920,1080],
          720: [1280,720],
          480: [854,480],
        };
        return resolutions[this.videoQuality];
      },
      videoWidth () {
        return this.videoResolution[0];
      },
      videoHeight () {
        return this.videoResolution[1];
      },
      videoScale () {
        return (this.appWidth / this.appHeight > this.videoWidth / this.videoHeight)
          ? this.appWidth / this.videoWidth
          : this.appHeight / this.videoHeight;
      },
      sliderIsOnAutoplay () {
        return this.loopVideos && !this.isSingleVideo;
      },
      isSingleVideo () {
        return this.entries.length === 1;
      },
      currentDuration () {
        return this.entriesInOrder[this.currentSlideEq].duration || this.timePerSlide;
      },
    },
    created () {
      this.loadEntriesInOrder();
    },
    mounted () {
      this.setVideoQuality();
      this.startApp();

      document.addEventListener('keyup', this.listenToArrowKeys);
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      this.$nuxt.$on('video-teaser-slide', this.slideToIndex);
      this.$nuxt.$on('intro-intersect', this.toggleVisibility);

      this.scrollHandler();
    },
    beforeDestroy () {
      this.killApp();
      document.removeEventListener('keyup', this.listenToArrowKeys);
      window.removeEventListener('resize', this.resizeHandler);
      window.removeEventListener('scroll', this.scrollHandler);
      this.$nuxt.$off('video-teaser-slide', this.slideToIndex);
      this.$nuxt.$off('intro-intersect', this.toggleVisibility);
    },
    methods: {
      startApp () {
        const ticker = PIXI.Ticker.shared;
        ticker.autoStart = false;
        ticker.stop();

        this.app = this.createPIXIApp();
        this.setAppDimensions();

        this.$refs.canvas.appendChild(this.app.view);

        this.loadAllSlides();
        ticker.start();
      },
      killApp () {
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
        this.videoElements.forEach((video) => {
          if (video) {
            video.pause();
            video.removeAttribute('src'); // empty source
            video.load();
          }
        });
      },
      /*
      Initialisation
       */
      loadEntriesInOrder () {
        // sort entries array: the one that should be displayed first
        // is placed at the first position
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
          resizeTo: window,
        });
      },
      /*
      Loading
      */
      loadAllSlides () {
        this.loadingCount = -1;
        this.loadNextSlide();
      },
      loadNextSlide () {
        this.loadingCount++;

        if (!this.sliderHasStarted && this.loadingCount > 0) {
          this.startSlider();
        }

        if (this.loadingCount >= this.entries.length) {
          // All slides were loaded
          this.loadAlphaCover();
          return;
        }

        const entryToLoad = this.entriesInOrder[this.loadingCount];

        if (entryToLoad.video) {
          // Load video
          this.createVideoTexture(entryToLoad.video, this.loadingCount);
        } else {
          // Add a blank slide
          this.addSlide(PIXI.Texture.EMPTY, 'blank');
          this.entriesInOrder[this.loadingCount].duration = this.timePerSlide;
          this.loadNextSlide();
        }
      },
      loadAlphaCover () {
        this.alphaCover = this.createAlphaCover();
      },
      /*
      Texture Init
       */
      createMask () {
        const slices = this.slices;
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
      createVideoTexture (video, entryIndex) {
        const $video = document.createElement('video');
        // const isHslFile = src.endsWith('m3u8');

        $video.setAttribute('crossOrigin', 'anonymous');
        $video.setAttribute('preload', 'auto');
        $video.setAttribute('muted', null);
        $video.setAttribute('playsinline', null);
        $video.muted = true;

        this.videoElements[entryIndex] = $video;

        $video.addEventListener('ended', () => {
          this.videoReachedEnd();
          this.videoEndHandler($video);
        });

        $video.addEventListener('loadedmetadata', () => {
          this.entriesInOrder[entryIndex].duration = $video.duration;
        });

        $video.addEventListener('play', () => {
          if (this.currentSlideEq !== entryIndex) {
            $video.pause();
            $video.currentTime = 0;
          }
        });

        $video.src = video[this.videoQuality];
        const texture = PIXI.Texture.from($video);

        this.addSlide(texture, 'video');
        this.loadNextSlide();
      },
      createSlide (texture) {
        const slide = new PIXI.Container();
        const partSize = this.partSize();

        const displacementSprite = new PIXI.Sprite(
          new PIXI.Texture.from(this.createMask()),
        );

        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
        displacementFilter.scale.x = 40;
        displacementFilter.scale.y = 1;

        slide.filters = [displacementFilter];

        const container = new PIXI.Container();
        const videoSprite = new PIXI.Sprite(texture);

        const moveDelta = {
          x: 0, y: 0,
        };

        if (this.appWidth / this.appHeight > this.videoWidth / this.videoHeight) {
          moveDelta.y = this.videoScale * this.videoHeight - this.appHeight;
        } else {
          moveDelta.x = this.videoScale * this.videoWidth - this.appWidth;
        }

        // Stretch to fullscreen
        videoSprite.width = this.videoScale * this.videoWidth;
        videoSprite.height = this.videoScale * this.videoHeight;

        const rect = new PIXI.Graphics();
        // Rectangle
        rect.beginFill(0xFFFFFF);
        rect.drawRect(
          0,
          0,
          this.appWidth,
          this.appHeight,
        );
        rect.endFill();

        container.position.x = this.appWidth * 3;
        videoSprite.position.x = 0;

        videoSprite.position.x -= moveDelta.x / 2;
        videoSprite.position.y -= moveDelta.y / 2;

        container.addChild(videoSprite);
        container.mask = rect;

        slide.addChild(container);

        return { slide, container, partSize, displacementFilter };
      },
      addSlide (texture, type) {
        const { slide, container, partSize, displacementFilter } = this.createSlide(texture);

        this.pixiSlides.push({
          slide,
          container,
          partSize,
          texture,
          type,
          displacementFilter,
        });

        this.app.stage.addChild(slide);
      },
      createAlphaCover () {
        const container = new PIXI.Container();
        const cover = new PIXI.Graphics();
        // cover angle
        cover.beginFill(0x000000);
        cover.drawRect(
          0,
          0,
          this.appWidth,
          this.appHeight,
        );
        cover.endFill();

        container.addChild(cover);

        const AlphaFilter = new PIXI.filters.AlphaFilter();
        AlphaFilter.alpha = Math.min(0.75, this.scrollRatio);
        container.filters = [AlphaFilter];

        this.app.stage.addChild(container);
        this.alphaFilter = AlphaFilter;

        return container;
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
        this.sliderHasStarted = true;
        this.slideIn(0);
      },
      slideToIndex (eq) {
        const index = collect(this.entriesInOrder).search(entry => entry.index === eq);
        this.slide(index);
      },
      slide (eq = 0) {
        clearTimeout(this.sliderTimeout);

        this.slideOut(eq);
        this.slideIn(eq);
        this.$emit('slide', this.entriesInOrder[eq].index);
      },
      slideOut (newSlideEq) {
        const oldSlide = this.pixiSlides[this.currentSlideEq];

        if (!oldSlide) {
          return;
        }

        oldSlide.slide.zOrder = 1;
        const videoSprite = oldSlide.container;

        gsap.to(videoSprite.position, 1.1, {
          x: -this.app.screen.width - (this.app.screen.width * 0.2),
          ease: 'power4.out',
          delay: 0.3,
          onComplete: () => {
            this.stopAllVideosExcept(newSlideEq);
            oldSlide.slide.zOrder = 0;
          },
        });
      },
      stopAllVideosExcept (eq) {
        this.videoElements.forEach((video, key) => {
          if (video && key !== eq) {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      slideIn (eq) {
        const newSlide = this.pixiSlides[eq];

        if (!newSlide) {
          return;
        }

        this.currentSlideEq = eq;

        this.resetProgressBar();

        if (newSlide.type === 'video') {
          this.currentVideoElement.muted = this.isMuted;
          this.currentVideoElement.play();
        } else {
          // if it is a blank slide, set a timeout to slide
          // to the next one (since there is no video event)
          this.sliderTimeout = setTimeout(this.slideToNext, this.currentEntry.duration * 1000);
        }

        newSlide.slide.zOrder = 2;

        this.resetSlicesPosition(newSlide);

        this.isTransitioning = true;

        gsap.to(newSlide.container.position, 1.5, {
          x: 0,
          ease: 'power4.out',
          onComplete: () => {
            gsap.to(newSlide.displacementFilter.scale, 1, {
              x: 1,
              ease: 'power4.out',
              onComplete: () => {
                this.isTransitioning = false;
              },
            });
          },
        });
      },

      resetSlicesPosition (slide) {
        slide.displacementFilter.scale.x = 40;
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
      setVideoQuality () {
        this.videoQuality = 720;
        // if (window.innerWidth < 400) {
        //   this.videoQuality = 480;
        // } else if (window.innerWidth < 1300) {
        //   this.videoQuality = 720;
        // } else {
        //   this.videoQuality = 1080;
        // }
      },
      resizeHandler: debounce(500, function () {
        this.setAppDimensions();
      }),
      setAppDimensions () {
        this.appWidth = window.innerWidth;
        this.appHeight = window.innerHeight;

        this.app.resize();
      },
      scrollHandler: throttle(50, function () {
        this.scrollRatio = window.scrollY / window.innerHeight;

        if (this.alphaFilter) {
          this.alphaFilter.alpha = Math.min(0.75, this.scrollRatio);
        }
      }),
      toggleVisibility (isIntersecting) {
        if (!this.currentVideoElement) {
          return;
        }
        if (isIntersecting === false && this.scrollRatio > 1) {
          this.currentVideoElement.pause();
        } else if (this.scrollRatio < 1) {
          this.currentVideoElement.play();
        }
      },
      /*
      Mute
      */
      toggleMute () {
        this.isMuted = !this.isMuted;
        if (this.currentVideoElement) {
          this.currentVideoElement.muted = this.isMuted;
        }
      },
      /*
      Helpers
      */
      partSize (multiplier = 1) {
        return 1 / this.slices * multiplier;
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
    />
    <section
      v-for="(entry, i) in entriesInOrder"
      :key="'video-teaser-slice-'+i"
      :class="{'video-teaser__slider--active': currentSlideEq === i}"
      class="video-teaser__slider"
      :aria-hidden="(currentSlideEq !== i)"
    >
      <div
        v-for="(slice, j) in slices"
        :key="'video-teaser-slice-'+i+'-'+j"
        class="video-teaser__slice"
        :style="{
          '--clip-start': partSize(j),
          '--slices': slices,
        }"
        :aria-hidden="(!!j)"
      >
        <div class="video-teaser__slideInner">
          <div class="video-teaser__header">
            <h2 class="video-teaser__title">
              {{ entry.title }}
            </h2>
            <h3 class="video-teaser__subtitle">
              <a href="#section-intro">
                {{ entry.subtitle }}
              </a>
            </h3>
          </div>
        </div>
      </div>
    </section>
    <div
      v-if="sliderIsOnAutoplay"
      class="video-teaser-progress"
      :style="{'--timer': currentDuration}"
      :class="{'play': videoIsPlaying}"
    />
    <button class="video-teaser__mute-button" @click="toggleMute">
      <Unmute :is-muted="isMuted" />
    </button>
  </div>
</template>

<style lang="scss">
.video-teaser {
  position: relative;
  display: block;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
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

.video-teaser__slice {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(100% * var(--clip-start, 0));
  width: calc(100% / var(--slices, 4) + 1px);
  overflow: hidden;
}

.video-teaser__slideInner {
  left: calc(-100% * var(--slices, 4) * var(--clip-start, 0));
  width: 100vw;
}

.video-teaser__slider {
  pointer-events: none;

  &--active {
    pointer-events: all;
  }
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

  &::after {
    opacity: 0;
    transform: translateY(-100%);
    display: inline-block;
    vertical-align: top;
    line-height: 1;
    margin-top: 0.5em;
    font-weight: bold;
    margin-left: 1.5em;
    content: '⭣';
    font-size: .8em;
    transform: translateY(-50%);
  }
}

.video-teaser__slider--active .video-teaser__subtitle {
  transition: 300ms opacity 1100ms;
  opacity: 1;
  color: var(--color-text--inverted);

  &::after {
    opacity: 1;
    transform: translateY(0);
    transition: 300ms opacity 1400ms, 300ms transform 1400ms cubic-bezier(0.3,0.7,.3,1.3);
  }
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
    height: 2px;
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

.video-teaser__mute-button {
  position: absolute;
  left: 10rem;
  bottom: 10rem;
  z-index: 99;
  outline: none;
  cursor: pointer;

  @include bp('phone') {
    left: var(--size-gutter);
    bottom: calc(var(--size-gutter) * 7);
  }
}
</style>
