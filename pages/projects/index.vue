<script>
import collect from 'collect.js';
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";

export default {
  nuxtI18n: {
    paths: {
      de: '/projekte', // -> accessible at /projekte
      fr: '/projets', // -> accessible at /fr/projets
      en: '/projects', // -> accessible at /en/projects
    }
  },
  components: {
    ProjectFilter,
  },
  async asyncData ({ $craft }) {
    return {
      projectEntriesByLocale: collect(await $craft('projects')).groupBy('locale').all(),
      projectIndexPageByLocale: collect(await $craft('projectIndex')).keyBy('locale').all(),
      categoriesByLocale: collect(await $craft('categories'))
        .groupBy('locale')
        .map((cat) => cat.groupBy('group').all())
        .all(),
    };
  },
  computed: {
    categoriesInCurrentLocale () {
      return this.categoriesByLocale[this.$i18n.locale];
    },
    projectsInCurrentLocale () {
      return this.projectEntriesByLocale[this.$i18n.locale];
    },
    projectIndexPage () {
      return this.projectIndexPageByLocale[this.$i18n.locale];
      // Fallback for dev environment
      // || this.projectIndexPageByLocale[Object.keys(this.projectIndexPageByLocale)[0]];
    },
    mixer () {
      return this.$store.state.projectMixer;
    },
    filterClass() {
      let filterClasses = collect([]);
      Object.keys(this.categoriesInCurrentLocale).forEach((category) => {
        if (this.$route.query[category]) {
          let query = this.$route.query[category].split(',')
          let queryClasses = query.map(c => `.${category}-${c}`);
          filterClasses = filterClasses.count()
            ? filterClasses.crossJoin(queryClasses).map(v => v.join(''))
            : filterClasses.merge(queryClasses);
        }
      });

      return filterClasses.count() ? filterClasses.join(', ') : 'all';
    }
  },
  watch: {
    '$route.query' () {
      this.mixer.filter(this.filterClass);
    },
  },
  mounted () {
    this.initMixer();
  },
  methods: {
    initMixer () {
      const mixer = this.mixitup(this.$refs.projectContainer, {
        load: {
          filter: this.filterClass,
        },
      });
      this.$store.commit('setProjectMixer', mixer);
    },
  },
}
</script>

<template>
  <div>
    <PreviewScrollPosition />
    <h1>{{ projectIndexPage.header }}</h1>
    <p>{{ projectIndexPage.lead }}</p>
    <hr>

    <!-- Filter -->
    <ProjectFilter :categories="{
      sector: categoriesInCurrentLocale['sectors'],
      offer: categoriesInCurrentLocale['offers'],
    }" />

    <!-- Gefilterte Projekte -->
    <ul ref="projectContainer">
      <li
        v-for="project in projectsInCurrentLocale"
        :key="'project'+project.slug"
        class="mix"
        :class="[
          // temp. assign classes -> move to computed
          project.categories.sectors ? 'sectors-'+project.categories.sectors[0] : null,
          project.categories.offers ? 'offers-'+project.categories.offers[0] : null,
        ]"
      >
        <nuxt-link
          :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
        >
          {{ project.title }}
        </nuxt-link>
      </li>
    </ul>

    <hr>
    <Pagebuilder slug="projects" :blocks="projectIndexPage.pagebuilder" />
  </div>
</template>
