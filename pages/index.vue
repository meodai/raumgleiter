<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { debounce } from 'throttle-debounce';

export default {
    key: '_index',
    components: {
        Swiper,
        SwiperSlide,
    },
    async asyncData ({ $axios }) {
        // Fetching the data from the cms here
        const sections = [
            {
                name: 'Virtual Real Estate',
                path: '/virtual-real-estate',
                color: '#4c64e5',
                pagebuilder: [],
            },
            {
                name: 'Virtuelle Vermarktung',
                path: '/virtuelle-vermarktung',
                color: '#68be8d',
                pagebuilder: [],
            },
            {
                name: 'Virtueller Wettbewerb',
                path: '/virtueller-wettbewerb',
                color: '#b09737',
                pagebuilder: [],
            },
        ];

        return { sections };
    },
    data () {
        return {
            hasEnteredSite: this.$route.path !== '/',
            allowTouchSwipe: true,
        };
    },
    computed: {
        swiperIndexByPath () {
            return parseInt(Object.keys(this.sections).find(key => this.sections[key].path === this.$nuxt.$route.path)) || 0;
        },
        swiperOptions () {
            return {
                loop: true,
                autoHeight: true,
                initialSlide: this.swiperIndexByPath,
                preloadImages: false,
                keyboard: true,
            };
        },
        currentSection () {
            return this.sections[this.swiperIndexByPath];
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        // todo: start swiper autoplay
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        slideChange(swiper) {
            // Update route on slide change
            // only if not on home
            if (this.hasEnteredSite) {
                this.$router.push(this.sections[swiper.realIndex].path);
            }
        },
        handleScroll: debounce(200, function() {
            // Disable swiper when entering a page
            this.allowTouchSwipe = (window.scrollY < 10);

            if(window.scrollY > 10) {
                if(!this.hasEnteredSite) {
                    this.$router.push(this.sections[this.$refs.sectionSwiper.$swiper.realIndex].path);
                }
                this.hasEnteredSite = true;
            }
        }),
    },
    watch: {
        allowTouchSwipe(allowTouchSwipe) {
            this.$refs.sectionSwiper.$swiper.allowTouchMove = allowTouchSwipe;
        },
        hasEnteredSite(hasEnteredSite) {
            if (hasEnteredSite) {
                // todo: stop autoplay of swiper
                // this.$refs.sectionSwiper.$swiper.autoplay.stop();
            }
        }
    },
    head () {
        return {
            title: this.currentSection.name,
            titleTemplate: this.hasEnteredSite ? '%s - Raumgleiter' : 'Raumgleiter',
        }
    }
}
</script>

<template>
  <div>
        <client-only>
            <swiper
                ref="sectionSwiper"
                :options="swiperOptions"
                @slideChange="slideChange"
            >
                <swiper-slide
                    v-for="(section, index) in sections"
                    :key="'section'+index"
                >
                    <!-- Video Header -->
                    <div
                        class="sectionHeader"
                        :style="{ backgroundColor: section.color }"
                    >
                        <h2>Video Teaser {{ section.name }}</h2>
                    </div>

                    <!-- Page Content -->
                    <div class="sectionContent">
                        <Pagebuilder :blocks="section.pagebuilder" />
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
    height: 100vh;
}

.sectionContent {
    height: 200vh;
    background-color: #cfcfd2;
    max-width: 100vw;
}

.sectionContent p {
    margin: 0 auto;
    padding: 30px;
    max-width: 400px;
}
</style>
