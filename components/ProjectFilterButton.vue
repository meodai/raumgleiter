<script>
  export default {
    props: {
      category: {
        type: Object,
        required: true,
      },
    },
    computed: {
      id () {
        return String(this.category.id);
      },
      queryString () {
        return this.$route.query[this.category.group] ? this.$route.query[this.category.group].split(',') : [];
      },
      isEnabled () {
        return this.queryString.includes(this.id);
      },
      // queryStringToToggleCategory () {
      // if (this.isEnabled) {
      //   return this.queryString.filter(query => query !== this.id).join(',');
      // }
      // return [...this.queryString, this.id].join(',');
      // },
      queryPathObject () {
        // if filter is inclusive
        const queries = JSON.parse(JSON.stringify(this.$route.query));
        // query[this.category.group] = this.queryStringToToggleCategory;
        // Object.keys(query).forEach(key => (query[key] === '') && delete query[key]);
        // return query;
        // if filter is exclusive
        if (this.isEnabled) {
          return queries.search ? { search: queries.search } : '';
        } else {
          const query = {};
          query[this.category.group] = this.id;
          if (queries.search) {
            query.search = queries.search;
          }
          return query;
        }
      },
    },
  };
</script>

<template>
  <nuxt-link
    :to="localePath({ query: queryPathObject })"
    class="filter__link"
    :aria-selected="isEnabled"
  >
    {{ category.title }}
  </nuxt-link>
</template>
