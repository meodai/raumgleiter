<script>
  export default {
    props: {
      image: {
        type: Object,
        required: true,
      },
    },
    computed: {
      placeholderSrc () {
        return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.image.width} ${this.image.height}"%3E%3C/svg%3E`;
      },
    },
  };
</script>

<template>
  <img
    v-if="image"
    class="lazyload"
    v-bind="$attrs"
    :alt="image.title"
    :src="placeholderSrc"
    :data-src="image.src || false"
    :data-srcset="image.srcset"
    data-sizes="auto"
  >
</template>
