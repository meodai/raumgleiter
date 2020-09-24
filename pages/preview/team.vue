<script>
import collect from "collect.js";
import team from '../team';

export default {
  extends: team,
  async asyncData ({ $http, query, error, $config }) {

    const teamPagePreview = collect(await $http.$get('/team.json?token=' + query.token).then(data => data.data))
    .filter(teamPagePreview => teamPagePreview.locale === query.locale)
    .first();

    if (! $config.livePreview || ! teamPagePreview) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    return { teamPage: teamPagePreview };
  },
}
</script>
