<script>
  export default {
    /**
      fields = {

      }
     */
    props: {
      images: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      imagePosition: {
        type: String,
        required: false,
        default: 'left',
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
        gsap.fromTo($currentSlide, 1, {
          x: '-100%',
        }, {
          x: '-200%',
          ease: 'power4.out',
        });
        gsap.fromTo($nextSlide, 1.5, {
          x: '20%',
        }, {
          x: '-100%',
          ease: 'power4.out',
        });
        this.activeSlide = nextNthChild;
      },
      startSlider: function startSlider () {
        this.slideTo(1);
      },
    },

    mounted () {
      if (this.isSlider) {
        setInterval(() => {
          this.startSlider();
        }, 3000);
      }
    },

    computed: {
      firstImage: function getFirstImage () {
        return this.images[0].src;
      },
      firstAlt: function getFirstAlt () {
        return this.images[0].alt;
      },
      isSlider: function isSlider () {
        return this.images.length > 1;
      },
    },
  };
</script>

<template>
  <article class="image-block l-design-width" :class="`image-block--${imagePosition}`">
    <div class="image-block__content">
      <h3 class="image-block__title t-title">{{title}}</h3>
      <slot />
    </div>
    <div class="image-block__images" :class="{'image-block__images--slider': isSlider}">
      <img
        class="image-block__image"
        :class="{'image-block__image--placeholder': isSlider}"
        :src="firstImage"
        :alt="firstAlt"
      />
      <div v-if="isSlider" class="image-block__slides">
        <div
          v-for="(image, i) in images"
          :key="i + image.src"
          class="image-block__slide"
          :ref="'slide'"
        >
          <img
            class="image-block__image"
            :src="image.src"
            :alt="image.alt"
          />
        </div>
      </div>
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

</style>
