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
  <div class="quote" :class="[ fields.inverted && fields.background ? 'c-design--inverted' : 'c-design', fields.background && 'quote--background']">
    <div v-if="fields.background" class="quote__background">
      <ResponsiveImage class="quote__backgroundImage" :image="fields.background.image" />
    </div>
    <blockquote class="quote__block">
      <p>{{ fields.body }}</p>
      <footer v-if="fields.author" class="quote__footer">
        {{ fields.author }}
      </footer>
    </blockquote>
  </div>
</template>

<style lang="scss">
  .quote {
    perspective: 2px;
    position: relative;
    @include typo('quote');
    padding: var(--size-pony);
    text-align: center;
    overflow: hidden;
  }
  .quote--background {
    display: flex;
    min-height: 90vh;
    align-items: center;
    justify-content: center;
  }
  .quote__block {
    position: relative;
    width: calc(50% + var(--size-pony) * 2);
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

  .quote__background {
    z-index: -1;
    position: absolute;
    top: -20%;
    left: 0;
    right: 0;
    bottom: -20%;
  }

  .quote__backgroundImage {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateZ(-1px) scale(1.5);
  }
</style>
