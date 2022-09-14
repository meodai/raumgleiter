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
      const pagesByLocale = collect(await $craft('hiddenPages'));
      const currentPage = pagesByLocale.where('slug', params.slug).first();

      if (!currentPage) {
        return error({ statusCode: 404 });
      }

      await store.dispatch('i18n/setRouteParams', currentPage.locale_slugs);

      return {
        currentPage,
      };
    },
    head () {
      return {
        title: this.currentPage.title || null,
      };
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
