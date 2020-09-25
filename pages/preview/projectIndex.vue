<script>
import collect from "collect.js";
import projectIndex from "../projects/index";

export default {
  extends: projectIndex,
  async asyncData ({ $craft, $config, query, error }) {
    const categoriesByLocale = collect(await $craft('categories'))
      .groupBy('locale')
      .map((cat) => cat.groupBy('group').all())
      .all();

    const projectEntriesByLocale = collect(await $craft('projects')).groupBy('locale').all();

    const projectIndexPagePreview = collect(await $craft('projectIndex'))
      .filter(projectIndex => projectIndex.locale === query.locale)
      .first();

    if (! $config.livePreview || ! projectIndexPagePreview) {
      return error({statusCode: 404, message: 'Page not found'});
    }

    return {
      categoriesByLocale,
      projectEntriesByLocale,
      projectIndexPage: projectIndexPagePreview,
    };
  },
};
</script>
