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
    async asyncData ({ $axios }) {

        const allCategories = collect(await $axios.$get('/categories.json').then(data => data.data))
        .groupBy('lang').map((cat) => cat.groupBy('group').all()).all();
        // Load all projects when building static site
        const allProjectEntries = collect(await $axios.$get('/projects.json').then(data => data.data))
        .groupBy('lang').all();
        return { allProjectEntries, allCategories };
    },
    computed: {
        categoriesInCurrentLocale () {
            return this.allCategories[this.$i18n.locale];
        },
        projectsInCurrentLocale () {
            // Get localized project entries
            return this.allProjectEntries[this.$i18n.locale];
        },
        mixer () {
            return this.$store.state.projectMixer;
        },
        filterClass() {
            // TODO: For now, all matched projects are shown
            // should they be constrained by group?
            let filterClasses = [];
            Object.keys(this.categoriesInCurrentLocale).forEach((category) => {
                if (this.$route.query[category]) {
                    let query = this.$route.query[category].split(',')
                    filterClasses = [...filterClasses, ...query.map(c => `.${category}-${c}`)];
                }
            });
            return filterClasses.length ? filterClasses.join(', ') : 'all';
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
        <h1>Projekt-Übersicht</h1>
        <hr>

        <!-- Filter -->
        <ProjectFilter :categories="categoriesInCurrentLocale" />

        <!-- Gefilterte Projekte -->
        <ul ref="projectContainer">
            <li
                v-for="project in projectsInCurrentLocale"
                :key="'project'+project.slug"
                class="mix"
                :class="[
                    // temp. assign classes -> move to computed
                    project.categories.offers ? 'offers-'+project.categories.offers[0] : null,
                    project.categories.services ? 'services-'+project.categories.services[0] : null,
                    project.categories.sectors ? 'sectors-'+project.categories.sectors[0] : null,
                 ]"
            >
                <nuxt-link
                    :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
                >
                    {{ project.title }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
