<script>
  import collect from 'collect.js';

  export default {

    props: {
      entries: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },

    data () {
      return {
        activeSlide: 0,
        sliderIsRunning: false,
      };
    },

    methods: {
      slideToNext() {
        const $currentSlide = this.$refs.slide[this.activeSlide];
        const nextNthChild = this.activeSlide === this.images.length - 1 ? 0 : this.activeSlide + 1;
        const nextNextNthChild = this.activeSlide === this.images.length - 2 ? 0 : this.activeSlide + 2;
        const prevNthChild = this.activeSlide === 0 ? this.images.length - 1 : this.activeSlide - 1;
        const $nextSlide = this.$refs.slide[nextNthChild];
        const $nextNextSlide = this.$refs.slide[nextNextNthChild];
        const $prevSlide = this.$refs.slide[prevNthChild];

        gsap.fromTo($prevSlide, 1.30, {
          x: '-220%',
        }, {
          x: '-320%',
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete: () => {
            $prevSlide.style['z-index'] = 1;
          }
        });

        $currentSlide.style['z-index'] = 2;

        gsap.fromTo($currentSlide, 1.30, {
          x: '-100%',
        }, {
          x: '-220%',
          ease: 'power4.inOut',
          delay: 0.2,
        });

        $nextSlide.style['z-index'] = 3;

        gsap.fromTo($nextSlide, 1.58, {
          x: '20%',
        }, {
          x: '-100%',
          ease: 'power4.inOut',
        });

        $prevSlide.style['z-index'] = 3;

        gsap.fromTo($nextNextSlide , 1.88, {
          x: '140%',
        }, {
          x: '20%',
          ease: 'power4.inOut',
        });

        this.activeSlide = nextNthChild;
      },
      startSlider() {
        if(this.sliderIsRunning || this.images.length < 3) return;
        this.interval = setInterval(this.slideToNext, 3000);
        this.sliderIsRunning = true;
      },
      stopSlider() {
        clearInterval(this.interval);
        this.sliderIsRunning = false;
      },

      visibilityChanged(isVisible) {
        // See https://github.com/Akryum/vue-observe-visibility
        // console.log('Visibility changed', isVisible);

        if(isVisible) {
          this.startSlider();
        } else {
          this.stopSlider();
        }
      },
    },

    mounted () {},

    beforeDestroy () {
      this.stopSlider();
    },

    computed: {
      images() {
        return collect(this.entries).pluck('image').all() || [];
      },
      titles() {
        return collect(this.entries).pluck('title').all() || [];
      },
      slugs() {
        return collect(this.entries).pluck('slug').all() || [];
      },
      firstImage () {
        return this.hasImages ? this.images[0] : null;
      },
      hasImages() {
        return this.images && this.images.length > 0;
      },
    },
  };
</script>

<template>
  <aside
    class="related"
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 300,
      throttleOptions: {
        leading: 'visible',
      },
    }"
  >
    <div v-if="hasImages" class="related__images related__images--slider">
      <div class="l-design-width">
        <h3 class="related__title t-title">{{ $props.title }}</h3>
      </div>
      <div class="related__slides">
        <div
          v-for="(entry, i) in entries"
          :key="'related'+ i + entry.title"
          class="related__slide"
          :ref="'slide'"
        >
          <nuxt-link
            :to="localePath({ name: 'projects-slug', params: { slug: slugs[i] } })"
          >
            <ResponsiveImage
              v-if="images[i]"
              :image="images[i]"
              class="related__image"
            />
            <div class="related__overlay">
              <h4 class="related__title">
                {{ titles[i] }}
              </h4>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

  </aside>
</template>

<style lang="scss">
  .related {
    overflow: hidden;
  }

  .related__images {
    &--slider {
      position: relative;
      overflow: hidden;
    }
  }

  .related__slides {
    position: relative;
    height: 40vw;
    width: 100%;
  }

  .related__slide {
    position: absolute;
    top: 0;
    left: 75%;
    width: 50%;
    will-change: transform;
    transform: translateX(220%);

    &:first-child {
      transform: translateX(-100%);
    }
    &:first-child + & {
      transform: translateX(20%);
    }
    &:last-child {
      transform: translateX(-220%);
    }
  }

  .related__image {
    width: 100%;

    &--placeholder {
      visibility: hidden;
      opacity: 0;
    }
  }

  .related__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(#000, 0.7);
    opacity: 0;
    transition: 200ms opacity cubic-bezier(0, 0, 0.3, 0.1);

    .related__slide:hover & {
      opacity: 1;
    }
  }

  .related__title {
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--color-text--inverted);
    transform: translate(-50%,2em);
    text-align: center;

    transition: 500ms transform cubic-bezier(0.7, 0.3, 0, 1);

    .related__slide:hover & {
      transform: translate(-50%,-50%);
    }
  }
</style>
