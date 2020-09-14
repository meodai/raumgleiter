<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      isBlock: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
      };
    },
  };
</script>

<template>
  <svg class="icon" :class="{'icon--block': isBlock}">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<style lang="scss">
  .icon {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    fill: currentColor;
  }

  .icon--block {
    display: block;
  }
</style>
