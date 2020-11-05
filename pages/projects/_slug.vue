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
    async asyncData ({ $craft, params, store, error }) {
      const projectEntriesByLocale = collect(await $craft('projects'));
      const projectIndex = projectEntriesByLocale.search(entry => entry.slug === params.slug);

      if (projectIndex === false) {
        return error({ statusCode: 404 });
      }

      const project = projectEntriesByLocale.get(projectIndex);
      const projectEntryByLocale = collect(await $craft(`projects/${project.id}`)).keyBy('locale');

      if (projectEntryByLocale.count() < 1) {
        return error({ statusCode: 404 });
      }

      await store.dispatch('i18n/setRouteParams', projectEntryByLocale.first().locale_slugs);

      return { projectEntryByLocale: projectEntryByLocale.all() };
    },
    data () {
      return {
        locale: this.$i18n.locale,
      };
    },
    computed: {
      projectEntry () {
        return this.projectEntryByLocale[this.locale];
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
        title: this.projectEntry.title || null,
        // meta: [
        //   { hid: 'description', name: 'description', content: this.description },
        //   { hid: 'og:description', name: 'og:description', content: this.description },
        // ],
      };
    },
  };
</script>

<template>
  <article>
    <div class="project l-design-width">
      <div class="project__head">
        <h1 class="project__title t-title t-title--page">
          {{ projectEntry.title }}
        </h1>
        <p class="project__lead" :aria-label="$t('mission')">
          <strong>{{ $t('mission') }}.</strong> {{ projectEntry.projectData[0] }}
        </p>
      </div>

      <ResponsiveImage
        v-if="projectEntry.image"
        class="project__cover"
        :image="projectEntry.image"
      />

      <div class="project__body" :class="{'project__body--landscape': firstPicture && firstPicture.orientation === 'landscape'}">
        <div class="project__bodydata">
          <aside :aria-label="$t('client')">
            <p><strong>{{ $t('client') }}.</strong> {{ projectEntry.projectData[1] }}</p>
          </aside>
          <aside :aria-label="$t('services')">
            <p><strong>{{ $t('services') }}.</strong> {{ projectEntry.projectData[2] }}</p>
          </aside>
          <aside :aria-label="$t('benefit')">
            <p><strong>{{ $t('benefit') }}.</strong> {{ projectEntry.projectData[3] }}</p>
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

      <figure
        v-for="(media, key) in pictures"
        :key="projectEntry.slug+'-project-media-'+key"
      >
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

      <Pagebuilder :blocks="projectEntry.cta" />
    </div>

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

  .project__title {
    flex-grow: 1;
    padding-right: var(--size-gutter);

    @include bp('phone') {
      padding-right: 0;
    }
  }

  .project__lead {
    @include typo('lead');
    flex: 0 1 auto;
    max-width: 50%;

    @include bp('phone') {
      margin-top: var(--size-gutter);
    }
  }

  .project__lead,
  .project__body {
    strong {
      color: var(--color-text--accent);
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
