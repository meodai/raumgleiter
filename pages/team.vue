<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      // todo: get from slug
      paths: {
        de: '/team',
        fr: '/team',
        en: '/team',
      },
    },
    async asyncData ({ $http, store, params }) {
      const teamPages = collect(await $http.$get('/team.json').then(data => data.data))
        .keyBy('locale');

      if (teamPages.count()) {
        await store.dispatch('i18n/setRouteParams', teamPages.first().locale_slugs);
      }

      return { teamPages: teamPages.all() };
    },
    computed: {
      teamPage () {
        // Return page in current Locale
        return this.teamPages[this.$i18n.locale] ||
          // Fallback for dev environment
          this.teamPages[Object.keys(this.teamPages)[0]];
      },
    },
  };
</script>

<template>
  <div>
    <PreviewScrollPosition />

    <h1>{{ teamPage.header }}</h1>
    <p>{{ teamPage.lead }}</p>
    <!-- teamPage.backgroundImage -->

    <hr>
    <ul>
      <li v-for="person in teamPage.people">
        {{ person.name }} <br>
        {{ person.role }} <br>
        <!-- person.image -->
        <br>
      </li>
    </ul>

    <hr>
    <Pagebuilder slug="team" :blocks="teamPage.pagebuilder" />
  </div>
</template>
