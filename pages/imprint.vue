<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/impressum',
        fr: '/imprimer',
        en: '/imprint',
      },
    },
    async asyncData ({ $craft }) {
      return {
        imprintPageByLocale: collect(await $craft('impressum')).keyBy('locale').all(),
      };
    },
    computed: {
      imprintPage () {
        return this.imprintPageByLocale[this.$i18n.locale];
      },
    },
    head () {
      return {
        title: this.imprintPage.title || null,
      };
    },
  };
</script>

<template>
  <div>
    <div class="l-design-width content">
      <div v-html="imprintPage.body"></div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
