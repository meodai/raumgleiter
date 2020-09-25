<script>
import collect from "collect.js";
import team from '../team';

export default {
  extends: team,
  async asyncData ({ $craft, query, error, $config }) {
    // Get page in selected locale
    const teamPagePreview = collect(await $craft('team'))
      .filter(teamPagePreview => teamPagePreview.locale === query.locale)
      .first();

    if (! $config.livePreview || ! teamPagePreview) {
      return error({statusCode: 404, message: 'Page not found'});
    }

    return { teamPage: teamPagePreview };
  },
}
</script>
