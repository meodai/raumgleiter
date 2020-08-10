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
            },
            {
                name: 'Virtuelle Vermarktung',
                path: '/virtuelle-vermarktung',
                color: '#68be8d',
            },
            {
                name: 'Virtueller Wettbewerb',
                path: '/virtueller-wettbewerb',
                color: '#b09737',
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
            this.allowTouchSwipe = (window.scrollY < 10);

            if(window.scrollY > 10) {
                if(!this.hasEnteredSite) {
                    this.$router.push(this.sections[this.$refs.mySwiper.$swiper.realIndex].path);
                }
                this.hasEnteredSite = true;
            }
        }),
    },
    watch: {
        allowTouchSwipe(allowTouchSwipe) {
            this.$refs.mySwiper.$swiper.allowTouchMove = allowTouchSwipe;
        },
        hasEnteredSite(hasEnteredSite) {
            if (hasEnteredSite) {
                // this.$refs.mySwiper.$swiper.autoplay.stop();
            }
        }
    },
}
</script>

<template>
  <div class="container">
        <client-only>
            <swiper
                ref="mySwiper"
                :options="swiperOptions"
                @slideChange="slideChange"
            >
                <swiper-slide
                    v-for="(section, index) in sections"
                    :key="section.path"
                >
                    <div
                        class="sectionHeader"
                        :style="{ backgroundColor: section.color }"
                    >
                        <h2>Video Teaser {{ section.name }}</h2>
                    </div>
                    <div class="sectionContent">
                        <p>
                            Lobortis vitae vestibulum consequat sed justo himenaeos, pellentesque tortor sollicitudin dis diam pharetra, euismod senectus nisl ligula class. Consequat rhoncus semper aptent duis a integer arcu commodo, pellentesque fusce tempus sociosqu laoreet mauris cum ante, in eleifend felis nunc senectus potenti nisi. Metus turpis pulvinar nisl neque lacinia tempor elit mauris interdum, senectus dictumst id etiam primis tristique curae lacus, ac dis amet adipiscing nunc purus congue per.
                        </p>
                    </div>
                </swiper-slide>
            </swiper>
        </client-only>
  </div>
</template>

<style lang="postcss">
@import 'swiper/swiper-bundle.css';

.container {
}

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
