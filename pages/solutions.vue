<script>
import collect from "collect.js";

export default {
  nuxtI18n: {
    // todo: get from slug
    paths: {
      de: '/virtuelle-lösungen',
      fr: '/virtuelle-lösungen',
      en: '/virtual-solutions',
    }
  },
  async asyncData ({ $http, store, params }) {
    const solutionsPages = collect(await $http.$get('/solutions.json').then(data => data.data))
    .keyBy('locale');

    if (solutionsPages.count()) {
      await store.dispatch('i18n/setRouteParams', solutionsPages.first().locale_slugs);
    }

    return { solutionsPages: solutionsPages.all() };
  },
  computed: {
    solutionsPage () {
      // Return page in current Locale
      return this.solutionsPages[this.$i18n.locale] ||
        // Fallback for dev environment
        this.solutionsPages[Object.keys(this.solutionsPages)[0]];
    },
  },
}
</script>

<template>
    <div>
      <h1>{{ solutionsPage.header }}</h1>
      <p>{{ solutionsPage.lead }}</p>

      <hr>
      <Pagebuilder :slug="solutions" :blocks="solutionsPage.solutions" />


      <hr>
      <Pagebuilder slug="team" :blocks="solutionsPage.cta" />

    </div>
</template>
