<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/virtuelle-loesungen', // -> accessible at /virtuelle-loesungen
        fr: '/solutions-virtuelles', // -> accessible at /fr/solutions-virtuelles
        en: '/virtual-solutions', // -> accessible at /en/virtual-solutions
      },
    },
    async asyncData ({ $craft }) {
      return {
        solutionsPageByLocale: collect(await $craft('solutions')).keyBy('locale').all(),
      };
    },
    computed: {
      solutionsPage () {
        return this.solutionsPageByLocale[this.$i18n.locale];
      },
    },
  };
</script>

<template>
  <div>
    <intro
      :fields="{
        header: solutionsPage.header,
        lead: solutionsPage.lead,
      }"
      :is-white="true"
    />

    <section
      class="filter__tabpanel filter__tabpanel--active"
      role="tabpanel"
    >
      <div class="l-design-width--wide filter__tabpanel-inner">
        <ul class="filter__filterlist">
          <li
            v-for="anchor in solutionsPage.anchors"
            :key="anchor.label"
            class="filter__filter"
          >
            <nuxt-link class="filter__link" :to="{ hash: '#'+anchor.anchor }">
              {{ anchor.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>

    <Pagebuilder slug="solutions" :blocks="solutionsPage.pagebuilder" />
  </div>
</template>

<style lang="scss">
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

  .filter__filter {
    display: inline-block;
    font-weight: bold;
  }

  .filter__tabpanel-inner {
    padding-top: var(--size-design-bezel);
    padding-bottom: var(--size-design-bezel);

    @include bp('phone') {
      padding-left: var(--size-design-bezel);
      padding-right: var(--size-design-bezel);
    }
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
