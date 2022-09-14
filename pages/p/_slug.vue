<script>
  import collect from 'collect.js';

  export default {
    name: 'ContentPage',
    key: 'hiddenPage',
    nuxtI18n: {
      paths: {
        de: '/p/:slug', // -> accessible at /p/:slug
        fr: '/p/:slug', // -> accessible at /fr/p/:slug
        en: '/p/:slug', // -> accessible at /en/p/:slug
      },
    },
    async asyncData ({ $craft, params, error, store }) {
      const pagesByLocale = collect(await $craft('hiddenPages'))
        .where('slug', params.slug)
        .keyBy('locale');

      if (pagesByLocale.count() < 1) {
        return error({ statusCode: 404 });
      }

      await store.dispatch('i18n/setRouteParams', pagesByLocale.first().locale_slugs);

      return {
        pagesByLocale: pagesByLocale.all(),
      };
    },
    head () {
      return {
        title: this.currentPage.title || null,
      };
    },
    computed: {
      currentPage () {
        return this.pagesByLocale[this.$i18n.locale];
      },
    },
  };
</script>

<template>
  <div>
    <div class="l-design-width content imprint">
      <div v-html="currentPage.body" />
    </div>
  </div>
</template>
