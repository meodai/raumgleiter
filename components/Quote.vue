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
  <div>
    <h2>{{ fields.body }}</h2>
    <p>{{ fields.author }}</p>
  </div>
</template>
