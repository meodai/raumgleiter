<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/team', // -> accessible at /team
        fr: '/team', // -> accessible at /fr/team
        en: '/team', // -> accessible at /en/team
      },
    },
    async asyncData ({ $http }) {
      const teamPageByLocale = collect(await $http.$get('/team.json').then(data => data.data))
        .keyBy('locale').all();

      return { teamPageByLocale };
    },
    computed: {
      teamPage () {
        // Return page in current Locale
        return this.teamPageByLocale[this.$i18n.locale];
        // Fallback for dev environment
        // || this.teamPageByLocale[Object.keys(this.teamPageByLocale)[0]];
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

        <div style="max-width: 300px">
          <ResponsiveImage :image="person.image" />
        </div>
        <br>
        {{ person.name }} <br>
        {{ person.role }} <br>
        <!-- person.image -->
        <br>
      </li>
    </ul>

    <hr>
    <Pagebuilder slug="team" :blocks="teamPage.cta" />
  </div>
</template>
