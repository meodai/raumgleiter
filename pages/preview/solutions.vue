<script>
import collect from "collect.js";
import solutions from '../solutions';

export default {
  extends: solutions,
  async asyncData ({ $http, store, query, error, $config }) {

    const solutions = collect(await $http.$get('/solutions.json?token=' + query.token).then(data => data.data))
    .filter(solutions => solutions.locale === query.locale)
    .first();

    if (! $config.livePreview || ! solutions) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    await store.dispatch('i18n/setRouteParams', solutions.locale_slugs);

    return { solutions };
  },
  computed: {
    solutionsPage() {
      // Return page in current Locale
      return this.solutions;
    },
  },
}
</script>
