<script>
  export default {
    data () {
      return {
        sizes: ['mouse', 'rat', 'cat', 'dog', 'pony', 'horse'],
        sizesTypo: ['typography-title', 'typography-title--page', 'typography-title--hero'],
        types: ['default', 'title', 'title--page', 'title--hero', 'lead'],
      };
    },
  };
</script>

<template>
  <div>
    <div class="l-design-width">
      <h1>Design Inventroy</h1>
      <h2>Sizes</h2>
      <div class="sizes">
        <div class="size" v-for="(size, i) in sizes" :key="i" v-bind:style="{'--size': `var(--size-${size})`}">{{size}}</div>
      </div>

      <h2>Typography</h2>
      <div class="typo">
        <span v-for="(typo, i) in types" :key="i" v-bind:class="`t-${typo}`">t-{{typo}}</span>
      </div>

      <h2>Grid</h2>
      <div class="l-grid">
        <div class="debug l-grid__cell l-grid__cell--1/2">
          <h3>Width 1/2</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/2">
          <h3>Width 1/2</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/3 l-grid__cell--push--2/3">
          <h3>Width 1/3</h3>
          <h3>Pushed 2/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--push--1/2">
          <h3>Width 1/2</h3>
          <h3>Pushed 1/2</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--2/3 l-grid__cell--push--1/3">
          <h3>Width 2/3</h3>
          <h3>Pushed 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--push--1/4 l-grid__cell--pull--1/4">
          <h3>Width 2/3</h3>
          <h3>Pushed 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--pull--1/2">
          <h3>Width 1/2</h3>
          <h3>Pulled 1/2</h3>
        </div>
      </div>
    </div>
    <div class="l-design-width c-design c-design--inverted">
      <h1>Some Inverted Text</h1>
      <p>Lorem Ipsum doror sit amet</p>
    </div>
  </div>
</template>

<style lang="scss">
  .sizes {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
  }
  .size {
    width: var(--size);
    height: var(--size);
    background: palegoldenrod;
  }
  .typo {
    span {
      display: block;
    }
  }
  .debug {
    padding: 1rem;
    background: palegoldenrod;
  }
</style>
