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
      <br><br>

      <!-- Anchors -->
      <h3>Leistungen</h3>
      <ul>
        <li v-for="leistung in solutionsPage.anchors.leistung">
          <nuxt-link :to="{ hash: '#'+leistung.anchor }">{{ leistung.label }}</nuxt-link>
        </li>
      </ul>
      <h3>Services</h3>
      <ul>
        <li v-for="service in solutionsPage.anchors.service">
          <nuxt-link :to="{ hash: '#'+service.anchor }">{{ service.label }}</nuxt-link>
        </li>
      </ul>

      <hr>
      <Pagebuilder slug="solutions" :blocks="solutionsPage.solutions" />

      <hr>
      <Pagebuilder slug="team" :blocks="solutionsPage.cta" />

    </div>
</template>
