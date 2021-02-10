<script>
  import collect from 'collect.js';
  import imprint from '../imprint';

  export default {
    extends: imprint,
    async asyncData ({ $craft, query, error, $config }) {
      // Get page in selected locale
      const imprintPagePreview = collect(await $craft('impressum'))
        .filter(imprintPagePreview => imprintPagePreview.locale === query.locale)
        .first();

      if (!$config.devMode && (!$config.livePreview || !imprintPagePreview)) {
        return error({ statusCode: 404 });
      }

      return { imprintPage: imprintPagePreview };
    },
  };
</script>
