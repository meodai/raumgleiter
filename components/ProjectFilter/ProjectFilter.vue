<script>
  import FilterButton from './FilterButton';

  export default {
    components: {
      FilterButton,
    },
    props: {
      categories: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        activeTabLabel: 'sector',
      };
    },
    methods: {
      setActive (groupName = null) {
        this.activeTabLabel = groupName;
        if (groupName === null) {
          this.$router.push(this.localePath({ query: false }));
        }
      },
    },
  };
</script>

<template>
  <aside aria-label="Prject Filters" class="filter">
    <div class="l-design-width filter__tabs-wrap">
      <ul class="filter__tabs">
        <li
          v-for="(group, groupName) in categories"
          :key="'tab'+groupName"
        >
          <button
            :aria-selected="groupName === activeTabLabel"
            role="tab"
            :aria-controls="$t(groupName)"
            class="filter__tab"
            @click="setActive(groupName)"
          >
            {{ $t(groupName) }}
          </button>
        </li><li>
          <button
            :aria-selected="!activeTabLabel"
            class="filter__tab"
            @click="setActive()"
          >
            Alle
          </button>
        </li>
      </ul>
    </div>
    <section
      v-for="(group, groupName) in categories"
      :key="'tabpanel'+groupName"
      class="filter__tabpanel"
      role="tabpanel"
      :aria-label="$t(groupName)"
      :class="{'filter__tabpanel--active': groupName === activeTabLabel}"
    >
      <div class="l-design-width--wide filter__tabpanel-inner">
        <ul :id="$t(groupName)" class="filter__filterlist">
          <li
            v-for="category in group"
            :key="'cat'+category.id"
            class="filter__filter"
          >
            <FilterButton :category="category" />
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>

<style lang="scss">
  .filter {
    text-align: center;
  }

  .filter__tabs {
    display: inline-block;
  }
  .filter__tabs > * {
    display: inline-block;
  }

  .filter__tab {
    border: none;
    border-bottom: 3px solid currentColor;
    background: transparent;
    color: #aaaaaa;
    padding: .2em .5em;
    margin-right: 1em;
    outline: none;

    &[aria-selected] {
      color: var(--color-text);
    }
  }

  .filter__tabs-wrap {
    padding-bottom: 0;
  }

  .filter__tabpanel {
    margin-top: .5rem;
    & + & {
      margin-top: 0;
    }
    background: #f2f2f2;
    text-align: left;
    overflow: hidden;
    max-height: 0;
    transition: 600ms max-height cubic-bezier(.7,.3,0,1);

    &--active {
      transition: 600ms max-height cubic-bezier(.7,.3,0,1) 600ms;
      max-height: 100vh;
    }
  }

  .filter__tabpanel-inner {
    padding-top: var(--size-design-bezel);
    padding-bottom: var(--size-design-bezel);
  }

  .filter__filter {
    display: inline-block;
    font-weight: bold;
  }

  .filter__filterlist {
    margin: 0 -1.5rem;
  }

  .filter__link {
    display: block;
    padding: .75rem 1.5rem;
    &[aria-selected] {
      text-decoration: underline;
    }
  }
</style>
