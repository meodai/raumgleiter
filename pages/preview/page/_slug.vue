<script>
import collect from "collect.js";

export default {
  async asyncData ({ $craft, query, store, error, $config, params }) {

    const pageEntryByLocale = collect(await $craft('pages'))
      .filter(page => page.slug === params.slug)
      .keyBy('locale');

    if (! $config.livePreview || ! pageEntryByLocale.count()) {
      return error({statusCode: 404, message: 'Page not found'});
    }

    await store.dispatch('i18n/setRouteParams', pageEntryByLocale.first().locale_slugs);

    return { pageEntryByLocale: pageEntryByLocale.all() };
  },
  computed: {
    pageEntry() {
      return this.pageEntryByLocale[this.$i18n.locale];
    },
  },
}
</script>

<template>
  <div>
    <Pagebuilder :slug="pageEntry.slug" :blocks="pageEntry.pagebuilder" />
  </div>
</template>
