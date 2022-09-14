<script>
  export default {
    computed: {
      showBanner() {
        return this.isOnHome;
      },
      isOnHome() {
        return ['/', '/en', '/fr'].includes(this.$route.path);
      },
    },
  };
</script>

<template>
  <slide-up-down
    :active="isOnHome"
    :duration="500"
  >
    <div class="banner">
      <DynamicMarquee
        direction="row"
        :reverse="true"
        :repeat="false"
      >
          <div class="banner__loop">
            Ahoi
          </div>
      </DynamicMarquee>
    </div>
  </slide-up-down>
</template>

<style lang="scss">
  .banner {
    position: relative;
    width: 100%;
    height: 34px;
    background-color: #ffffff;
    z-index: 90;
  }

  .banner__loop {
    word-break: keep-all;
    font-size: 2.4rem;
    padding-top: 0.35rem;
  }
</style>
