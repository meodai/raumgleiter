<script>
export default {
  head () {
    return {
      bodyAttrs: {
        class: this.$config.livePreview ? 'livePreviewEnabled' : null
      }
    };
  },
}
</script>
<template>
  <div>
    <Design />
    <Navigation v-if="!$config.livePreview" />
    <Nuxt />
    <Icons />
    <PreviewScrollPosition v-if="$config.livePreview" />
  </div>
</template>
