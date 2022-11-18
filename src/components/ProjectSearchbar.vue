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
  <div class="search">
    <label for="search">
      <input
        id="search"
        v-model="searchText"
        type="text"
        class="input--search"
        placeholder="Project"
      >
    </label>
    <Icon
      class="search__icon"
      :name="'icon_search'"
    />
  </div>
</template>

<style lang="scss">
.search {
  position: relative;
}
.search > .search__icon {
  position: absolute;
  top: .15em;
  right: .5em;
  stroke: var(--color-text--inverted);
  fill: var(--color-text--inverted);

  @include bp('tablet') {
    top: .4em;
    right: .75em;
  }
}
.search:focus-within > .search__icon {
  stroke: var(--color-text);
  fill: var(--color-text);
}
.input--search {
  font-size: 1.4rem;
  padding: .2em .75em .3em;
  border-radius: 2em;
  appearance: none;
  display: block;
  width: 100%;
  background: rgba(#aaa, .5);
  padding-right: 3.5rem;
  outline: none;
  color: var(--color-text--inverted);

  &:disabled {
    color: rgba(#fff, .5);
  }

  &:focus {
    box-shadow: 0 0 0 2px #fff;
    color: var(--color-text);
  }

  @include bp('tablet') {
    font-size: 2rem;
    padding: .5em .75em .6em;
    //border-radius: 0;
  }
}
.search__icon {
  display: inline-block;
  width: .75em;
  height: 0.8em;
  position: absolute;
  right: 0;
  top: 0;

  @include bp('tablet') {
    width: 1em;
    height: 1.25em;
  }
}
</style>
