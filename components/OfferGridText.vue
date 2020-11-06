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
    data () {
      return {
        visibleChildrenIndexes: {},
        changes: false,
      };
    },
    computed: {
      firstBlock () {
        return this.fields.textBlocks.length ? this.fields.textBlocks[0] : null;
      },
      remainingTextBlocks () {
        return this.fields.textBlocks.length > 1 ? this.fields.textBlocks.slice(1) : null;
      },
    },
    beforeDestroy () {
      this.visibleChildrenIndexes = {};
    },
    methods: {
      visibilityChanged (isVisible, entry, i) {
        this.visibleChildrenIndexes[i] = isVisible;
        this.changes = true;
        this.$nextTick(() => {
          this.changes = false;
        });
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
        v-observe-visibility="{
          callback: (isVisible, entry) => {visibilityChanged(isVisible, entry, i)},
          once: true,
        }"
        class="offer-grid-text__block"
        :class="{'offer-grid-text__block--visible': (!changes && visibleChildrenIndexes.hasOwnProperty(i) && visibleChildrenIndexes[i])}"
      >
        <h3 class="offer-grid-text__subtitle">
          {{ textBlock.header }}
        </h3>
        <p class="offer-grid-text__subtext">
          {{ textBlock.body }}
        </p>
      </aside>
    </Intro>
  </div>
</template>

<style lang="scss">
  .offer-grid-text {
    --color-layout--background: var(--color-layout--accent);
  }

  .offer-grid-text__block {
    margin-top: var(--size-stack);

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

    @include bp('phone') {
      margin-left: 0;
      margin-right: 0;
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

  .offer-grid-text__subtitle,
  .offer-grid-text__subtext {
    opacity: 0;
    transform: translateY(15rem);
    transition: 500ms opacity linear 100ms, 644ms transform cubic-bezier(0.7,0.3,0,1.3);
  }

  .offer-grid-text__subtitle {
    @include typo('title');
    transition-delay: .6s, .5s;
  }

  .offer-grid-text__subtext {
    margin-top: 1em;
    transition-delay: .65s, .55s;
  }

  .offer-grid-text__block--visible {
    .offer-grid-text__subtitle,
    .offer-grid-text__subtext {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
