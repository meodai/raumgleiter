<script>
/**
 * TEST Component, um eine einzelne Inhaltsseite darzustellen
 */
import collect from "collect.js";

export default {
  nuxtI18n: {
    paths: {
      de: '/page/:slug',
      fr: '/page/:slug',
      en: '/page/:slug',
    }
  },
  async asyncData({$axios, params, store}) {
    let pageEntries = collect(await $axios.$get(`/pages.json`).then(data => data.data))
    .filter((p) => p.slug === params.slug)
    .keyBy('lang');
    await store.dispatch('i18n/setRouteParams', pageEntries.first().locale_slugs);

    return {pageEntries: pageEntries.all()};
  },
  computed: {
    pageInCurrentLocale() {
      return this.pageEntries[this.$i18n.locale]
        // Fallback for dev environment
        || this.pageEntries[Object.keys(this.pageEntries)[0]];
    },
  },
}
</script>

<template>
  <div>
    <!-- Video Header -->

    <!-- Pagebuilder -->
    <Pagebuilder
      :slug="pageInCurrentLocale.slug"
      :blocks="pageInCurrentLocale.pagebuilder"
    />
  </div>
</template>
