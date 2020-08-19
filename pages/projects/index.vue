<script>
import collect from 'collect.js';
import FilterButton from "../../components/ProjectFilter/FilterButton";

export default {
    nuxtI18n: {
        paths: {
            de: '/projekte',
            fr: '/projets', // -> accessible at /fr/projets
            en: '/projects', // -> accessible at /en/projects
        }
    },
    components: {
        FilterButton,
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
            // Filter only by offer category for now
            if (! this.$route.query.offers) {
                return 'all';
            }
            let query = this.$route.query.offers.split(',')
            return query.map(c => `.offers-${c}`).join(', ');
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
        Projekt-Übersicht
        <hr>

        <!-- Filter -->
        <h2>Angebote</h2>
        <ul>
            <li
                v-for="offer in categoriesInCurrentLocale.offers"
            >
                <FilterButton :category="offer" />
            </li>
        </ul>
        <hr>

        <!-- Gefilterte Projekte -->
        <ul ref="projectContainer">
            <li
                v-for="project in projectsInCurrentLocale"
                :key="'project'+project.slug"
                class="mix"
                :class="[ project.categories.offers ? 'offers-'+project.categories.offers[0] : null ]"
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
