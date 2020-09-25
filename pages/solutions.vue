<script>
import collect from "collect.js";

export default {
  nuxtI18n: {
    paths: {
      de: '/virtuelle-loesungen', // -> accessible at /virtuelle-loesungen
      fr: '/solutions-virtuelles', // -> accessible at /fr/solutions-virtuelles
      en: '/virtual-solutions', // -> accessible at /en/virtual-solutions
    }
  },
  async asyncData ({ $craft }) {
    return {
      solutionsPageByLocale: collect(await $craft('solutions')).keyBy('locale').all()
    };
  },
  computed: {
    solutionsPage () {
      return this.solutionsPageByLocale[this.$i18n.locale];
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
