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
        meta: [
          { hid: 'description', name: 'description', content: this.metaDescription },
          { hid: 'og:description', name: 'og:description', content: this.metaDescription },
          { hid: 'twitter:description', name: 'twitter:description', content: this.metaDescription },
          { hid: 'og:image', property: 'og:image', content: this.shareImage },
          { hid: 'twitter:image', property: 'twitter:image', content: this.shareImage },
          ...this.$config.livePreview ? [{ hid: 'robots', name: 'robots', content: 'noindex nofollow' }] : [],
        ],
      };
    },
    computed: {
      navHeight() {
        return this.$store.getters.getBannerStatus ? 'calc(6rem + 4.2rem)' : '6rem';
      },
      metaDescription () {
        return this.$store.state.seoData[this.$i18n.locale].metaDescription || null;
      },
      shareImage () {
        return this.$store.state.seoData[this.$i18n.locale].shareImage || null;
      },
    },
  };
</script>

<template>
  <div class="page" :style="{ paddingTop: navHeight }">
    <Navigation v-if="!$config.livePreview || $config.devMode" />
    <Nuxt />
    <PageFooter v-if="!$config.livePreview || $config.devMode" />
    <!--Functional components -->
    <Icons />
    <PreviewScrollPosition v-if="$config.livePreview" />
  </div>
</template>
