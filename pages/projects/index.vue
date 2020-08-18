<script>
import collect from 'collect.js';

export default {
    async asyncData ({ $axios, params, payload }) {
        const projects = collect(await $axios.$get('/projects.json').then(data => data.data))
        .groupBy('lang').all();
        return { projects };
    },
}
</script>

<template>
    <div>
        Projekt-Übersicht
        <pre>{{ projects }}</pre>
    </div>
</template>
