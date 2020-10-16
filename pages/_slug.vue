<script>
  import { debounce } from 'throttle-debounce';
  import collect from 'collect.js';

  export default {
    key: 'homepage',
    name: 'Page',
    components: {},
    async asyncData ({ $craft }) {
      const pagesByLocale = collect(await $craft('pages')).groupBy('locale').all();

      return { pagesByLocale };
    },
    data () {
      return {
        allowTouchSwipe: true,
        currentSlide: 0,
        initialised: false,
        videoTeasers: [],
      };
    },
    computed: {
      hasEnteredRoute () {
        return this.$route.path !== '/';
      },
      pagesInCurrentLocale () {
        return this.pagesByLocale[this.$i18n.locale];
      },
      currentVideoTeaser () {
        return this.videoTeasers[this.currentSlide];
      },
      currentPageIndex () {
        return parseInt(Object.keys(this.pagesInCurrentLocale).find(key => this.pagesInCurrentLocale[key].slug === this.$nuxt.$route.params.slug)) || false;
      },
      currentPage () {
        return this.currentPageIndex && this.pagesByLocale ? this.pagesInCurrentLocale[this.currentPageIndex] : false;
      },
    },
    watch: {},
    mounted () {
      this.setVideoSlides();
      window.addEventListener('scroll', this.listenForScrollEvent);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.listenForScrollEvent);
    },
    methods: {
      setVideoSlides () {
        let slides = collect(this.pagesInCurrentLocale).map((page, i) => {
          return {
            video: page.headerVideo.url,
            title: page.header,
            subtitle: page.title,
            slug: page.slug,
          };
        });
        // If we're directly accessing a route,
        // remove the about page
        // and place the accessed page at the first position
        if (this.$route.params.slug) {
          slides.reject(item => item.slug === 'about');
          const indexBySlug = slides.search((item, key) => item.slug === this.$route.params.slug);
          const firstPart = slides.splice(indexBySlug);
          slides = firstPart.merge(slides.all());
        }
        console.log('sliddess');
        this.videoTeasers = slides.all();
        this.initialised = true;
      },
      listenForScrollEvent: debounce(50, function () {
        // Disable swiper when entering a page
        // Re-enable swiper when on the top
        this.allowTouchSwipe = (window.scrollY < 10);

        if (window.scrollY > 10 && !this.hasEnteredRoute) {
          this.updateRouteToMatchTeaser();
        }
      }),
      slideUpdate (slide) {
        this.currentSlide = slide;
        if (this.hasEnteredRoute) {
          this.updateRouteToMatchTeaser();
        }
      },
      updateRouteToMatchTeaser () {
        this.$router.push(this.localePath({ name: 'slug', params: { slug: this.currentVideoTeaser.slug } }));
      },
    },
    head () {
      return {
      // title: this.currentSection.name,
      // titleTemplate: this.hasScrolledDown ? '%s - Raumgleiter' : 'Raumgleiter',
      };
    },
  };
</script>

<template>
  <div>
    <VideoTeaserContainer>
      <VideoTeaser
        :entries="videoTeasers"
        :loop-videos="!hasEnteredRoute"
        :allow-swipe="allowTouchSwipe"
        :start-eq="3"
        @slide="slideUpdate"
      />
    </VideoTeaserContainer>

    <client-only>
      <Pagebuilder
        v-if="currentPage"
        :key="'page-content-'+currentPage.slug"
        :slug="currentPage.slug"
        :blocks="currentPage.pagebuilder"
      />
    </client-only>
  </div>
</template>

<style lang="scss">

</style>
