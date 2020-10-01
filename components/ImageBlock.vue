<script>
  export default {
    /**
      fields = {
        header: 'plaintext' || null,
        body: 'plaintext' || null,
        imagePosition: 'left' | 'right' | 'center' | 'full',
        images: [
          {image}, {image}
        ],
        video: {
          mp4: 'https://url-to-video.mp4'
        },
        iframe: 'https://url-to-iframe.com' || null

        // On solutions page, an 'anchor' key is passed
        anchor: 'key' || null
      }
     */
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },

    data () {
      return {
        activeSlide: 0,
      };
    },

    methods: {
      slideTo: function slideTo(nthChild) {
        const $currentSlide = this.$refs.slide[this.activeSlide];
        const nextNthChild = this.activeSlide === this.images.length - 1 ? 0 : this.activeSlide + 1;
        const $nextSlide = this.$refs.slide[nextNthChild];
        gsap.fromTo($currentSlide, 1.25, {
          x: '-100%',
          rotate: '0deg',
        }, {
          x: '-220%',
          rotate: `${-10 + Math.random() * 20}deg`,
          ease: 'power4.inOut',
          delay: 0.2,
        });
        gsap.fromTo($nextSlide, 1.58, {
          x: '20%',
          rotate: '0deg',
        }, {
          x: '-100%',
          ease: 'power4.inOut',
        });
        this.activeSlide = nextNthChild;
      },
      startSlider: function startSlider () {
        this.slideTo(1);
      },

      visibilityChanged(v) {
        // See https://github.com/Akryum/vue-observe-visibility
        console.log('Visibility changed', v);
      }
    },

    mounted () {
      if (this.isSlider) {
        this.interval = setInterval(() => {
          this.startSlider();
        }, 3000);
      }
    },

    beforeDestroy () {
      clearInterval(this.interval);
    },

    computed: {
      images() {
        return this.fields.images || [];
      },
      firstImage () {
        return this.hasImages ? this.images[0] : null;
      },
      isSlider() {
        return this.images.length > 1;
      },
      hasImages() {
        return this.images && this.images.length > 0;
      },
      hasIframe() {
        return this.fields.iframe;
      },
    },
  };
</script>

<template>
  <article
    :id="fields.anchor || null"
    class="image-block l-design-width"
    :class="`image-block--${fields.imagePosition}`"
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 300,
      throttleOptions: {
        leading: 'visible',
      },
    }"
  >
    <div class="image-block__content">
      <h3 class="image-block__title t-title">{{ fields.header }}</h3>
      <p>{{ fields.body }}</p>
    </div>

    <div v-if="hasImages" class="image-block__images" :class="{'image-block__images--slider': isSlider}">
      <ResponsiveImage
        :image="firstImage"
        class="image-block__image"
        :class="{'image-block__image--placeholder': isSlider}"
      />
      <div v-if="isSlider" class="image-block__slides">
        <div
          v-for="(image, i) in images"
          :key="i + image.src"
          class="image-block__slide"
          :ref="'slide'"
        >
          <ResponsiveImage
            :image="image"
            class="image-block__image"
          />
        </div>
      </div>
    </div>

    <div v-if="hasIframe" class="image-block__iframe-container">
      <iframe class="image-block__iframe" :src="fields.iframe"></iframe>
    </div>


  </article>
</template>

<style lang="scss">
  .image-block {
    --image-block-gutter: 5rem;
    display: flex;
    flex-direction: row-reverse;
    margin-left: calc(-1 * var(--image-block-gutter));
    padding-top: var(--size-pony);
    padding-bottom: calc(var(--size-pony) - var(--image-block-gutter));
    overflow: hidden;

    &:nth-child(2n) {
      background: #f2f2f2;
    }
  }

  .image-block__images {
    flex: 0 0 calc(60% - var(--image-block-gutter));
    margin-left: var(--image-block-gutter);
    margin-bottom: var(--image-block-gutter);

    &--slider {
      position: relative;
      overflow: hidden;
    }
  }

  .image-block__slides {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .image-block__slide {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    will-change: transform;

    &:first-child {
      transform: translateX(-100%);
    }
  }
  .image-block__content {
    flex: 0 0 calc(40% - var(--image-block-gutter));
    margin-left: var(--image-block-gutter);
    margin-bottom: var(--image-block-gutter);
  }
  .image-block__image {
    width: 100%;

    &--placeholder {
      visibility: hidden;
      opacity: 0;
    }
  }
  .image-block__title + * {
    margin-top: 1em;
  }

  .image-block--right {
    flex-direction: row;
  }

  .image-block--top {
    flex-direction: column-reverse;

    .image-block__content {
      padding: 0 10%;
    }
  }

  .image-block--background {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    background-color: var(--color-layout--background-inverted);

    .image-block__content {
      position: absolute;
      z-index: 2;
      color: var(--color-text--inverted);
      top: var(--size-pony);
      left: var(--size-design-bezel);
      width: 35%;
      margin: 0;
      //filter: invert(100%);
    }

    .image-block__images {
      width: 100vw;
      margin: 0;
    }
  }

  /* TODO: style iframe; keep aspect ratio */
  .image-block__iframe-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  }
  .image-block__iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

</style>
