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
        return this.footerByLocale[this.$i18n.locale] ? this.footerByLocale[this.$i18n.locale] : null;
      },
      mainSectionsByLocale () {
        return this.$store.state.mainSectionsByLocale;
      },
      mainSections () {
        return this.mainSectionsByLocale[this.$i18n.locale] ? this.mainSectionsByLocale[this.$i18n.locale].entries : [];
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
      <address
        aria-label="Kontaktadresse"
        class="footer__address footer__col"
        v-html="footer.address"
      />
      <!-- footer.socialLinks -->
      <article class="footer__newsletter footer__col">
        <h4>{{ footer.newsletterLabel }}</h4>
        <form
          class="footer__form"
          action="#"
          method="post"
        >
          <input
            type="email"
            placeholder="e-mail"
            required="required"
          >
          <button>subscribe</button>
        </form>
      </article>
      <ul class="footer__nav footer__col">
        <li><a href="#">Virtual Real Estate</a></li>
        <li><a href="#">Virtuelle Vermarktung</a></li>
        <li><a href="#">Virtueller Wettbewerb</a></li>
        <li><a href="#">Virtuelle Konfigratoren</a></li>
        <li><a href="#">Virtuelle Lösungen</a></li>
        <li><a href="#">Application Development</a></li>

        <li class="footer__navgap footer__col">
          <a href="#">Projekte</a>
        </li>
        <li><a href="#">Team</a></li>
        <li><a href="#">About</a></li>
      </ul>
      <ul aria-label="Language" class="footer__lang footer__col">
        <li>
          <a
            aria-selected
            aria-label="Deutsch"
            href="#"
          >D</a>
        </li>
        <li><a aria-label="English" href="#">E</a></li>
        <li><a aria-label="Français" href="#">F</a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .footer {
    --size-footer-stack: 0.4em;

    font-size: 1.6rem;
    background-color: var(--color-layout--background-inverted);
    color: var(--color-text--inverted);

    path {
      fill: var(--color-text--inverted);
    }

    button,
    input,
    input::-webkit-input-placeholder,
    input::placeholder  {
      background: none;
      border: 0;
      appearance: none;
      color: var(--color-text--inverted);
      font-weight: 100;
    }
  }

  .footer__inner {
    display: flex;
    justify-content: space-between;
    padding: var(--size-rat);

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
  }

  .footer__address > * {
    display: block;
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
    display: flex;
    a {
      padding: 0.5em;

      &[aria-selected] {
        font-weight: bold;
      }
    }
  }
</style>
