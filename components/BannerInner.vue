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
  <div class="banner__inner">
    <DynamicMarquee
      direction="row"
      :reverse="true"
      :repeat="false"
    >
        <div class="banner__loop">
          {{ currentBannerData.text }}
        </div>
    </DynamicMarquee>
    <div class="banner__hover" v-if="currentBannerData.link && currentBannerData.hoverText">
      <div>
        {{ currentBannerData.hoverText }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .banner__inner {
    width: 100%;
    height: 100%;
  }

  .banner__loop {
    word-break: keep-all;
    hyphens: none;
    white-space: nowrap;
    font-size: 2.4rem;
  }

  .banner__hover {
    opacity: 0;
    transition: opacity 0.1s;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
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
