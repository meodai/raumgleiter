<script>
import collect from "collect.js";

export default {
  nuxtI18n: {
    paths: {
      de: '/virtuelle-lösungen', // -> accessible at /virtuelle-lösungen
      fr: '/solutions-virtuelles', // -> accessible at /fr/solutions-virtuelles
      en: '/virtual-solutions', // -> accessible at /en/virtual-solutions
    }
  },
  async asyncData ({ $http }) {
    const solutionsPageByLocale = collect(await $http.$get('/solutions.json').then(data => data.data))
    .keyBy('locale').all()

    return { solutionsPageByLocale };
  },
  computed: {
    solutionsPage () {
      // Return page in current Locale
      return this.solutionsPageByLocale[this.$i18n.locale];
      // Fallback for dev environment
      // || this.solutionsPageByLocale[Object.keys(this.solutionsPageByLocale)[0]];
    },
  },
}
</script>

<template>
    <div>
      <h1>{{ solutionsPage.header }}</h1>
      <p>{{ solutionsPage.lead }}</p>

      <hr>
      <Pagebuilder slug="solutions" :blocks="solutionsPage.solutions" />

      <hr>
      <Pagebuilder slug="team" :blocks="solutionsPage.cta" />

    </div>
</template>
