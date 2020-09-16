<script>
/**
 fields = {
    body: 'plaintext' || null,
    author: 'plaintext' || null,
    background: {}
    // or:
    background: {
      type: 'video',
      mp4: 'https://url-to-video.mp4',
    }
    // or:
    background: {
      type: 'image',
      image: {
        // image object
        width, height, srcSet, ....
      },
    }
 *
 */
  export default {
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<template>
  <div class="quote">
    <blockquote>
      <p>{{ fields.body }}</p>
      <footer>{{ fields.author }}</footer>
    </blockquote>
  </div>
</template>

<style lang="scss">
  .quote {
    padding: var(--size-pony);
  }
</style>
