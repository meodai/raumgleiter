<script>
import collect from "collect.js";
import projectIndex from "../projects/index";

export default {
  extends: projectIndex,
  async asyncData ({ $http, $config, store, query, error }) {
    const categoriesByLocale = collect(await $http.$get('/categories.json?token=' + query.token).then(data => data.data))
    .groupBy('locale').map((cat) => cat.groupBy('group').all()).all();

    const projectEntriesByLocale = collect(await $http.$get('/projects.json?token=' + query.token).then(data => data.data))
    .groupBy('locale').all();

    const projectIndexPagePreview = collect(await $http.$get('/projectIndex.json?token=' + query.token).then(data => data.data))
    .filter(projectIndex => projectIndex.locale === query.locale)
    .first();

    if (! $config.livePreview || ! projectIndexPagePreview) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    return {
      categoriesByLocale,
      projectEntriesByLocale,
      projectIndexPage: projectIndexPagePreview,
    };
  },
};
</script>
