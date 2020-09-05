<script>
  export default {
    props: {
      startEq: {
        type: Number,
        required: false,
        default: 0,
      },
      slices: {
        type: Number,
        required: false,
        default: 4,
      },
      entries: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        app: null,
        pixiSlides: [],
        loader: new PIXI.Loader(),
        currentSlideEq: 0,
      };
    },
    computed: {
      videoList () {
        return this.$props.entries.map(entry => (entry.video));
      },
    },
    methods: {
      createPIXIApp: function createPIXIApp () {
        return new PIXI.Application({
          transparent: false,
          width: window.innerWidth,
          height: window.innerHeight,
        });
      },
      createVideoTexture: function createVideoElement (src) {
        const $video = document.createElement('video');
        $video.crossOrigin = 'anonymous';
        $video.preload = 'auto';
        $video.muted = true;
        $video.loop = true;
        $video.src = src;

        $video.pause();
        $video.currentTime = 0;

        const texture = PIXI.Texture.from($video);
        texture.baseTexture.resource.autoPlay = false;

        return texture;
      },
      

      createSlide: function createSlide (texture, width, height) {
        const slide = new PIXI.Container();
        const slices = new Array(this.$props.slices).fill('').map(() => new PIXI.Container());
        const partSize = 1 / slices.length;

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

          // console.log(texture.baseTexture.width, texture.baseTexture.height);

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
      slide: function slide (eq = 0) {
        const oldSlide = this.pixiSlides[this.currentSlideEq];
        const newSlide = this.pixiSlides[eq];

        oldSlide.slide.zOrder = 1;
        oldSlide.slices.forEach((videoSprite, i) => {
          gsap.to(videoSprite.position, 1.75, {
            x: -this.app.screen.width,
            ease: 'power4.out',
            onComplete: () => {
              videoSprite.children[0].texture.baseTexture.resource.source.pause();
              videoSprite.children[0].texture.baseTexture.resource.source.currentTime = 0;
            }
          });
        });

        newSlide.slide.zOrder = 2;
        newSlide.slices.forEach((videoSprite, i) => {
          videoSprite.children[0].texture.baseTexture.resource.source.play();
          gsap.to(videoSprite.position, 1.5, {
            x: newSlide.partSize * this.app.screen.width * i,
            ease: 'power4.out',
          });
        });

        this.currentSlideEq = eq;
      },
    },
    mounted () {
      const ticker = PIXI.Ticker.shared;
      ticker.autoStart = false;
      ticker.stop();

      const loader = this.loader;

      this.$props.entries.forEach((entry) => {
        if (entry.title && entry.video) {
          loader.add(entry.title, entry.video);
        } else {
          console.error('VIDEO TEASER: missing resources for video teasers');
        }
      });

      loader.onProgress.add((event, resource) => {
        const texture = this.createVideoTexture(resource.url);

        const {
          slide,
          slices,
          partSize,
        } = this.createSlide(texture, this.app.screen.width, this.app.screen.height);

        this.pixiSlides.push({
          slide,
          slices,
          partSize,
          texture,
        });

        this.app.stage.addChild(slide);
      });

      setInterval(() => {
        let nextEq = this.currentSlideEq + 1;
        if (nextEq > this.pixiSlides.length - 1) {
          nextEq = 0;
        }

        this.slide(nextEq);
      }, 5000)

      this.app = this.createPIXIApp();

      this.$refs.canvas.appendChild(this.app.view);

      // create a video texture from a path
      // const texture = this.createVideoTexture(this.videoList[this.$props.startEq]);

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

      loader.load();
      ticker.start();
    },
    destroy () {
      this.loader.reset();
      if (this.app) {
        while (this.app.children[0]) {
          this.app.removeChild(this.app.children[0]);
        }
        this.app.stop();
        this.app.destory(false, {
          children: true,
          texture: true,
          baseTexture: true,
        });
        this.app = null;
      }
      this.pixiSlides = [];
    },
  };

</script>

<template>
  <div class="video-teaser">
    <div ref="canvas" class="video-teaser__canvas" />
  </div>
</template>

<style lang="scss">
  .video-teaser {
    position: relative;
    display: block;
    width: 100vw;
    height: -webkit-fill-available;
    height: 100vh;
    //overflow: hidden;

    &__canvas {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
