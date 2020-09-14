<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { debounce } from 'throttle-debounce';
import collect from "collect.js";

export default {
  key: '_index',
  components: {
    Swiper,
    SwiperSlide,
  },
  async asyncData ({ $http }) {
    // Fetching the data from the cms here
    const allPages = collect(await $http.$get('/pages.json').then(data => data.data))
    .groupBy('locale').all();

    return { allPages };
  },
  data () {
    return {
      hasEnteredSite: this.$route.path !== '/',
    };
  },
  computed: {
    pagesInCurrentLanguage () {
      return this.allPages[this.$i18n.locale];
    },
    videoTeasers () {
      return this.pagesInCurrentLanguage.map((page) => {
        return {
          video: page.headerVideo.mp4,
          title: page.header,
        }
      });
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
  mounted() {
      // window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
      // window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
      // slideChange(swiper) {
      //     // Update route on slide change
      //     // only if not on home
      //     if (this.hasEnteredSite) {
      //         this.$router.push(this.sections[swiper.realIndex].path);
      //     }
      // },
      // handleScroll: debounce(200, function() {
      //     // Disable swiper when entering a page
      //     this.allowTouchSwipe = (window.scrollY < 10);
      //
      //     if(window.scrollY > 10) {
      //         if(!this.hasEnteredSite) {
      //             this.$router.push(this.sections[this.$refs.sectionSwiper.$swiper.realIndex].path);
      //         }
      //         this.hasEnteredSite = true;
      //     }
      // }),
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
  head () {
      return {
          // title: this.currentSection.name,
          // titleTemplate: this.hasEnteredSite ? '%s - Raumgleiter' : 'Raumgleiter',
      }
  }
}
</script>

<template>
  <div>
    <client-only>
      <VideoTeaser :entries="videoTeasers" />

      <swiper ref="sectionSwiper">
        <swiper-slide
          v-for="(page, index) in pagesInCurrentLanguage"
          :key="'page'+index"
        >
          <div class="sectionHeader">
            <h2>{{ page.title }}</h2>
          </div>

          <!-- Page Content -->
          <div class="sectionContent">
            <Pagebuilder :slug="page.slug" :blocks="page.pagebuilder" />
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<style lang="postcss">
@import 'swiper/swiper-bundle.css';

.sectionHeader {
  display: flex;
  justify-content: space-around;
  min-height: 20vh;
}

.sectionContent {
  height: 100vh;
  background-color: #cfcfd2;
  max-width: 100vw;
}
</style>
