<script>
import collect from "collect.js";
import projectIndex from "../projects/index";

export default {

  extends: projectIndex,

  async asyncData ({ $http, $config, store, query, error }) {
    // todo: get only project page data
    const allCategories = collect(await $http.$get('/categories.json?token=' + query.token).then(data => data.data))
    .groupBy('locale').map((cat) => cat.groupBy('group').all()).all();

    const allProjectEntries = collect(await $http.$get('/projects.json?token=' + query.token).then(data => data.data))
    .groupBy('locale').all();

    const projectIndexPages = collect(await $http.$get('/projectIndex.json?token=' + query.token).then(data => data.data))
    .filter(projectIndex => projectIndex.locale === query.locale)
    .first();

    if (! $config.livePreview || ! projectIndexPages) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    return { allProjectEntries, allCategories, projectIndexPages };
  },
  computed: {
    projectIndexPage () {
      // Return page in current Locale
      return this.projectIndexPages;
    },
  },
};
</script>
