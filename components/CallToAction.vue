<script>
  export default {
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },
    /**
      fields = {
        icon: 'plaintext' || null,
        header: 'plaintext' || null,
        text: 'plaintext' || null,
        contactName: 'plaintext' || null,
        phone: 'plaintext' || null,
        email: 'plaintext' || null,
        background: {}
        // or:
        background: {
          type: 'video',
          mp4: 'https://url-to-video.mp4',
        }
        // or:
        background: {
          type: 'image',
          image: {
            // image object
            width, height, srcSet, ....
          },
      }
    */
    data () {
      return {
        showFirst: false,
        showSecond: false,
      };
    },
    computed: {
      showFirstRow () {
        return this.fields.icon || this.fields.header;
      },
      showSecondRow () {
        return this.fields.contactName || this.fields.phone || this.fields.email;
      },
    },
    methods: {
      visibilityChanged (isVisible, entry, isFirst) {
        if (isFirst) {
          this.showFirst = isVisible;
        } else {
          this.showSecond = isVisible;
        }
      },
    },
  };
</script>

<template>
  <article
    v-if="showFirstRow || showSecondRow"
    class="calltoaction"
    :aria-label="$t('contactUs')"
    :class="{
      'calltoaction--fullwidth': fields.fullwidth,
      'calltoaction--image': fields.background,
      'c-design': !fields.inverted && fields.background,
      'c-design--inverted': fields.inverted && fields.background,
    }"
  >
    <div v-if="fields.background" class="calltoaction__background">
      <ResponsiveImage class="calltoaction__backgroundImage" :image="fields.background.image" />
    </div>
    <div class="calltoaction__content">
      <aside
        v-if="showFirstRow"
        v-observe-visibility="{
          callback: (isVisible, entry) => {
            visibilityChanged(isVisible, entry, true)
          },
          once: true,
        }"
        :class="{'calltoaction__block--visible': showFirst}"
        class="calltoaction__first calltoaction__block"
      >
        <IconCta
          v-if="fields.icon"
          class="calltoaction__icon"
          :name="fields.icon"
          :is-block="true"
        />
        <div class="calltoaction__text">
          <div class="calltoaction__subblock">
            <h3 v-if="fields.header" class="calltoaction__title">
              {{ fields.header }}
            </h3>
            <div aria-hidden class="calltoaction__dots">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div class="calltoaction__subblock">
            <p class="calltoaction__content">
              {{ fields.text }}
            </p>
            <div aria-hidden class="calltoaction__dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </aside>
      <aside
        v-if="showSecondRow"
        v-observe-visibility="{
          callback: (isVisible, entry) => {
            visibilityChanged(isVisible, entry, false)
          },
          once: true,
        }"
        :class="{'calltoaction__block--visible': showFirst}"
        class="calltoaction__second calltoaction__block"
      >
        <IconCta
          class="calltoaction__icon"
          name="communication"
          :is-block="true"
        />
        <div class="calltoaction__text">
          <div class="calltoaction__subblock">
            <h3 v-if="fields.contactName" class="calltoaction__title">
              {{ fields.contactName }}
            </h3>
            <span aria-hidden class="calltoaction__dots">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div class="calltoaction__subblock">
            <p class="calltoaction__content">
              <a v-if="fields.phone" :href="'tel:'+fields.phone">{{ fields.phone }}</a>
              <a v-if="fields.email" :href="'mailto:'+fields.email">{{ fields.email }}</a>
            </p>
            <div aria-hidden class="calltoaction__dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </aside>
    </div>
  </article>
</template>

<style lang="scss">
  .calltoaction--fullwidth {
    display: flex;
    vertical-align: middle;
    padding-top: 15rem;
    padding-bottom: 15rem;

    position: relative;
    perspective: 2px;
    overflow: hidden;

    .calltoaction__content {
      position: relative;
      margin: 0 auto;
    }
  }

  .calltoaction--image {
    padding-bottom: 30rem;
  }

  .calltoaction__icon {
    margin-bottom: 0.5rem;
  }

  .calltoaction__second {
    margin-top: var(--size-gutter);
    margin-left: 20%;
  }

  .calltoaction__title {
    @include typo('default');
    color: currentColor;
    font-weight: 900;
  }

  .calltoaction__content {
    padding-top: 0.2em;
    > * {
      padding-right: 0.5em;
    }
  }

  .calltoaction__background {
    z-index: -1;
    position: absolute;
    top: -20%;
    left: 0;
    right: 0;
    bottom: -20%;
    overflow: hidden;
  }

  .calltoaction__backgroundImage {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateZ(-1px) scale(1.5);
  }

  .calltoaction__dots {
    position: absolute;
    top: 0;
    left: 0;

    user-select: none;
    margin-top: 0.2em;
    display: inline-flex;
    background: #f2f2f2;
    color: var(--c-design-background);
    border-radius: 2em;
    padding-left: .4em;
    padding-right: .4em;
    height: 1.22em; // line-height of text

    align-items: center;
    justify-content: center;
    line-height: 1;

    span {
      border-radius: 50%;
      background: currentColor;
      width: .7rem;
      height: .7rem;
      opacity: .2;
      animation: dots 800ms linear infinite;
      margin: 0 0.3rem;

      &:nth-child(2) {
        animation-delay: 200ms;
      }
      &:nth-child(3) {
        animation-delay: 400ms;
      }
    }
  }

  .calltoaction__subblock {
    position: relative;
  }

  // animation / transition

  .calltoaction__block {
    --inital-delay: .1s;

    .calltoaction__icon,
    .calltoaction__subblock,
    .calltoaction__title,
    .calltoaction__content,
    .calltoaction__dots  {
      opacity: 0;
      transition: 100ms opacity linear, 344ms transform cubic-bezier(0.3, 0.7, 0, 1.3);
      transform: translateY(-2rem);
      transition-delay: var(--inital-delay);
    }

    .calltoaction__subblock {
      transform: translateX(5rem);

      &:nth-child(1) {
        transition-delay: calc(var(--inital-delay) + .5s);
      }
    }

    .calltoaction__dots {
      opacity: .8;
      transform: translateY(0);
      transition-delay: calc(var(--inital-delay) + 1s);
    }

    .calltoaction__title {
      transition-delay: calc(var(--inital-delay) + 1s);
    }

    .calltoaction__subblock:nth-child(2) {
      transition-delay: calc(var(--inital-delay) + 1.5s);

      .calltoaction__dots {
        transition-delay: calc(var(--inital-delay) + 2s);
      }
    }

    .calltoaction__content {
      transition-delay: calc(var(--inital-delay) + 2s);
    }
  }

  .calltoaction__block:nth-child(2) {
    --inital-delay: 2.15s;
    .calltoaction__title {
      font-weight: 600;
    }
  }

  .calltoaction__block--visible {
    .calltoaction__icon,
    .calltoaction__title,
    .calltoaction__content {
      opacity: 1;
      transform: translateY(0);
    }
    .calltoaction__subblock {
      opacity: 1;
      transform: translateX(0);
    }
    .calltoaction__dots {
      opacity: 0;
      transform: translateY(5rem);
    }
  }
  @keyframes dots {
    0% {
      opacity: 1;
    }
  }
</style>
