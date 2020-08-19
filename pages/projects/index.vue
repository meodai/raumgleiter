<script>
import collect from 'collect.js';

export default {
    nuxtI18n: {
        paths: {
            de: '/projekte',
            fr: '/projets', // -> accessible at /fr/projets
            en: '/projects', // -> accessible at /en/projects
        }
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
        offerCategories () {
            // We could add the filter query to the url
            return this.$route.query.offer.split(',');
        }
    },
    methods: {
        queryStringForCategory(category, slug) {
            if (! this.$route.query[category]) {
                return slug;
            }
            const currentQuery = this.$route.query[category].split(',');
            if (currentQuery.includes(slug)) {
                return currentQuery.filter(query => query !== slug).join(',');
            }
            return [...currentQuery, slug].join(',');
        },
        categoryFilterIsEnabled(category, slug) {
            if (! this.$route.query[category]) {
                return false;
            }
            const currentQuery = this.$route.query[category].split(',');
            return currentQuery.includes(slug);
        },
    },
}
</script>

<template>
    <div>
        Projekt-Übersicht
        <hr>
        <h2>Angebote</h2>
        <ul>
            <li
                v-for="offer in categoriesInCurrentLocale.offers"
            >
                <nuxt-link
                    :to="localePath({ query: { offer: queryStringForCategory('offer', offer.slug) } })"
                >
                    {{ offer.title }} {{ categoryFilterIsEnabled('offer', offer.slug) ? '(Aktiviert)' : '(Deaktiviert)' }}
                </nuxt-link>
            </li>
        </ul>
        <hr>
        <ul>
            <li
                v-for="project in projectsInCurrentLocale"
                :key="'project'+project.slug"
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
