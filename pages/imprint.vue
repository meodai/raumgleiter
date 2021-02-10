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
    <div class="l-design-width content imprint">
      <div v-html="imprintPage.body"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .imprint h2 {
    margin-top: var(--size-pony);
  }
  .imprint h2:first-child {
    margin-top: 0;
  }
  .imprint h3,
  .imprint h4 {
    color: var(--color-text--accent);
  }
  .imprint h3 {
    margin-top: var(--size-cat);
  }
  .imprint h4 {
    margin-top: var(--size-mouse);
  }
</style>
