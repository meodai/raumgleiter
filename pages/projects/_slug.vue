<script>
  import collect from 'collect.js';

  export default {
    nuxtI18n: {
      paths: {
        de: '/projekte/:slug', // -> accessible at /projekte/:slug
        fr: '/projets/:slug', // -> accessible at /fr/projets/:slug
        en: '/projects/:slug', // -> accessible at /en/projects/:slug
      },
    },

    async asyncData ({ $craft, params, store }) {
      const projectEntryByLocale = collect(await $craft(`projects/${params.slug}`)).keyBy('locale');

      if (projectEntryByLocale.count()) {
        await store.dispatch('i18n/setRouteParams', projectEntryByLocale.first().locale_slugs);
      }

      return { projectEntryByLocale: projectEntryByLocale.all() };
    },
    computed: {
      projectEntry () {
        return this.projectEntryByLocale[this.$i18n.locale];
      },
      firstPicture () {
        return this.projectEntry.firstImage;
      },
      pictures () {
        return this.projectEntry.media;
      },
    },

    head () {
      return {
        title: this.projectEntry.title,
        // meta: [
        //   { hid: 'description', name: 'description', content: this.description },
        //   { hid: 'og:description', name: 'og:description', content: this.description },
        // ],
      };
    },
  };
</script>

<template>
  <article class="project l-design-width">
    <div class="project__head">
      <h1 class="project__title t-title t-title--page">
        {{ projectEntry.title }}
      </h1>
      <p class="project__lead" :aria-label="$t('Aufgabe')">
        <strong>{{ $t('Aufgabe') }}.</strong> {{ projectEntry.projectData[0] }}
      </p>
    </div>

    <ResponsiveImage class="project__cover" :image="projectEntry.image" />

    <div class="project__body" :class="{'project__body--landscape': firstPicture && firstPicture.orientation === 'landscape'}">
      <div class="project__bodydata">
        <aside :aria-label="$t('Kunde')">
          <p><strong>{{ $t('Kunde') }}.</strong> {{ projectEntry.projectData[1] }}</p>
        </aside>
        <aside :aria-label="$t('Leistungen')">
          <p><strong>{{ $t('Leistungen') }}.</strong> {{ projectEntry.projectData[2] }}</p>
        </aside>
        <aside :aria-label="$t('Benefit')">
          <p><strong>{{ $t('Benefit') }}.</strong> {{ projectEntry.projectData[3] }}</p>
        </aside>
      </div>
      <div class="project__bodyimagewrap">
        <ResponsiveImage
          v-if="firstPicture"
          class="project__bodyimage"
          :image="firstPicture"
        />
      </div>
    </div>

    <template v-for="media in pictures">
      <figure>
        <ResponsiveImage
          v-if="media.images && media.images.length > 0"
          :image="media.images[0]"
          class="project__picture"
          :class="{'project__picture--portrait': media.images[0].orientation === 'portrait'}"
        />
        <VimeoEmbed
          v-else-if="media.video && media.video.vimeoId !== null"
          class="project__video"
          :video="media.video"
        />
        <IframeEmbed
          v-else-if="media.iframe && media.iframe.url !== null"
          class="project__iframe"
          :iframe="media.iframe"
        />
      </figure>
    </template>

    <Pagebuilder :blocks="projectEntry.cta" />

    <Related
      :fields="{
        title: $t('moreWorlds'),
        entries: projectEntry.relatedEntries,
      }"
    />
  </article>
</template>

<style lang="scss">
  .project {
    @include bp('phone') {
      margin-top: 5.5rem;
    }
  }

  .project__head {
    display: flex;
    justify-content: space-between;

    @include bp('phone') {
      display: block;
    }
  }

  .project__lead {
    @include typo('lead');
    flex: 0 1 50%;

    @include bp('phone') {
      margin-top: var(--size-gutter);
    }
  }

  .project__lead,
  .project__body {
    strong {
      color: #aaaaaa;
      font-weight: 700;
    }
  }

  .project__body {
    display: flex;
    margin-top: var(--size-dog);
    p {
      margin-bottom: .8em;
    }
    @include bp('phone') {
      display: block;
    }
  }

  .project__bodydata {
    flex: 0 1 50%;
    width: 50%;

    @include bp('phone') {
      width: auto;
    }
  }
  .project__bodyimagewrap {
    margin-left: var(--size-dog);
    flex: 0 1 50%;
    width: 50%;

    @include bp('phone') {
      width: auto;
      margin-left: 0;
    }
  }

  .project__body--landscape {
    display: block;
    .project__bodyimagewrap {
      margin-top: var(--size-dog);
      margin-left: 0;
      width: 100%;
    }
  }

  .project__bodyimage {
    width: 100%;
  }
  .project__picture,
  .project__video,
  .project__iframe {
    margin-top: var(--size-dog);
    width: 100%;

    &--portrait {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .project__cover {
    margin-top: var(--size-dog);
    width: 100%;
  }
</style>
