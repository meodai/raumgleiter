<script>
  export default {
    props: {
      image: {
        type: Object,
        required: true,
      },
    },
    computed: {
      placeholderSrc() {
        return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.image.width} ${this.image.height}"%3E%3C/svg%3E`;
      },
    },
  };
</script>

<template>
  <!--    <img-->
  <!--        class=""-->
  <!--        v-bind="$attrs"-->
  <!--        data-sizes="auto"-->
  <!--        :src="placeholderSrc"-->
  <!--        :data-src="image.src || false"-->
  <!--        :data-srcset="image.srcset"-->
  <!--        :width="image.width"-->
  <!--        :height="image.height"-->
  <!--    >-->
  <picture>
    <source
      :data-srcset="image.webpSrcset"
      type="image/webp"
    >
    <source
      :data-srcset="image.srcset"
      :type="image.mimeType"
    >
    <img
      :src="placeholderSrc"
      :data-src="image.src"
      data-sizes="auto"
      class=""
      :alt="image.title"
    >
  </picture>
</template>
