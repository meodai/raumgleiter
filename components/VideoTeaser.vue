<script>
  export default {
    data () {
      return {
        app: null,
        pixiSlides: [],
      };
    },

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
        $video.autoplay = false;
        $video.src = src;

        return PIXI.Texture.from($video);
      },

      createSlide: function createSlide (texture, width, height) {
        const slide = new PIXI.Container();
        const slices = new Array(this.$props.slices).fill('').map(e => new PIXI.Container());
        const partSize = 1 / slices.length;
        const videoSprites = [];

        slices.forEach((container, i) => {
          const rect = new PIXI.Graphics();
          const videoSprite = new PIXI.Sprite(texture);
          videoSprites.push(videoSprite);
          const videoScale = Math.max(1080 / width, 920 / height);

          //console.log(texture.baseTexture.width, texture.baseTexture.height);
          // Stetch to fullscreen
          videoSprite.width = videoScale * width;
          videoSprite.height = videoScale * height;

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

          container.addChild(videoSprite);
          container.mask = rect;

          slide.addChild(container);
        });

        return {slide, slices, partSize};
      },
      slide: function slide () {

      },
    },
    mounted () {
      const ticker = PIXI.Ticker.shared;
      ticker.autoStart = false;
      ticker.stop();

      const loader = new PIXI.Loader();

      this.createPIXIApp();

      this.$props.entries.forEach(entry => {
        loader.add(entry.title, entry.video);
      });


      loader.onProgress.add((event, resource) => {
        const texture = this.createVideoTexture(resource.url);

        const {
          slide,
          slices,
          partSize,
        } = this.createSlide(texture, this.app.screen.width, this.app.screen.height);

        console.log(slices)

        this.pixiSlides.push({
          slide,
          slices,
          partSize,
          texture,
        });

        this.app.stage.addChild(slide);

        setTimeout(() => {
          slices.forEach((videoSprite, i) => {
            gsap.to(videoSprite.position, 2, { x: partSize * this.app.screen.width * i });
          });
        }, 1000);
      });

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
