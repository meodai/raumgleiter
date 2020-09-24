<script>
import collect from "collect.js";

export default {
  async asyncData ({ $http, store, params }) {
    const pageEntryByLocale = collect(await $http.$get('/pages.json').then(data => data.data))
      .filter(page => page.slug === params.slug)
      .keyBy('locale');

    if(pageEntryByLocale.count()) {
      await store.dispatch('i18n/setRouteParams', pageEntryByLocale.first().locale_slugs);
    }

    return { pageEntryByLocale: pageEntryByLocale.all() };
  },
  computed: {
    pageEntry() {
      return this.pageEntryByLocale[this.$i18n.locale];
      // Fallback for dev environment
      // || this.pageEntries[Object.keys(this.pageEntries)[0]];
    },
    videoTeasers () {
      return this.pageEntry ? [{
        video: this.pageEntry.headerVideo.mp4 || null,
        title: this.pageEntry.header,
      }] : [];
    },
  },
}
</script>

<template>
  <div>
    <PreviewScrollPosition />

    <Pagebuilder :slug="pageEntry.slug" :blocks="pageEntry.pagebuilder" />
  </div>
</template>
