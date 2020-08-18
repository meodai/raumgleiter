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
        // Load all projects when building static site
        const allProjectEntries = collect(await $axios.$get('/projects.json').then(data => data.data))
        .groupBy('lang').all();
        return { allProjectEntries };
    },
    computed: {
        projects () {
            // Get localized project entries
            return this.allProjectEntries[this.$i18n.locale];
        },
    },
}
</script>

<template>
    <div>
        Projekt-Übersicht
        <ul>
            <li
                v-for="project in projects"
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
