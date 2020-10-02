<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/team', // -> accessible at /team
        fr: '/team', // -> accessible at /fr/team
        en: '/team', // -> accessible at /en/team
      },
    },
    async asyncData ({ $craft }) {
      return {
        teamPageByLocale: collect(await $craft('team')).keyBy('locale').all(),
      };
    },
    computed: {
      teamPage () {
        return this.teamPageByLocale[this.$i18n.locale];
      },
    },
  };
</script>

<template>
  <div class="l-design-width  ">
    <h1>{{ teamPage.header }}</h1>
    <p>{{ teamPage.lead }}</p>
    <!-- teamPage.backgroundImage -->

    <div class="people">
      <article class="person" v-for="person in teamPage.people">
        <ResponsiveImage class="person__image" :image="person.image" />
        <div class="person__body">
          <h2 class="person__name">{{ person.name }}</h2>
          <h3 class="person__role">{{ person.role }}</h3>
          <a class="person__link" v-if="person.email" :href="'mailto:'+person.email">{{ person.email }}</a>
          <a class="person__link" v-if="person.phone" :href="'tel:'+person.phone">{{ person.phone }}</a>
          <ul>
            <li v-for="link in person.socialLinks">
              <a :href="link.url" rel="nofollow noopener">{{ link.type }}</a>
            </li>
          </ul>
        </div>
      </article>
    </div>


    <Pagebuilder slug="team" :blocks="teamPage.cta" />
  </div>
</template>

<style lang="scss">
  .people {
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(-1 * var(--size-mouse));
  }

  .person {
    background: #f8f8f8;
    flex: 0 0 calc(33.33% - var(--size-mouse));
    margin-left: var(--size-mouse);
    margin-top: var(--size-mouse);
  }

  .person__role {
    font-size: 1em;
    margin-bottom: var(--size-mouse);
  }

  .person__body {
    padding: var(--size-mouse);
  }

  .person__link {
    display: block;
  }

  .person__image {
    width: 100%;
  }
</style>
