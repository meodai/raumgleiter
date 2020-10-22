<script>
  import collect from 'collect.js';

  export default {
    async fetch () {
      this.footerByLocale = collect(await this.$craft('footer')).keyBy('locale').all();
    },
    data () {
      return {
        footerByLocale: null,
        isSuscribed: false,
        isSuscribing: false,
        isInvalid: false,
      };
    },
    computed: {
      footer () {
        return this.footerByLocale && this.footerByLocale[this.$i18n.locale] ? this.footerByLocale[this.$i18n.locale] : null;
      },
      mainSections () {
        return this.$store.getters.getMainSections;
      },
      asideSections () {
        return this.$store.state.asideSections;
      },
    },
    beforeDestroy () {
      clearTimeout(this.timer);
    },
    methods: {
      suscribe () {
        if (!this.$refs.input.validity.valid) {
          this.isInvalid = true;
          this.timer = setTimeout(() => {
            this.isInvalid = false;
          }, 2000);
          console.log('invalid')
        } else {
          this.isSuscribing = true;
          this.timer = setTimeout(() => {
            this.isSuscribed = true;
            this.isSuscribing = false;
          }, 1500);
        }
      },
    },
  };
</script>

<template>
  <div v-if="footer" class="footer">
    <div class="footer__inner">
      <a class="footer__logo-link footer__col" href="/">
        <Logo class="footer__logo" />
      </a>
      <div class="footer__col footer__col--address">
        <address
          :aria-label="$t('address')"
          class="footer__address"
          v-html="footer.address"
        />
        <ul class="footer__social">
          <li
            v-for="(link, index) in footer.socialLinks"
            :key="'footer-social-'+index"
          >
            <a :href="link.url" rel="noopener nofollow">
              <Icon
                class="footer__socialIcon"
                :name="link.type"
                :is-block="true"
              />
            </a>
          </li>
        </ul>
      </div>

      <article class="footer__newsletter footer__col">
        <h4>{{ footer.newsletterLabel }}</h4>
        <form
          class="footer__form"
          action="#"
          method="post"
          :class="{
            'footer__form--suscribed': isSuscribed,
            'footer__form--suscribing': isSuscribing,
            'footer__form--invalid': isInvalid,
          }"
        >
          <input
            ref="input"
            :disabled="isSuscribed || isSuscribing"
            type="email"
            :placeholder="$t('email')"
            required="required"
          >
          <button class="footer__button" @click.prevent="suscribe">
            <span>{{ $t('subscribe') }}</span>
          </button>
        </form>
      </article>
      <ul class="footer__nav footer__col">
        <li
          v-for="(section, key) in mainSections"
          :key="'footer-main-links-'+key"
        >
          <nuxt-link :to="localePath(section.path)" @click.native="$scrollToTop">
            {{ section.title }}
          </nuxt-link>
        </li>
      </ul>
      <ul class="footer__nav footer__nav--second footer__col">
        <li
          v-for="(section, index) in asideSections"
          :key="'footer-aside-links-'+index"
          :class="{ 'footer__navgap': index === 0 }"
        >
          <nuxt-link :to="localePath(section.path)" @click.native="$scrollToTop">
            {{ $t(section.title) }}
          </nuxt-link>
        </li>
      </ul>
      <ul :aria-label="$t('language')" class="footer__lang footer__col">
        <li
          v-for="locale in $i18n.locales"
          :key="locale.code"
        >
          <nuxt-link
            :aria-selected="locale.code === $i18n.locale"
            :aria-label="locale.name"
            :to="switchLocalePath(locale.code)"
            @click.native="$scrollToTop"
          >
            {{ locale.code.toUpperCase().charAt(0) }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <nuxt-link class="footer__logo-bottomlink" to="/">
      <Icon
        :name="'raumgleiter_symbol'"
        :is-block="true"
        class="footer__logoicon"
      />
    </nuxt-link>
  </div>
</template>

<style lang="scss">
  .footer {
    position: relative;
    z-index: 1;
    --size-footer-stack: 0.4em;
    font-size: 1.6rem;

    background-color: var(--color-layout--background-inverted);
    color: var(--color-text--inverted);
    overflow: hidden;

    path {
      fill: var(--color-text--inverted);
    }
    @include bp('phone') {
      font-size: 2.2rem;
      text-align: center;
    }
  }

  .footer__inner {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: var(--size-rat);

    @include bp('phone') {
      flex-direction: column;
      padding: var(--size-design-bezel);
    }
  }

  .footer__col {
    padding-right: 5%;
    flex: 1 1 20%;

    &:last-child {
      flex: 1 0 1px;
      padding-right: 0;
    }
  }

  .footer__logo {
    min-width: 10rem;
    max-width: 13rem;
    order: 1;
  }

  .footer__newsletter {
    @include bp('phone') {
      margin-top: var(--size-design-bezel);
      order: 2;
    }
  }

  .footer__col--address {
    text-align: left;
    @include bp('phone') {
      order: 3;
      margin-top: var(--size-design-bezel);
    }
  }

  .footer__logo-link {
    flex: 1 0 1px;
  }

  .footer__address {
    font-style: normal;
    margin-bottom: var(--size-mouse);

    p + p {
      margin-top: var(--size-footer-stack);
    }

    @include bp('phone') {
      margin-top: var(--size-rat);
    }
  }

  .footer__address > * {
    display: block;
  }
  .footer__nav {
    @include bp('tablet') {
      display: none;
    }
  }
  .footer__address a,
  .footer__nav a {
    display: block;
    padding-top: var(--size-footer-stack);
  }

  .footer__address li:first-child a,
  .footer__nav li:first-child a {
    padding-top: 0;
  }

  .footer__form {
    position: relative;
    margin-top: calc(2 * var(--size-footer-stack));
    margin-right: -0.75rem;
    margin-left: -0.75rem;

    input, button {
      font-size: 1.4rem;
      padding: .2em .75em .3em;
      border-radius: 2em;
      appearance: none;

      @include bp('phone') {
        font-size: 2rem;
        padding: .5em .75em .6em;
        border-radius: 2em;
      }
    }

    button {
      line-height: 1;
      min-width: calc(9ch + 1.5rem);
      transition: 400ms min-width cubic-bezier(0.7, 0.3, 0 ,1);
    }

    input {
      display: block;
      width: 100%;
      background: rgba(#7f7f7f, .5);
      padding-right: 8.5rem;
      outline: none;

      &:disabled {
        color: rgba(#fff, .5);
      }

      &:focus {
        box-shadow: 0 0 0 2px #fff;
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(#7f7f7f, .75);
    }

    &--suscribing,
    &--suscribed {
      button {
        min-width: calc(1ch + 1.5rem);

        span {
          display: none;
        }

        &::after {
          position: absolute;
          content: "◌";
          font-size: 3.3rem;
          line-height: 0.5;
          padding-bottom: .39ex;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: 2s spin infinite linear;
        }
      }
    }

    &--suscribed button::after {
      content: "✓";
      font-size: 1.5rem;
      padding-bottom: 0;
      animation: none;
    }

    &--invalid {
      input {
        color: red;
      }
      animation: 500ms twerk cubic-bezier(.3,.7,0,1.5) both;
    }
  }

  @keyframes twerk {
    10%, 90% {
      transform: translate3d(2px,0, 0) rotate(-.2deg);
      transform-origin: 100% 50%;
    }

    20%, 80% {
      transform: translate3d(2px,0, 0) rotate(.2deg);
      transform-origin: -50% 50%;
    }

    30%, 50%, 70% {
      transform: translate3d(-2px,0, 0) rotate(-.2deg);
      transform-origin: 100% 50%;
    }

    40%, 60% {
      transform: translate3d(3px, 0, 0) rotate(.2deg);
      transform-origin: -50% 50%;
    }
  }

  @keyframes spin {
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .footer__lang {

    @include bp('tablet') {
      display: block;
      position: absolute;
      top: var(--size-rat);
      right: var(--size-rat);
    }

    @include bp('phone') {
      top: auto;
      bottom: var(--size-design-bezel);
      right: var(--size-design-bezel);
      margin-bottom: var(--size-mouse);
    }

    display: flex;

    a {
      padding: 0.5em;

      &[aria-selected] {
        font-weight: bold;
      }
    }
  }
  .footer__socialIcon {
    width: 2.6rem;
    height: 2.6rem;
    --color-icon-contrast: #000;
  }
  .footer__social {
    > * {
      display: inline-block;
      margin-right: 0.5em;
    }

    @include bp('phone') {
      margin-bottom: var(--size-mouse);
    }
  }

  .footer__logo-bottomlink {
    display: block;
    width: 4rem;
    height: 4rem;
    margin: var(--size-gutter) auto;
  }
  .footer__logoicon {
    width: 100%;
    height: 100%;
  }
</style>
