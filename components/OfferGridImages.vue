<script>
/**
 fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,
    linkText: 'plaintext' || null,

    items: [
      {
        caption: 'plaintext' || null,
        images: [
          {image}, {image}
        ],
        video: {
          mp4: 'https://url-to-video.mp4'
        },
        // either images is []
        // or video is null
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
  <article class="offer-grid l-design-width">
    <div class="offer-grid__intro">
      <h3 class="t-title">
        {{ fields.header }}
      </h3>
      <p>{{ fields.lead }}</p>
      <nuxt-link :to="localePath({ name: 'solutions' })">
        {{ fields.linkText }}
        <Icon
          class="offer-grid__icon"
          :name="'icon_arrow_right'"
        />
      </nuxt-link>
    </div>
    <div class="offer-grid__images">
      <template v-for="(item, i) in fields.items">
        <figure
          :key="'offer-grid-images'+i"
          v-observe-visibility="{
            callback: (isVisible, entry) => {visibilityChanged(isVisible, entry, i)},
            once: true,
          }"
          class="offer-grid__image"
          :class="{'offer-grid__image--visible': (!changes && visibleChildrenIndexes.hasOwnProperty(i) && visibleChildrenIndexes[i])}"
        >
          <ResponsiveImage v-if="item.images.length" :image="item.images[0]" />
          <figcaption class="offer-grid__caption">
            {{ item.caption }}
          </figcaption>
        </figure>
      </template>
    </div>
  </article>
</template>

<style lang="scss">
  .offer-grid {
    overflow: hidden;
    //margin-top: var(--size-design-bezel);
  }
  .offer-grid__intro {
    padding: 0 calc(24% - var(--size-design-bezel));
    margin-bottom: var(--size-design-bezel);
    p, a {
      display: block;
      margin-top: 1em;
    }
    a {
      color: #aaa;
    }
  }
  .offer-grid__images {
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(var(--size-rat) * -1);
  }
  .offer-grid__image {
    display: flex;
    flex: 0 1 calc(50% - var(--size-rat));
    flex-direction: column;
    margin-left: var(--size-rat);
    margin-bottom: var(--size-rat);
    justify-content: center;

    &:nth-child(2) {
      flex-direction: column-reverse;
      align-self: flex-end;
      justify-content: flex-end;
    }
    &:nth-child(3) {
      flex-direction: column-reverse;
      flex: 0 1 70%;
      margin-left: calc(15% + var(--size-rat));

      .offer-grid__caption {
        margin-top: 0;
      }
    }
    &:nth-child(4) {
      align-self: flex-start;
      justify-content: flex-start;
    }
    &:nth-child(5) {
      flex-direction: column-reverse;

      .offer-grid__caption {
        margin-top: 0;
      }
    }
  }

  .offer-grid__caption {
    margin: 1em 0;
    font-weight: bold;
  }

  .offer-grid__icon {
    width: 0.7em;
    height: 0.7em;
    margin-left: .2em;
  }

  // animation

  .offer-grid__image {
    .offer-grid__caption {
      --delay: 0ms;
    }
    img {
      --delay: 50ms;
    }

    .offer-grid__caption, img {
      opacity: 0;
      transform: translate(-15rem, 15rem);
      transition: 400ms opacity linear calc(200ms + var(--delay)), 644ms transform cubic-bezier(0.9,0,0.1,1) var(--delay);
    }

    &:nth-child(2),
    &:nth-child(5) {
      .offer-grid__caption, img {
        transition-delay: calc(200ms + var(--delay) + 400ms), calc(var(--delay) + 400ms);
        transform: translate(15rem, 15rem);
      }
    }
    &:nth-child(3) {
      .offer-grid__caption, img {
        transform: translate(0, 15rem);
      }
    }

    @include bp('phone') {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        .offer-grid__caption, img {
          opacity: 0;
          transform: translate(0, 15rem);
          transition-delay: 0;
        }
      }
    }
  }

  .offer-grid__image--visible {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      .offer-grid__caption, img {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
