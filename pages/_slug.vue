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
      };
    },
    computed: {
      hasEnteredRoute () {
        return this.$route.path !== '/';
      },
      pagesInCurrentLocale () {
        return collect(this.pagesByLocale[this.$i18n.locale]).toArray() || false;
      },
      currentVideoTeaser () {
        return this.videoTeasers[this.currentSlide];
      },
      currentPageIndex () {
        return collect(this.pagesInCurrentLocale).search(page => page.slug === this.$nuxt.$route.params.slug) || 0;
      },
      currentPage () {
        return this.pagesInCurrentLocale ? this.pagesInCurrentLocale[this.currentPageIndex] : false;
      },
      videoTeasers () {
        return collect(this.pagesInCurrentLocale).map((page, i) => {
          return {
            video: page.headerVideo.url,
            title: page.header,
            subtitle: page.title,
            slug: page.slug,
            index: i,
          };
        }).toArray();
      },
    },
    watch: {},
    mounted () {
      this.listenForScrollEvent();
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
        :start-eq="currentPageIndex"
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
