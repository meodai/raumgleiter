<script>
  import Hls from 'hls.js';

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
      timePerSlide: {
        type: Number,
        default: 8,
      },
    },
    data () {
      return {
        app: null,
        pixiSlides: [],
        loader: new PIXI.Loader(),
        currentSlideEq: 0,
        sliderHasStarted: false,
        sliderIsPlaying: true,
        videoIsPlaying: false,
        loadingCount: 0,
        currentVideoDuration: 8,
        sliderTimeout: null,
      };
    },
    computed: {
      videoList () {
        return this.$props.entries.map(entry => (entry.video));
      },
      sliderIsOnAutoplay () {
        return this.loopVideos && this.sliderIsPlaying && !this.isSingleVideo;
      },
      isSingleVideo () {
        return this.videoList.length === 1;
      },
    },
    created () {
      this.$nuxt.$on('stop-video-header', this.stopSlider);
    },
    mounted () {
      const ticker = PIXI.Ticker.shared;
      ticker.autoStart = false;
      ticker.stop();

      this.app = this.createPIXIApp();
      this.$refs.canvas.appendChild(this.app.view);

      this.loadAllSlides();
      ticker.start();

      /*
      const {
        slide,
        slices,
        partSize,
      } = this.createSlide(texture, this.app.screen.width, this.app.screen.height);

      this.app.stage.addChild(slide);

      window.addEventListener('resize', () => {
        this.app.width = window.innerWidth;
        this.app.height = window.innerHeight;

        this.app.queueResize();
      });
      */
    },
    beforeDestroy () {
      this.loader.reset();
      if (this.app) {
        while (this.app.children[0]) {
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
      this.$nuxt.$off('stop-video-header', this.stopSlider);
    },
    methods: {
      partSize  (multiplier = 1) {
        return 1 / this.slices * multiplier;
      },
      createPIXIApp () {
        return new PIXI.Application({
          transparent: false,
          width: window.innerWidth,
          height: window.innerHeight,
        });
      },
      createVideoTexture (src) {
        const $video = document.createElement('video');
        const extension = /(?:\.([^.]+))?$/.exec(src)[1];
        $video.crossOrigin = 'anonymous';
        $video.preload = 'auto';
        $video.muted = true;

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
        if ($video.canPlayType('application/vnd.apple.mpegurl') || extension !== 'm3u8') {
          $video.src = src;
        } else if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia($video);
        }

        $video.pause();
        $video.currentTime = 0;

        const texture = PIXI.Texture.from($video);
        texture.baseTexture.resource.autoPlay = false;

        return texture;
      },

      createBlankTexture () {
        return PIXI.Texture.EMPTY;
      },

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

      createSlide (texture, width, height) {
        const slide = new PIXI.Container();
        const slices = new Array(this.$props.slices).fill('').map(() => new PIXI.Container());
        const partSize = this.partSize();

        slices.forEach((container, i) => {
          const rect = new PIXI.Graphics();
          const videoSprite = new PIXI.Sprite(texture);
          let videoScale = 1;

          const moveDelta = {
            x: 0, y: 0,
          };

          if (width / height > 1920 / 1080) {
            // videoScale = Math.max(width / 1920, height / 1080);
            videoScale = width / 1920;
            moveDelta.y = videoScale * 1080 - height;
          } else {
            // videoScale = Math.max(1920 / width, 1080 / height);
            videoScale = height / 1080;
            moveDelta.x = videoScale * 1920 - width;
          }

          // Stretch to fullscreen
          videoSprite.width = videoScale * 1920;
          videoSprite.height = videoScale * 1080;

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
      slide (eq = 0) {
        this.$emit('slide', eq);
        this.slideOut();
        this.slideIn(eq);
      },
      slideOut () {
        const oldSlide = this.pixiSlides[this.currentSlideEq];

        oldSlide.slide.zOrder = 1;
        oldSlide.slices.forEach((videoSprite, i) => {
          gsap.to(videoSprite.position, 1.75, {
            x: -this.app.screen.width - (this.app.screen.width * 0.2),
            ease: 'power4.out',
            onComplete: () => {
              if (oldSlide.slices.length === i && oldSlide.type === 'video') {
                oldSlide.texture.baseTexture.resource.source.pause();
                oldSlide.texture.baseTexture.resource.source.currentTime = 0;
              }
            },
          });
        });
      },
      slideIn (eq) {
        const newSlide = this.pixiSlides[eq];

        newSlide.slide.zOrder = 2;

        if (newSlide.type === 'video') {
          // on sliding in, start the video
          newSlide.texture.baseTexture.resource.source.play();
          this.currentVideoDuration = newSlide.texture.baseTexture.resource.source.duration;
        } else {
          // if it is a blank slide, set a timeout to slide
          // to the next one (since there is no video event)
          clearTimeout(this.sliderTimeout);
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
      },

      resetProgressBar () {
        this.videoIsPlaying = false;
        setTimeout(() => {
          this.videoIsPlaying = true;
        }, 10);
      },

      resetSlicesPosition (slices) {
        slices.forEach((slice) => {
          // inferred from `container.position.x = width * 3;`
          slice.position.x = this.app.screen.width * 3;
        });
      },

      slideToNext (swiping = false) {
        if (
          this.isSingleVideo ||
          (!swiping && !this.sliderIsPlaying) ||
          !this.loopVideos
        ) {
          return;
        }

        let nextEq = this.currentSlideEq + 1;
        if (nextEq > this.pixiSlides.length - 1) {
          // nextEq = 0;
          // If we are sliding, the first one will be skipped ('about')
          nextEq = 1;
        }

        this.slide(nextEq);
      },
      slideToPrev (swiping = false) {
        if (
          this.isSingleVideo ||
          (!swiping && !this.sliderIsPlaying) ||
          !this.loopVideos
        ) {
          return;
        }

        let prevEq = this.currentSlideEq - 1;
        if (prevEq < 1) {
          // nextEq = 0;
          // If we are sliding, the first one will be skipped ('about')
          prevEq = this.pixiSlides.length - 1;
        }

        this.slide(prevEq);
      },

      swipeToNext () {
        this.slideToNext(true);
      },
      swipeToPrev () {
        this.slideToPrev(true);
      },

      loadAllSlides () {
        this.loadNextSlide();
      },
      initLoader () {
        this.loader = new PIXI.Loader();
        // Trigger next video on load
        this.loader.onLoad.add((event, resource) => {
          const texture = this.createVideoTexture(resource.url);
          this.addSlide(texture, 'video');
        });
      },
      loadNextSlide () {
        if (this.loadingCount >= this.$props.entries.length) {
          // All slides were loaded
          return;
        }

        const entryToLoad = this.$props.entries[this.loadingCount];

        if (entryToLoad.title && entryToLoad.video) {
          // Load video
          this.initLoader();
          this.loader.add(entryToLoad.title, location.protocol + entryToLoad.video);
          this.loader.load();
        } else if (entryToLoad.title) {
          // Add a blank slide
          const texture = this.createBlankTexture();
          this.addSlide(texture, 'blank');
        }
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

        if (!this.sliderHasStarted) {
          this.sliderHasStarted = true;
          this.slideIn(0);
        }

        // Load next slide
        this.loadingCount++;
        this.loadNextSlide();
      },
      stopSlider () {
        this.sliderIsPlaying = false;
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
    <div ref="canvas" class="video-teaser__canvas" />
    <!--    <div-->
    <!--      class="video-teaser__swipe-handler"-->
    <!--    ></div>-->
    <section
      v-for="(entry, i) in entries"
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
      v-if="!isSingleVideo"
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
      position: absolute;
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
    transition: 800ms transform cubic-bezier(0.7,0.3,0,1);

  }

  .video-teaser__header {
    position: absolute;
    top: 4.5rem;
    left: 10rem;
    right: 20rem;
    color: var(--color-text--inverted);
  }

  .video-teaser__title {
    @include typo('title--hero');
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
</style>
