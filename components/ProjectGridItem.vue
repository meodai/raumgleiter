<script>
  import collect from 'collect.js';

  export default {
    props: {
      project: {
        type: Object,
        required: true,
      },
    },
    computed: {
      filterClasses () {
        return collect(this.project.categories).map((cat, name) => collect(cat).map(id => `${name}-${id}`).join(' ')).join(' ');
      },
    },
  };
</script>

<template>
  <aside :class="[...filterClasses, project.image && project.image.orientation === 'portrait' ? ' project-grid-item__tall' : null]" class="project-grid-item">
    <nuxt-link
      class="project-grid-item__wrap"
      :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })"
    >
      <ResponsiveImage
        v-if="project.image"
        class="project-grid-item__image"
        :image="project.image"
      />
      <div class="project-grid-item__overlay">
        <h2 class="project-grid-item__title">
          {{ project.title }}
        </h2>
      </div>
    </nuxt-link>
  </aside>
</template>

<style lang="scss">
  .project-grid-item {
    grid-row: span 1;
    position: relative;
    background: rgba(#000, 0.7);
  }

  .project-grid-item__tall {
    grid-row: span 2;
  }

  .project-grid-item__wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .project-grid-item__image {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: 50% 50%;
    top: 0;
    left: 0;
  }

  .project-grid-item__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(#000, 0.7);
    opacity: 0;
    transition: 200ms opacity cubic-bezier(0, 0, 0.3, 0.1);

    .project-grid-item__wrap:hover & {
      opacity: 1;
    }
  }

  .project-grid-item__title {
    position: absolute;

    word-break: keep-all;
    hyphens: manual;

    top: 50%;
    left: 50%;
    color: var(--color-text--inverted);
    transform: translate(-50%,2em);
    text-align: center;

    transition: 500ms transform cubic-bezier(0.3, 0.7, 0, 1);
    .project-grid-item__wrap:hover & {
      transform: translate(-50%,-50%);
    }
  }
</style>
