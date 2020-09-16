<script>
import collect from "collect.js";
import team from '../team';

export default {
  extends: team,
  async asyncData ({ $http, store, query, error, $config }) {

    const team = collect(await $http.$get('/team.json?token=' + query.token).then(data => data.data))
    .filter(team => team.locale === query.locale)
    .first();

    if (! $config.livePreview || ! team) {
      error({statusCode: 404, message: 'Page not found'})
      return {}
    }

    await store.dispatch('i18n/setRouteParams', team.locale_slugs);

    return { team };
  },
  computed: {
    teamPage() {
      // Return page in current Locale
      return this.team;
    },
  },
}
</script>
