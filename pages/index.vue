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
        hasEnteredRoute: this.$route.path !== '/',
        enteredSiteOnIndex: this.$route.path === '/',
        currentSlide: 0,
      };
    },
    computed: {
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
      // swiperIndexByPath () {
      //     return parseInt(Object.keys(this.sections).find(key => this.sections[key].path === this.$nuxt.$route.path)) || 0;
      // },
      // swiperOptions () {
      //     return {
      //         loop: true,
      //         autoHeight: true,
      //         initialSlide: this.swiperIndexByPath,
      //         preloadImages: false,
      //         keyboard: true,
      //     };
      // },
      // currentSection () {
      //     return this.sections[this.swiperIndexByPath];
      // },
    },
    watch: {
      // allowTouchSwipe(allowTouchSwipe) {
      //     this.$refs.sectionSwiper.$swiper.allowTouchMove = allowTouchSwipe;
      // },
      // hasScrolledDown(hasScrolledDown) {
      //     if (hasScrolledDown) {
      //         // this.$refs.sectionSwiper.$swiper.autoplay.stop();
      //     }
      // }
    },
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
          this.$router.push(this.localePath({ name: 'slug', params: { slug: this.currentVideoTeaser.slug } }));
          this.hasEnteredRoute = true;
          this.$nuxt.$emit('stop-video-header');
        }
      }),
      slideUpdate (slide) {
        this.currentSlide = slide;
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
        :loop-videos="allowTouchSwipe"
        @slide="slideUpdate"
      />
    </VideoTeaserContainer>

    <!--      <swiper ref="sectionSwiper">-->
    <!--        <swiper-slide-->
    <!--          v-for="(page, index) in pagesInCurrentLocale"-->
    <!--          :key="'page'+index"-->
    <!--        >-->
    <!--          <div class="sectionHeader">-->
    <!--            <h2>{{ page.title }}</h2>-->
    <!--          </div>-->

    <!--          &lt;!&ndash; Page Content &ndash;&gt;-->
    <!--          <div class="sectionContent">-->
    <!--            <Pagebuilder :slug="page.slug" :blocks="page.pagebuilder" />-->
    <!--          </div>-->
    <!--        </swiper-slide>-->
    <!--      </swiper>-->
  </div>
</template>

<style lang="scss">

</style>
