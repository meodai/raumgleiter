<script>
import collect from "collect.js";

export default {
  async asyncData ({ $http, query, store, error, $config }) {

    const page = collect(await $http.$get('/pages.json?token=' + query.token).then(data => data.data))
    .filter(page => page.slug === query.CraftPreviewSlug && page.locale === query.locale)
    .first();

    if (! $config.livePreview || ! page) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    await store.dispatch('i18n/setRouteParams', page.locale_slugs);

    return { page };
  },
  computed: {
    videoTeasers () {
      return [{
        video: this.page.headerVideo.mp4,
        title: this.page.header,
      }]
    },
  },
}
</script>

<template>
  <div>
    <VideoTeaser :entries="videoTeasers" />

    <Pagebuilder :slug="page.slug" :blocks="page.pagebuilder" />

  </div>
</template>
