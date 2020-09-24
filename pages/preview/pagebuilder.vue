<script>
import collect from "collect.js";
import page from './pages/_slug';

export default {
  extends: page,
  async asyncData ({ $http, query, store, error, $config }) {

    const pageEntryPreview = collect(await $http.$get('/pages.json?token=' + query.token).then(data => data.data))
    .filter(page => page.slug === query.CraftPreviewSlug && page.locale === query.locale)
    .first();

    if (! $config.livePreview || ! pageEntryPreview) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    await store.dispatch('i18n/setRouteParams', pageEntryPreview.locale_slugs);

    return { pageEntry: pageEntryPreview };
  },
}
</script>
