<script>
  import collect from 'collect.js';

  export default {
    props: {
      project: Object,
      required: true,
    },
    computed: {
      filterClasses() {
        return collect(this.project.categories).map((cat, name) => collect(cat).map(id => `${name}-${id}`).join(' ')).join(' ');
      }
    }
  }
</script>

<template>
  <div :class="filterClasses">
    <nuxt-link :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })">
      {{ project.title }}
<!--      project.image -->
    </nuxt-link>
  </div>
</template>
