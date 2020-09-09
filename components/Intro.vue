<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      leadText: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
      };
    },
  };
</script>

<template>
  <section class="intro l-design-width l-design-width--wide c-design c-design--inverted">
    <div class="intro__lead">
      <h2 class="intro__title t-title t-title--page">{{title}}</h2>
      <p class="intro__leadtext t-lead">{{leadText}}</p>
      <p class="intro__paragraph">{{text}}</p>
    </div>
  </section>
</template>

<style lang="scss">
  .intro {

  }

  .intro__lead {
    width: 60%;

    @include bp(tablet) {
      width: auto;
    }
  }

  .intro__leadtext,
  .intro__paragraph {
    margin-top: var(--size-stack);
  }

</style>
