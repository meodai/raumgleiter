<script>
import collect from 'collect.js';
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";

export default {
  nuxtI18n: {
    paths: {
      de: '/projekte',
      fr: '/projets', // -> accessible at /fr/projets
      en: '/projects', // -> accessible at /en/projects
    }
  },
  components: {
    ProjectFilter,
  },
  async asyncData ({ $http }) {
    const allCategories = collect(await $http.$get('/categories.json').then(data => data.data))
      .groupBy('locale').map((cat) => cat.groupBy('group').all()).all();

    const allProjectEntries = collect(await $http.$get('/projects.json').then(data => data.data))
      .groupBy('locale').all();

    const projectIndexPages = collect(await $http.$get('/projectIndex.json').then(data => data.data))
      .groupBy('locale');

    return { allProjectEntries, allCategories, projectIndexPages: projectIndexPages.all() };
  },
  computed: {
    categoriesInCurrentLocale () {
      return this.allCategories[this.$i18n.locale];
    },
    projectsInCurrentLocale () {
      return this.allProjectEntries[this.$i18n.locale];
    },
    projectIndexPage () {
      // Return page in current Locale
      return this.projectIndexPages[this.$i18n.locale][0] ||
        // Fallback for dev environment
        this.projectIndexPages[Object.keys(this.projectIndexPages)[0]];
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
