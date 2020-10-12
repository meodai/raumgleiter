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
  <div class="l-design-width">
    <Intro
      :fields="{
        header: teamPage.header,
        lead: teamPage.lead,
      }"
      :is-white="true"
    />

    <div class="people">
      <article
        v-for="(person, i) in teamPage.people"
        :key="'team-'+i"
        class="person"
      >
        <ResponsiveImage class="person__image" :image="person.image" />
        <div class="person__body">
          <h2 class="person__name">
            {{ person.name }}
          </h2>
          <h3 class="person__role">
            {{ person.role }}
          </h3>
          <a
            v-if="person.email"
            class="person__link"
            :href="'mailto:'+person.email"
          >{{ person.email }}</a>
          <a
            v-if="person.phone"
            class="person__link"
            :href="'tel:'+person.phone"
          >{{ person.phone }}</a>
          <ul class="person__links">
            <li
              v-for="link in person.socialLinks"
              :key="'team-'+i+'-social-'+link.type"
              class="person__linksitem"
            >
              <a :href="link.url" rel="nofollow noopener">
                <Icon
                  class="calltoaction__icon"
                  :name="link.type"
                  :is-block="true"
                />
              </a>
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

  .person__links {
    text-align: center;
    margin-top: var(--size-rat);
  }

  .person__linksitem {
    display: inline-block;
    width: 2.6rem;
    height: 2.6rem;
    margin-right: 1rem;

    a {
      display: block;
      width: 100%;
    }

    .icon {
      width: 100%;
    }
  }
</style>
