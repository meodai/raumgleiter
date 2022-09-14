<script>
  export default {
    computed: {
      currentBannerData() {
        return this.$store.getters.getCurrentBannerData;
      },
      isOnHome() {
        return ['/', '/en', '/fr', '/en/', '/fr/'].includes(this.$route.path);
      },
    },
  };
</script>

<template>
  <div>
    <slide-up-down
      :active="isOnHome"
      :duration="500"
    >
      <div class="banner">

        <MarqueeText :duration="7">
          <div class="banner__loop">
            {{ currentBannerData.text }}
          </div>
        </MarqueeText>

        <nuxt-link
          v-if="currentBannerData.link"
          :to="localePath('/'+currentBannerData.link)"
          class="banner__link"
        >
          <div
            v-if="currentBannerData.hoverText"
            class="banner__hover"
          >
              <div>
                {{ currentBannerData.hoverText }}
              </div>
          </div>
        </nuxt-link>

      </div>
    </slide-up-down>
  </div>
</template>

<style lang="scss">
  .banner {
    position: relative;
    width: 100%;
    height: 34px;
    background-color: #ffffff;
    z-index: 90;
    font-size: 2.4rem;
    padding-top: 0.35rem;
  }

  .banner__loop {
    word-break: keep-all;
    hyphens: none;
    white-space: nowrap;
    font-size: 2.4rem;
    width: 100vw;
    text-align: right;
  }

  .banner__link {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .banner__hover {
    opacity: 0;
    transition: opacity 0.1s;
    display: flex;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    justify-content: space-around;

    & > div {
      padding-top: 0.35rem;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
  }

  .banner:hover .banner__hover {
    opacity: 1;
  }
</style>
