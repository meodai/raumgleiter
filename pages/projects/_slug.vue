<script>
import collect from "collect.js";

export default {
    nuxtI18n: {
        paths: {
            de: '/projekte/:slug',
            fr: '/projets/:slug',
            en: '/projects/:slug',
        }
    },
    async asyncData ({ $axios, params }) {
        const projectEntries = collect(await $axios.$get(`/projects/${params.slug}.json`).then(data => data.data))
        .groupBy('lang').all();
        return { projectEntries };
    },
    computed: {
        project () {
            // Get localized project entry
            return collect(this.projectEntries[this.$i18n.locale]).first();
        },
    }
}
</script>

<template>
    <div>
        <nuxt-link :to="localePath('projects')">Zurück zu Projekten</nuxt-link>
        <h1>{{ project.title }}</h1>
    </div>
</template>
