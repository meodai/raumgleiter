<script>
  export default {
    head () {
      return {
        bodyAttrs: {
          class: this.$config.livePreview ? 'livePreviewEnabled' : null,
        },
      };
    },
  };
</script>

<template>
  <div>
    <Navigation v-if="!$config.livePreview" />
    <Nuxt />
    <PageFooter />
    <!--Functional components -->
    <Design />
    <Icons />
    <PreviewScrollPosition v-if="$config.livePreview" />
  </div>
</template>
