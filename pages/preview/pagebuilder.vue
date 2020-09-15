<script>
import collect from "collect.js";
import page from './pagebuilder/_slug';

export default {
  extends: page,
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
  }
}
</script>
