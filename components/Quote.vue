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
    <blockquote class="quote__block">
      <p>{{ fields.body }}</p>
      <footer v-if="fields.author" class="quote__footer">{{ fields.author }}</footer>
    </blockquote>
  </div>
</template>

<style lang="scss">
  .quote {
    @include typo('quote');
    padding: var(--size-pony);
    text-align: center;
  }
  .quote__block {
    width: 50%;
    margin: 0 auto;

    p {
      quotes: "«" "»";

      &::before {
        content: open-quote;
        margin-right: .2em;
      }
      &::after {
        content: close-quote;
        margin-left: .2em;
      }
    }
  }
  .quote__footer {
    @include typo('default');
    margin-top: var(--size-gutter);
  }
</style>
