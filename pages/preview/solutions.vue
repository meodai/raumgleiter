<script>
  import collect from 'collect.js';
  import solutions from '../solutions';

  export default {
    extends: solutions,
    async asyncData ({ $craft, query, error, $config }) {
      // Get page in selected locale
      const solutionsPagePreview = collect(await $craft('solutions'))
        .filter(page => page.locale === query.locale)
        .first();

      if (!$config.devMode && (!$config.livePreview || !solutionsPagePreview)) {
        return error({ statusCode: 404 });
      }

      return { solutionsPage: solutionsPagePreview };
    },
  };
</script>
