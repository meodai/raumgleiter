<script>
  import { debounce } from 'throttle-debounce';
  import collect from 'collect.js';

  export default {
    name: 'Page',
    key: 'homepage',
    async asyncData ({ $craft, params, error, store, redirect }) {
      const pagesByLocale = collect(await $craft('pages'));
      // const currentPage = pagesByLocale.where('slug', params.slug);
      const currentPage = pagesByLocale.first();

      // if (params.slug && currentPage.count() < 1) {
      //   return error({ statusCode: 404 });
      if (params.slug) {
        // console.log(params.slug);
        return redirect('/');
        // return error({ statusCode: 404 });
      } else {
        // await store.dispatch('i18n/setRouteParams', currentPage.first().locale_slugs);
        await store.dispatch('i18n/setRouteParams', currentPage.locale_slugs);
      }

      return {
        pagesByLocale: pagesByLocale.groupBy('locale').all(),
      };
    },
    data () {
      return {
        allowTouchSwipe: true,
        currentSlide: -1,
      };
    },
    computed: {
      hasEnteredRoute () {
        return true; //this.$route.params.slug !== undefined;
      },
      pagesInCurrentLocale () {
        return collect(this.pagesByLocale[this.$i18n.locale]).toArray() || false;
      },
      currentVideoTeaserSlug () {
        return this.videoTeasers[this.currentSlide] ? this.videoTeasers[this.currentSlide].slug : null;
      },
      currentPageIndexByRoute () {
        // return collect(this.pagesInCurrentLocale).search(page => page.slug === this.$nuxt.$route.params.slug) || 0;
        return 0;
      },
      currentPageIndex () {
        return 0; //this.$route.params.slug ? this.currentPageIndexByRoute : this.currentSlide;
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
          ? [this.currentPage.pagebuilder[0]]
          : [];
      },
      currentPagebuilder () {
        return this.currentPage && this.currentPage.pagebuilder.length > 1
          ? this.currentPage.pagebuilder.slice(1)
          : [];
      },
      metaDescription () {
        return this.hasEnteredRoute && this.currentIntroBlock && this.currentIntroBlock[0].fields.body
          ? this.currentIntroBlock[0].fields.lead
          : this.$store.state.seoData[this.$i18n.locale].metaDescription || null;
      },
    },
    // watch: {
    //   '$nuxt.$route.params.slug' () {
    //     if (this.getRouteBaseName() === 'slug' && this.$nuxt.$route.params.slug !== this.currentVideoTeaserSlug) {
    //       this.$nuxt.$emit('video-teaser-slide', this.currentPageIndexByRoute);
    //     }
    //   },
    // },
    mounted () {
      this.listenForScrollEvent();
      window.addEventListener('scroll', this.listenForScrollEvent, { passive: true });
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
        // if (this.$nuxt.$route.params.slug !== this.currentVideoTeaserSlug) {
        //   this.$router.push(this.localePath({ name: 'slug', params: { slug: this.currentVideoTeaserSlug } }));
        // }
      },
    },
    head () {
      return {
        title: this.currentPage ? this.currentPage.title : null,
        titleTemplate: this.hasEnteredRoute ? '%s | Raumgleiter' : 'Raumgleiter',
        meta: [
          { hid: 'description', name: 'description', content: this.metaDescription },
        ],
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
      class="content"
      :class="{ 'content--inverted': currentPage.inverted }"
      :slug="'content'+currentPage.slug"
      :blocks="currentPagebuilder"
    />
  </div>
</template>
