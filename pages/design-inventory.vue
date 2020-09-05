<script>
  export default {
    data () {
      return {
        sizes: ['mouse', 'rat', 'cat', 'dog', 'pony', 'horse'],
        sizesTypo: ['typography-title', 'typography-title--page', 'typography-title--hero'],
      };
    },
  };
</script>

<template>
  <div>
    <h1>Design Inventroy</h1>
    <h2>Sizes</h2>
    <div>
      <div class="size" v-for="(size,i) in sizes" :key="i" v-bind:style="{'--size': `var(--size-${size})`}">{{size}}</div>
    </div>
  </div>
</template>

<style lang="scss">
  .size {
    width: var(--size);
    height: var(--size);
    background: palegoldenrod;
  }
</style>
