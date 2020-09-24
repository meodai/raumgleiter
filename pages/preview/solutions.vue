<script>
import collect from "collect.js";
import solutions from '../solutions';

export default {
  extends: solutions,
  async asyncData ({ $http, query, error, $config }) {

    const solutionsPagePreview = collect(await $http.$get('/solutions.json?token=' + query.token).then(data => data.data))
    .filter(solutionsPagePreview => solutionsPagePreview.locale === query.locale)
    .first();

    if (! $config.livePreview || ! solutionsPagePreview) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }
    return { solutionsPage: solutionsPagePreview };
  },
}
</script>
