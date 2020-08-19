<script>
    export default {
        props: {
            category: {
                type: Object,
                required: true,
            }
        },
        computed: {
            queryString () {
                return this.$route.query[this.category.group] ? this.$route.query[this.category.group].split(',') : [];
            },
            isEnabled () {
                return this.queryString.includes(this.category.slug);
            },
            queryStringToToggleCategory() {
                if (this.queryString.includes(this.category.slug)) {
                    return this.queryString.filter(query => query !== this.category.slug).join(',');
                }
                return [...this.queryString, this.category.slug].join(',');
            },
            queryPathObject() {
                let query = JSON.parse(JSON.stringify(this.$route.query));
                query[this.category.group] = this.queryStringToToggleCategory;
                Object.keys(query).forEach((key) => (query[key] === '') && delete query[key]);
                return query;
            }
        },
    };
</script>

<template>
    <nuxt-link
        :to="localePath({ query: queryPathObject })"
    >
        {{ category.title }} {{ isEnabled ? '(Aktiviert)' : '(Deaktiviert)' }}
    </nuxt-link>
</template>
