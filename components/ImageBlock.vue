<script>
  export default {
    /**
      fields = {

      }
     */
    props: {
      images: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      imagePosition: {
        type: String,
        required: false,
        default: 'left',
      },
    },

    data () {
      return {
      };
    },

    computed: {
      firstImage: function getFirstImage () {
        return this.images[0].src;
      },
      firstAlt: function getFirstAlt () {
        return this.images[0].alt;
      },
    },
  };
</script>

<template>
  <article class="image-block l-design-width" :class="`image-block--${imagePosition}`">
    <div class="image-block__content">
      <h3 class="image-block__title t-title">{{title}}</h3>
      <slot />
    </div>
    <div class="image-block__images">
      <img
        class="image-block__image"
        :src="firstImage"
        :alt="firstAlt"
      />
    </div>
  </article>
</template>

<style lang="scss">
  .image-block {
    --image-block-gutter: 5rem;
    display: flex;
    flex-direction: row-reverse;
    margin-left: calc(-1 * var(--image-block-gutter));
    padding-top: var(--size-pony);
    padding-bottom: calc(var(--size-pony) - var(--image-block-gutter));
    &:nth-child(2n) {
      background: #f2f2f2;
    }
  }
  .image-block__images {
    flex: 0 0 calc(60% - var(--image-block-gutter));
    margin-left: var(--image-block-gutter);
    margin-bottom: var(--image-block-gutter);
  }
  .image-block__content {
    flex: 0 0 calc(40% - var(--image-block-gutter));
    margin-left: var(--image-block-gutter);
    margin-bottom: var(--image-block-gutter);
  }
  .image-block__image {
    width: 100%;
  }
  .image-block__title + * {
    margin-top: 1em;
  }

  .image-block--right {
    flex-direction: row;
  }

  .image-block--top {
    flex-direction: column-reverse;

    .image-block__content {
      padding: 0 10%;
    }
  }

  .image-block--background {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    background-color: var(--color-layout--background-inverted);

    .image-block__content {
      position: absolute;
      color: var(--color-text--inverted);
      top: var(--size-pony);
      left: var(--size-design-bezel);
      width: 35%;
      margin: 0;
      //filter: invert(100%);
    }

    .image-block__images {
      width: 100vw;
      margin: 0 calc(-1 * var(--size-design-bezel));
    }
  }


</style>
