<script>
  export default {
    props: {
      isWhite: {
        type: Boolean,
        default: false,
      },
      /*
      fields = {
        header: 'plaintext' || null,
        lead: 'plaintext' || null,
        body: 'plaintext' || null,
        offers: []
        // or:
        offers: [
          {
            header: 'plaintext' || null,
            services: ['plaintext', 'plaintext', ...],
          },
        ]

      };
     */
      fields: {
        type: Object,
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
  <section
    class="intro l-design-width l-design-width--wide c-design"
    :class="{'c-design--inverted': !isWhite}"
  >
    <div class="intro__lead">
      <h2 class="intro__title t-title t-title--page">
        {{ fields.header }}
      </h2>
      <p v-if="fields.lead" class="intro__leadtext t-lead">
        {{ fields.lead }}
      </p>
      <p v-if="fields.body" class="intro__paragraph">
        {{ fields.body }}
      </p>
    </div>
    <aside
      v-for="(offers, index) in fields.offers"
      v-if="fields.offers.length"
      :key="'offers'+index"
      class="intro__list-wrap"
    >
      <h3 class="intro__list-title t-title">
        {{ offers.header }}
      </h3>
      <ul class="intro__list">
        <li
          v-for="listItem in offers.services"
          :key="listItem"
          class="intro__list-item"
        >
          {{ listItem }}
        </li>
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
  }

  .intro__list-item {
    margin-left: 1em;
    margin-top: 1ex;
    list-style: disc;
  }

  .intro__cta {
    clear: both;
    padding: 15%;
    padding-bottom: 0;
  }
</style>
