<script>
  export default {
    computed: {
      currentBannerData() {
        return this.$store.getters.getCurrentBannerData;
      },
    },
  };
</script>

<template>
    <div class="banner">

      <MarqueeText :duration="14">
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
</template>

<style lang="scss">
  .banner {
    position: relative;
    width: 100%;
    height: 1.8em;
    background-color: #ffffff;
    z-index: 90;
    font-size: 2.4rem;
    padding-top: 0.5rem;
  }

  .banner__loop {
    word-break: keep-all;
    hyphens: none;
    white-space: nowrap;
    font-size: 2.4rem;
    min-width: 100vw;
    max-width: 1400px;
    padding: 0 30px;
    text-align: right;
  }

  .banner__link {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 2.4rem;
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
      padding-top: 0.5rem;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
  }

  .banner:hover .banner__hover {
    opacity: 1;
  }
</style>
