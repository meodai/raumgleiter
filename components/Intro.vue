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
      list: {
        default: () => [],
        type: Array,
        required: false,
      },
      listTitle: {
        default: () => '',
        type: String,
        required: false,
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
    <aside v-if="list" class="intro__list-wrap" >
      <h3 class="intro__list-title t-title">{{listTitle}}</h3>
      <ul class="intro__list">
        <li lass="intro__list-item" v-for="listItem in list" :key="listItem">{{listItem}}</li>
      </ul>
    </aside>
    <slot />
  </section>
</template>

<style lang="scss">
  .intro {
    overflow: hidden;
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

  .intro__list-wrap {
    margin-top: var(--size-stack);
    float: right;
  }

  .intro__list {
    font-weight: bold;
    list-style: disc;
    list-style-type: disc;
  }

  .intro__list-item {
    padding-left: 1em;
    margin-top: 1ex;
  }

</style>
