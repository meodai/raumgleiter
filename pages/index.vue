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
        hasEnteredSite: this.$route.path !== '/',
        currentSlide: 0,
        allowTouchSwipe: this.$route.path === '/',
      };
    },
    computed: {
      pagesInCurrentLocale () {
        return this.pagesByLocale[this.$i18n.locale];
      },
      videoTeasers () {
        return this.pagesInCurrentLocale.map((page) => {
          return {
            video: page.headerVideo.url,
            title: page.header,
            subtitle: page.title,
            slug: page.slug,
          };
        });
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
      // hasEnteredSite(hasEnteredSite) {
      //     if (hasEnteredSite) {
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
        this.allowTouchSwipe = (window.scrollY < 10);

        if (window.scrollY > 10 && !this.hasEnteredSite) {
          this.$router.push(this.localePath({ name: 'slug', params: { slug: this.currentVideoTeaser.slug } }));
          this.hasEnteredSite = true;
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
        // titleTemplate: this.hasEnteredSite ? '%s - Raumgleiter' : 'Raumgleiter',
      };
    },
  };
</script>

<template>
  <div>
    <client-only>
      <VideoTeaser
        :entries="videoTeasers"
        @slide="slideUpdate"
      />
    </client-only>

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
