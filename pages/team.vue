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
      videoTeaser () {
        return [{
          // video: this.teamPage.headerVideo.hls, // hls
          video: this.teamPage.headerVideo, // mp4
          title: this.teamPage.headerVideo.header,
          subtitle: this.teamPage.title,
          slug: 'team',
          index: 0,
        }];
      },
    },
    methods: {
      formattedPhone (phone) {
        return phone ? phone.replace(/\s/g,'') : null;
      },
    },
    head () {
      return {
        title: this.teamPage.title || null,
      };
    },
  };
</script>

<template>
  <div>
    <VideoTeaserContainer>
      <VideoTeaser
        v-if="!$config.livePreview || $config.devMode"
        :entries="videoTeaser"
      />
    </VideoTeaserContainer>
    <Intro
      class="intro--team"
      :fields="{
        header: teamPage.header,
        lead: teamPage.lead,
      }"
      :is-white="false"
    />
    <div class="l-design-width content">
      <div class="people">
        <article
          v-for="(person, i) in teamPage.people"
          :key="'team-'+i"
          class="person"
        >
          <ResponsiveImage
            v-if="person.image"
            class="person__image"
            :image="person.image"
          />
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
              :href="'tel:'+formattedPhone(person.phone)"
            >{{ person.phone }}</a>
            <a
              v-if="person.mobile"
              class="person__link"
              :href="'tel:'+formattedPhone(person.mobile)"
            >{{ person.mobile }}</a>
            <ul class="person__links">
              <li
                v-for="(link, j) in person.socialLinks"
                :key="'team-'+i+'-social-'+link.type+'-'+j"
                class="person__linksitem"
              >
                <a
                  :href="link.url"
                  rel="nofollow noopener"
                >
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
    </div>

    <Pagebuilder
      class="content"
      slug="team"
      :blocks="teamPage.cta"
    />
  </div>
</template>

<style lang="scss">
  .intro--team {
    color: var(--color-text--inverted);
  }

  .people {
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(-1 * var(--size-mouse));

    @include bp('phone') {
      display: block;
    }
  }

  .person {
    position: relative;
    background: var(--color-layout--accent);
    width: calc(33.33% - var(--size-mouse));
    flex: 0 0 calc(33.33% - var(--size-mouse));
    margin-left: var(--size-mouse);
    margin-top: var(--size-mouse);

    @include bp('tablet') {
      width: calc(50% - var(--size-mouse));
      flex: 0 0 calc(50% - var(--size-mouse));
    }

    @include bp('phone') {
      width: calc(100% - var(--size-mouse));
      flex: 0 0 calc(100% - var(--size-mouse));
    }
  }

  .person__name {
    @include typo('nobreak');
  }

  .person__role {
    font-size: 1em;
    margin-bottom: var(--size-mouse);
  }

  .person__body {
    padding: var(--size-mouse) var(--size-mouse) calc(var(--size-mouse) * 4);
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

    @include bp('phone') {
      width: 5.4rem;
      height: 5.4rem;
    }

    a {
      display: block;
      width: 100%;
    }

    .icon {
      width: 100%;
    }
  }

  .person__links {
    position: absolute;
    bottom: var(--size-mouse);
    left: 0;
    right: 0;
  }

</style>
