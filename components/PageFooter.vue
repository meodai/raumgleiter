<script>
  import collect from 'collect.js';

  export default {
    async fetch () {
      this.footerByLocale = collect(await this.$craft('footer')).keyBy('locale').all();
    },
    data () {
      return {
        footerByLocale: null,
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
  };
</script>

<template>
  <div v-if="footer" class="footer">
    <div class="footer__inner">
      <a class="footer__logo-link footer__col" href="/">
        <Logo class="footer__logo" />
      </a>
      <div class="footer__col">
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
        >
          <input
            type="email"
            :placeholder="$t('email')"
            required="required"
          >
          <button>{{ $t('subscribe') }}</button>
        </form>
      </article>
      <ul class="footer__nav footer__col">
        <li
          v-for="(section, key) in mainSections"
          :key="'footer-main-links-'+key"
        >
          <nuxt-link :to="localePath(section.path)">
            {{ section.title }}
          </nuxt-link>
        </li>

        <li
          v-for="(section, index) in asideSections"
          :key="'footer-aside-links-'+index"
          :class="{ 'footer__navgap footer__col': index === 0 }"
        >
          <nuxt-link :to="localePath(section.path)">
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
          >
            {{ locale.code.toUpperCase().charAt(0) }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .footer {
    position: relative;
    z-index: 1;
    --size-footer-stack: 0.4em;

    background-color: var(--color-layout--background-inverted);
    color: var(--color-text--inverted);

    path {
      fill: var(--color-text--inverted);
    }
  }

  .footer__inner {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: var(--size-rat);

    @include bp('phone') {
      display: block;
    }
  }

  .footer__col {
    padding-right: var(--size-cat);
    flex: 1 1 20%;

    &:last-child {
      flex: 1 0 1px;
      padding-right: 0;
    }
  }

  .footer__logo {
    min-width: 10rem;
    max-width: 13rem;
  }

  .footer__logo-link {
    flex: 1 0 1px;
  }

  .footer__address {
    font-style: normal;
    margin-bottom: var(--size-mouse);

    @include bp('phone') {
      margin-top: var(--size-rat);
    }
  }

  .footer__address > * {
    display: block;
  }
  .footer__nav {
    @include bp('phone') {
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
    margin-top: var(--size-footer-stack);
    margin-right: -0.75rem;
    margin-left: -0.75rem;

    input, button {
      font-size: 1.4rem;
      padding: .2em .75em .3em;
      border-radius: 2rem;

      @include bp('phone') {
        font-size: 2rem;
      }
    }
    input {
      display: block;
      width: 100%;
      background: rgba(#7f7f7f, .5);
      padding-right: 8.5rem;
      outline: none;

      &:focus {
        box-shadow: 0 0 0 2px #fff;
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(#7f7f7f, .75);
    }
  }

  .footer__navgap {
    margin-top: 2em;
  }

  .footer__lang {

    @include bp('phone') {
      display: block;
      position: absolute;
      top: var(--size-rat);
      right: var(--size-rat);
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
</style>
