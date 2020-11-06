<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/projekte', // -> accessible at /projekte
        fr: '/projets', // -> accessible at /fr/projets
        en: '/projects', // -> accessible at /en/projects
      },
    },
    async asyncData ({ $craft }) {
      return {
        projectEntriesByLocale: collect(await $craft('projects')).groupBy('locale').all(),
        projectIndexPageByLocale: collect(await $craft('projectIndex')).keyBy('locale').all(),
        categoriesByLocale: collect(await $craft('categories'))
          .groupBy('locale')
          .map(cat => cat.groupBy('group').all())
          .all(),
      };
    },
    data () {
      return {
        randomisedProjects: [],
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
      filterClass () {
        let filterClasses = collect([]);
        Object.keys(this.categoriesInCurrentLocale).forEach((category) => {
          if (this.$route.query[category]) {
            const query = this.$route.query[category].split(',');
            const queryClasses = query.map(c => `.${category}-${c}`);
            filterClasses = filterClasses.count()
              ? filterClasses.crossJoin(queryClasses).map(v => v.join(''))
              : filterClasses.merge(queryClasses);
          }
        });

        return filterClasses.count() ? filterClasses.join(', ') : 'all';
      },
    },
    watch: {
      '$route.query' () {
        this.mixer.filter(this.filterClass);
      },
    },
    created () {
      this.randomisedProjects = collect(this.projectsInCurrentLocale).shuffle().all();
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
    head () {
      return {
        title: this.projectIndexPage ? this.projectIndexPage.title : null,
      };
    },
  };
</script>

<template>
  <div>
    <Intro
      :is-white="true"
      :fields="{
        header: projectIndexPage.header,
        lead: projectIndexPage.lead,
      }"
    />

    <!-- Filter -->
    <ProjectFilter
      :categories="{
        sector: categoriesInCurrentLocale['sectors'],
        offer: categoriesInCurrentLocale['offers'],
      }"
    />

    <div class="l-design-width grid__warp">
      <ol
        ref="projectContainer"
        class="grid"
      >
        <ProjectGridItem
          v-for="project in randomisedProjects"
          :key="'project'+project.slug"
          class="grid-item mix"
          :project="project"
        />
      </ol>

      <Pagebuilder :blocks="projectIndexPage.cta" />
    </div>
  </div>
</template>

<style scoped>
  .grid {
    display: grid;                                                /* 1 */
    grid-auto-rows: calc(100vw * .5 * 0.5625); /* 16:9 */
    grid-gap: 0;                                               /* 3 */
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));   /* 4 */
    margin-left: calc(-1 * var(--size-design-bezel));
    margin-right: calc(-1 * var(--size-design-bezel));
  }

  .grid__warp {
    padding-top: 0;
  }
</style>
