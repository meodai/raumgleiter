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
    head () {
      return {
        title: this.projectEntry.title,
        // meta: [
        //   { hid: 'description', name: 'description', content: this.description },
        //   { hid: 'og:description', name: 'og:description', content: this.description },
        // ],
      };
    },
  }
</script>

<template>
  <div class="l-design-width">
    <h1 class="t-title t-title--page">{{ projectEntry.title }}</h1>

    <h3>{{ $t('Aufgabe') }}.</h3>
    <p>{{ projectEntry.projectData[0] }}</p>


    <ResponsiveImage :image="projectEntry.image" />




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
<!--          <p>Video</p>-->
        </template>
        <template v-else-if="media.iframe !== null">
          <!-- media.iframe -->
<!--          Ratio: 16:9 -->
<!--          <iframe :src="media.iframe" frameborder="0"></iframe>-->
        </template>
      </figure>
      <br><br>
    </template>


  </div>
</template>
