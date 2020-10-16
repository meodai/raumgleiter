<script>
  import collect from 'collect.js';
  import project from '../projects/_slug';

  export default {
    extends: project,
    async asyncData ({ $craft, $config, store, query, error }) {
      const projectEntryPreview = collect(await $craft(`projects/${query.CraftPreviewSlug}`))
        .filter(page => page.locale === query.locale)
        .first();

      if (!$config.devMode && (!$config.livePreview || !projectEntryPreview)) {
        return error({ statusCode: 404, message: 'Page not found' });
      }

      await store.dispatch('i18n/setRouteParams', projectEntryPreview.locale_slugs);

      return { projectEntry: projectEntryPreview };
    },
  };
</script>
