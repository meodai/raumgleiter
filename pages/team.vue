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
    async asyncData ({ $craft }) {
      return {
        teamPageByLocale: collect(await $craft('team')).keyBy('locale').all(),
      };
    },
    computed: {
      teamPage () {
        return this.teamPageByLocale[this.$i18n.locale];
      },
    },
  };
</script>

<template>
  <div>
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
        <br>
        <a v-if="person.email" :href="'mailto:'+person.email">{{ person.email }}</a>
        <a v-if="person.phone" :href="'tel:'+person.phone">{{ person.phone }}</a>
        <br>
        <ul>
          <li v-for="link in person.socialLinks">
            <a :href="link.url" rel="nofollow noopener">{{ link.type }}</a>
          </li>
        </ul>
        <hr>
      </li>
    </ul>

    <hr>
    <Pagebuilder slug="team" :blocks="teamPage.cta" />
  </div>
</template>
