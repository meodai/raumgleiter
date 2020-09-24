<script>
import collect from "collect.js";
import project from "../projects/_slug";

export default {
  extends: project,
  async asyncData({$http, $config, store, query, error}) {

    let projectEntryPreview = collect(await $http.$get(`/projects/${query.CraftPreviewSlug}.json?token=${query.token}`).then(data => data.data))
      .filter(page => page.locale === query.locale)
      .first();

    if (! $config.livePreview || ! projectEntryPreview) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    await store.dispatch('i18n/setRouteParams', projectEntryPreview.locale_slugs);

    return { projectEntry: projectEntryPreview };
  },
};
</script>
