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
        return this.$route.params.slug !== undefined;
      },
      pagesInCurrentLocale () {
        return collect(this.pagesByLocale[this.$i18n.locale]).toArray() || false;
      },
      currentVideoTeaser () {
        return this.videoTeasers[this.currentSlide];
      },
      currentPageIndexByRoute () {
        return collect(this.pagesInCurrentLocale).search(page => page.slug === this.$nuxt.$route.params.slug) || 0;
      },
      currentPageIndex () {
        return this.$route.params.slug ? this.currentPageIndexByRoute : this.currentSlide;
      },
      currentPage () {
        return this.pagesInCurrentLocale ? this.pagesInCurrentLocale[this.currentPageIndex] : false;
      },
      videoTeasers () {
        return collect(this.pagesInCurrentLocale).map((page, i) => {
          return {
            video: page.headerVideo,
            title: page.header,
            subtitle: page.title,
            slug: page.slug,
            index: i,
          };
        }).toArray();
      },
      currentIntroBlock () {
        return this.currentPage && this.currentPage.pagebuilder.length
          ? [this.currentPage.pagebuilder[0]] : [];
      },
      currentPagebuilder () {
        return this.currentPage && this.currentPage.pagebuilder.length > 1
          ? this.currentPage.pagebuilder.slice(1) : [];
      },
    },
    watch: {
      '$nuxt.$route.params.slug' () {
        if (this.getRouteBaseName() === 'slug' && this.$nuxt.$route.params.slug !== this.currentVideoTeaser.slug) {
          this.$nuxt.$emit('video-teaser-slide', this.currentPageIndexByRoute);
        }
      },
    },
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
  <div :class="{ 'c-design--inverted': currentPage && currentPage.inverted }">
    <VideoTeaserContainer>
      <VideoTeaser
        :entries="videoTeasers"
        :loop-videos="!hasEnteredRoute"
        :allow-swipe="allowTouchSwipe"
        :start-eq="currentPageIndexByRoute"
        @slide="slideUpdate"
      />
    </VideoTeaserContainer>

    <!--  Intro Block  -->
    <Pagebuilder
      v-if="currentPage"
      :key="'page-intro-'+currentPage.slug"
      :slug="'intro'+currentPage.slug"
      :blocks="currentIntroBlock"
    />

    <!--  Page Content  -->
    <Pagebuilder
      v-if="currentPage && hasEnteredRoute"
      :key="'page-content-'+currentPage.slug"
      :slug="'content'+currentPage.slug"
      :blocks="currentPagebuilder"
    />
  </div>
</template>

<style lang="scss">

</style>
