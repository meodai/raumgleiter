<script>
  import collect from 'collect.js';

  export default {
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },

    data () {
      return {
        activeSlide: 0,
        sliderIsRunning: false,
        randomisedEntries: [],
      };
    },

    computed: {
      images () {
        return collect(this.randomisedEntries).pluck('image').toArray() || [];
      },
      titles () {
        return collect(this.randomisedEntries).pluck('title').toArray() || [];
      },
      slugs () {
        return collect(this.randomisedEntries).pluck('slug').toArray() || [];
      },
      firstImage () {
        return this.hasImages ? this.images[0] : null;
      },
      hasImages () {
        return this.images && this.images.length > 0;
      },
    },

    created () {
      let entries = collect(this.fields.entries).shuffle();

      if (entries.count() < 4) {
        entries = entries.merge(entries);
      }

      this.randomisedEntries = entries.all();
    },

    beforeDestroy () {
      this.stopSlider();
    },

    methods: {
      slideToNext () {
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
          },
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

        gsap.fromTo($nextNextSlide, 1.88, {
          x: '140%',
        }, {
          x: '20%',
          ease: 'power4.inOut',
        });

        this.activeSlide = nextNthChild;
      },
      startSlider () {
        if (this.sliderIsRunning || this.images.length < 3) { return; }
        this.interval = setInterval(this.slideToNext, 3000);
        this.sliderIsRunning = true;
      },
      stopSlider () {
        clearInterval(this.interval);
        this.sliderIsRunning = false;
      },

      visibilityChanged (isVisible) {
        // See https://github.com/Akryum/vue-observe-visibility
        // console.log('Visibility changed', isVisible);

        if (isVisible) {
          this.startSlider();
        } else {
          this.stopSlider();
        }
      },
    },
  };
</script>

<template>
  <aside
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 300,
      throttleOptions: {
        leading: 'visible',
      },
    }"
    class="related"
  >
    <div v-if="hasImages" class="related__images related__images--slider">
      <div class="l-design-width">
        <h3 class="related__sectiontitle t-title">
          {{ fields.title }}
        </h3>
      </div>
      <div class="related__slides">
        <div
          v-for="(entry, i) in randomisedEntries"
          :key="'related'+ i + entry.title"
          :ref="'slide'"
          class="related__slide"
          :class="['related__slide--' + (images[i] && images[i]['orientation']), (images[i] ? '' : 'related__slide--noImage') ]"
        >
          <nuxt-link
            :to="localePath({ name: 'projects-slug', params: { slug: slugs[i] } })"
            @click.native="$scrollToTop"
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
    background: var(--color-layout--accent);
    will-change: transform;
    transform: translateX(220%);
    overflow: hidden;

    &::before {
      content: '';
      display: block;
      padding-top: (450/720) * 100%;
    }

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

  /*
  .related__slide--portrait {
    height: 45rem;
    .related__image {
      width: auto;
      height: 100%;
      margin: 0 auto;
    }
  }*/

  .related__image {
    position: absolute;
    top: 50%;
    left: 50%;
    object-fit: contain;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);

    &--placeholder {
      visibility: hidden;
      opacity: 0;
    }
  }

  .related__slide--landscape .related__image {
    object-fit: cover;
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

    .related__slide--noImage &,
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

    @include typo('nobreak');

    transition: 500ms transform cubic-bezier(0.3, 0.7, 0, 1);

    .related__slide--noImage &,
    .related__slide:hover & {
      transform: translate(-50%,-50%);
    }
  }
</style>
