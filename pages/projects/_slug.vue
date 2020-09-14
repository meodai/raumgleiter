<script>
  import collect from "collect.js";

  export default {
    nuxtI18n: {
      paths: {
        de: '/projekte/:slug',
        fr: '/projets/:slug',
        en: '/projects/:slug',
      }
    },
    async asyncData({$http, params, store}) {
      let projectEntry = collect(await $http.$get(`/projects/${params.slug}.json`).then(data => data.data))
        .keyBy('locale');

      await store.dispatch('i18n/setRouteParams', projectEntry.first().locale_slugs);

      return { projectEntry: projectEntry.all() };
    },
    computed: {
      project()
      {
        return this.projectEntry[this.$i18n.locale]
          // Fallback for dev environment
          || this.projectEntry[Object.keys(this.projectEntry)[0]];
      },
    },
  }
</script>

<template>
  <div>

<!--    <nuxt-link :to="localePath('projects')">Zurück zu Projekten</nuxt-link>-->

    <h1>{{ project.title }}</h1>


  </div>
</template>
