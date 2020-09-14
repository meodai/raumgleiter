<script>
  export default {
    props: {
      ctatitle1: {
        type: String,
        required: false,
        default: '',
      },
      icon1: {
        type: String,
        required: false,
        default: '',
      },
      ctatitle2: {
        type: String,
        required: false,
        default: '',
      },
      icon2:{
        type: String,
        required: false,
        default: '',
      },
    },
    data () {
      return {
      };
    },
  };
</script>

<template>
  <article class="calltoaction" aria-label="Contact Us">
    <aside class="calltoaction__first">
      <Icon
        class="calltoaction__icon"
        :name="icon1"
        :is-block="true"
      />
      <h3 v-if="ctatitle1" class="calltoaction__title">{{ctatitle1}}</h3>
      <p class="calltoaction__content">
        <slot name="first" />
      </p>
    </aside>
    <aside class="calltoaction__second">
      <Icon
        class="calltoaction__icon"
        :name="icon2"
        :is-block="true"
      />
      <h3 v-if="ctatitle2" class="calltoaction__title">{{ctatitle2}}</h3>
      <p class="calltoaction__content">
        <slot name="second" />
      </p>
    </aside>
  </article>
</template>

<style lang="scss">
  .calltoaction__icon {
    margin-bottom: 0.5rem;
  }

  .calltoaction__second {
    margin-top: var(--size-gutter);
    margin-left: 20%;
  }

  .calltoaction__content {
    margin-top: 0.1em;
  }
</style>
