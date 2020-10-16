<script>
  import collect from 'collect.js';
  import page from './page/_slug';

  export default {
    extends: page,
    async asyncData ({ $craft, query, store, error, $config }) {
      const pageEntryPreview = collect(await $craft('pages'))
        .filter(page => page.slug === query.CraftPreviewSlug && page.locale === query.locale)
        .first();

      if (!$config.devMode && (!$config.livePreview || !pageEntryPreview)) {
        return error({ statusCode: 404, message: 'Page not found' });
      }

      await store.dispatch('i18n/setRouteParams', pageEntryPreview.locale_slugs);

      return { pageEntry: pageEntryPreview };
    },
  };
</script>
