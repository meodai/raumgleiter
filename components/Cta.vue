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
  <article class="cta" aria-label="Contact Us">
    <aside class="cta__first">
      <Icon
        class="cta__icon"
        :name="icon1"
        :is-block="true"
      />
      <h3 v-if="ctatitle1" class="cta__title">{{ctatitle1}}</h3>
      <div class="cta__content">
        <slot />
      </div>
    </aside>
    <aside class="cta__second">
      <Icon
        class="cta__icon"
        :name="icon1"
        :is-block="true"
      />
      <h3 v-if="ctatitle1" class="cta__title">{{ctatitle2}}</h3>
      <div class="cta__content">
        <slot name="second" />
      </div>
    </aside>
  </article>
</template>

<style lang="scss">
  .cta {
    clear: both;
    @include bp(tablet) {

    }

  }


</style>
