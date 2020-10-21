<script>
  export default {
    head () {
      return {
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        bodyAttrs: {
          class: this.$config.livePreview ? 'livePreviewEnabled' : null,
        },
      };
    },
  };
</script>

<template>
  <div>
    <Navigation v-if="!$config.livePreview || $config.devMode" />
    <Nuxt />
    <PageFooter v-if="!$config.livePreview || $config.devMode" />
    <!--Functional components -->
    <Icons />
    <PreviewScrollPosition v-if="$config.livePreview" />
  </div>
</template>
