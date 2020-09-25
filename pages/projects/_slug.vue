<script>
  import collect from "collect.js";

  export default {
    nuxtI18n: {
      paths: {
        de: '/projekte/:slug', // -> accessible at /projekte/:slug
        fr: '/projets/:slug', // -> accessible at /fr/projets/:slug
        en: '/projects/:slug', // -> accessible at /en/projects/:slug
      }
    },
    async asyncData({$craft, params, store}) {
      let projectEntryByLocale = collect(await $craft(`projects/${params.slug}`)).keyBy('locale');

      if(projectEntryByLocale.count()) {
        await store.dispatch('i18n/setRouteParams', projectEntryByLocale.first().locale_slugs);
      }

      return { projectEntryByLocale: projectEntryByLocale.all() };
    },
    computed: {
      projectEntry() {
        return this.projectEntryByLocale[this.$i18n.locale];
      },
    },
  }
</script>

<template>
  <div>
    <PreviewScrollPosition />

    <h1>{{ projectEntry.title }}</h1>

    <br><br>
    <figure style="max-width: 200px">
      <ResponsiveImage v-if="projectEntry.image" :image="projectEntry.image" />
    </figure>

    <hr>
    <h3>Aufgabe.</h3>
    <p>{{projectEntry.projectData[0]}}</p>
    <br>
    <h3>Kunde.</h3>
    <p>{{projectEntry.projectData[1]}}</p>
    <br>
    <h3>Leistungen.</h3>
    <p>{{projectEntry.projectData[2]}}</p>
    <br>
    <h3>Benefit.</h3>
    <p>{{projectEntry.projectData[3]}}</p>
    <br><br>
    <hr>
    <template v-for="media in projectEntry.media">
      <figure style="max-width: 400px">
        <ResponsiveImage v-if="media.images.length > 0" :image="media.images[0]" />
        <template v-else-if="media.video !== null">
          <!-- media.video.mp4 -->
          <p>Video</p>
        </template>
        <template v-else-if="media.iframe !== null">
          <!-- media.video.mp4 -->
          <p>Iframe</p>
        </template>
      </figure>
      <br><br>
    </template>


  </div>
</template>
