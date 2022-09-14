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
<!--      ... -->
    </div>
  </slide-up-down>
</template>

<style lang="scss">
  .banner {
    width: 100%;
    height: 20px;
    background-color: #ffffff;
    z-index: 999;
  }
</style>
