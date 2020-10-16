<script>
  import { debounce } from 'throttle-debounce';
  import collect from 'collect.js';

  export default {
    key: '_index',
    components: {},
    async asyncData ({ $craft }) {
      const pagesByLocale = collect(await $craft('pages')).groupBy('locale').all();

      return { pagesByLocale };
    },
    data () {
      return {
        allowTouchSwipe: true,
        enteredSiteOnIndex: this.$route.path === '/',
        currentSlide: 0,
      };
    },
    computed: {
      hasEnteredRoute () {
        return this.$route.path !== '/';
      },
      pagesInCurrentLocale () {
        return this.pagesByLocale[this.$i18n.locale];
      },
      videoTeasers () {
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
        if (!this.enteredSiteOnIndex) {
          slides.reject(item => item.slug === 'about');
          const indexBySlug = slides.search((item, key) => item.slug === this.$route.params.slug);
          const firstPart = slides.splice(indexBySlug);
          slides = firstPart.merge(slides.all());
        }
        return slides.all();
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
      window.addEventListener('scroll', this.listenForScrollEvent);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.listenForScrollEvent);
    },
    methods: {
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
