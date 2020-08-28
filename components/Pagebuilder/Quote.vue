<script>
/**
 * "Intro"-Block: Grosser Text mit Hintergrund (optional)
 *
 * erster Block auf der About-Seite
 *
 *
 fields = {
    body: 'plaintext' || null,
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
    {{ fields.body }}
  </div>
</template>
