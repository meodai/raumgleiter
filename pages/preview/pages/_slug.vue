<script>
import collect from "collect.js";

export default {
  async asyncData ({ $http, store, params }) {

    const pageEntries = collect(await $http.$get('/pages.json').then(data => data.data))
    .filter(page => page.slug === params.slug)
    .keyBy('locale');

    if(pageEntries.count()) {
      await store.dispatch('i18n/setRouteParams', pageEntries.first().locale_slugs);
    }

    return { pageEntries: pageEntries.all() };
  },
  computed: {
    page()
    {
      return this.pageEntries[this.$i18n.locale]
        // Fallback for dev environment
        || this.pageEntries[Object.keys(this.pageEntries)[0]];
    },
    videoTeasers () {
      return this.page ? [{
        video: this.page.headerVideo.mp4 || null,
        title: this.page.header,
      }] : [];
    },
  },
}
</script>

<template>
  <div v-if="page">

    <PreviewScrollPosition />

    <client-only>
      <VideoTeaser :entries="videoTeasers" />
    </client-only>

    <Pagebuilder :slug="page.slug" :blocks="page.pagebuilder" />

  </div>
</template>
