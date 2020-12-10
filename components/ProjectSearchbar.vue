<script>
  import { debounce } from 'throttle-debounce';

  export default {
    computed: {
      projectSearchQuery () {
        return this.$store.state.projectSearchQuery;
      },
      searchText: {
        get () {
          return this.projectSearchQuery;
        },
        set (value) {
          this.$store.commit('setProjectSearchQuery', value);
        },
      },
    },
    watch: {
      projectSearchQuery: debounce(100, function () {
        const queries = JSON.parse(JSON.stringify(this.$route.query));
        if (this.searchText === queries.search) {
          return;
        }
        if (this.searchText) {
          queries.search = this.searchText;
        } else {
          delete queries.search;
        }
        this.$router.replace({
          path: this.localePath({}),
          query: queries,
        });
      }),
    },
    mounted () {
      if (this.$route.query.search) {
        this.$store.commit('setProjectSearchQuery', this.$route.query.search);
      }
    },
  };
</script>

<template>
  <div class="l-design-width">
    <label for="search">
      <input
        id="search"
        v-model="searchText"
        type="text"
        style="color: black; border: 2px solid black"
      >
    </label>
  </div>
</template>
