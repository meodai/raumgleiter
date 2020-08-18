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
        categoriesInCurrentLanguage () {
            return this.allCategories[this.$i18n.locale];
        },
        projectsInCurrentLanguage () {
            // Get localized project entries
            return this.allProjectEntries[this.$i18n.locale];
        },
        offerCategories () {
            // We could add the filter query to the url
            return this.$route.query.offer.split(',');
        }
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
                v-for="offer in categoriesInCurrentLanguage.offers"
            >
                <nuxt-link
                    :to="localePath({ query: { offer: offer.slug } })"
                >
                    {{ offer.title }}
                </nuxt-link>
            </li>
        </ul>
        <hr>
        <ul>
            <li
                v-for="project in projectsInCurrentLanguage"
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
