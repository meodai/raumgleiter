<script>
  export default {
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
  <article class="image-block">
    <div class="image-block__content">
      <h3 class="image-block__title">{{title}}</h3>
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
    display: flex;
    flex-direction: row-reverse;
  }
  .image-block__images {
    flex: 0 0 60%;
    margin-right: 5rem;
  }
  .image-block__content {
    flex: 0 0 40%;
  }
  .image-block__image {
    width: 100%;
  }
</style>
