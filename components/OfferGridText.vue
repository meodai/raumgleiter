<script>
/**
 fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,

    textBlocks: [
      {
        header: 'plaintext' || null,
        body: 'plaintext' || null,
      },
      { ... }
    ],
 *
 */
  export default {
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },
    computed: {
      firstBlock () {
        return this.fields.textBlocks.length ? this.fields.textBlocks[0] : null;
      },
      remainingTextBlocks () {
        return this.fields.textBlocks.length > 1 ? this.fields.textBlocks.slice(1) : null;
      },
    },
  };
</script>

<template>
  <div class="offer-grid-text">
    <Intro
      :fields="{
        header: fields.header,
        lead: fields.lead,
      }"
      :is-white="true"
    >
      <aside
        v-for="(textBlock, i) in fields.textBlocks"
        :key="'offerGridText'+i"
        class="offer-grid-text__block"
      >
        <h4 class="offer-grid-text__subtitle">
          {{ textBlock.header }}
        </h4>
        <p class="offer-grid-text__subtext">
          {{ textBlock.body }}
        </p>
      </aside>
    </Intro>
  </div>
</template>

<style lang="scss">
  .offer-grid-text {
    --color-layout--background: #f8f8f8;
  }

  .offer-grid-text__block {
    margin-top: var(--size-cat);

    &:nth-child(2),
    &:nth-child(5) {
      margin-left: 55%;
    }

    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 0%;
      margin-right: 55%;
    }

    &:nth-child(4) {
      margin-left: 25%;
      margin-right: 25%;
    }
  }

  .offer-grid-text__subtitle {
    @include typo('title');
  }

  .offer-grid-text__subtext {
    margin-top: 1em;
  }
</style>
