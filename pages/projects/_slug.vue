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

      if(projectEntry.count()) {
        await store.dispatch('i18n/setRouteParams', projectEntry.first().locale_slugs);
      }

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
    <PreviewScrollPosition />

    <h1>{{ project.title }}</h1>

    <br><br>
    <figure style="max-width: 200px">
      <ResponsiveImage v-if="project.image" :image="project.image" />
    </figure>

    <hr>
    <h3>Aufgabe.</h3>
    <p>{{project.projectData[0]}}</p>
    <br>
    <h3>Kunde.</h3>
    <p>{{project.projectData[1]}}</p>
    <br>
    <h3>Leistungen.</h3>
    <p>{{project.projectData[2]}}</p>
    <br>
    <h3>Benefit.</h3>
    <p>{{project.projectData[3]}}</p>
    <br><br>
    <hr>
    <template v-for="media in project.media">
      <figure style="max-width: 400px">
        <ResponsiveImage v-if="media.type === 'image'" :image="media.image" />
        <template v-else-if="media.type === 'video'">
          <!-- media.video.mp4 -->
          <p>Video</p>
        </template>
      </figure>
      <br><br>
    </template>


  </div>
</template>
