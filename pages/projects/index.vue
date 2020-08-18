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
        const allProjectEntries = collect(await $axios.$get('/projects.json').then(data => data.data))
        .groupBy('lang').all();
        return { allProjectEntries };
    },
    computed: {
        projects () {
            return this.allProjectEntries[this.$i18n.locale];
        },
    }
}
</script>

<template>
    <div>
        Projekt-Übersicht
        <pre>{{ projects }}</pre>
    </div>
</template>
