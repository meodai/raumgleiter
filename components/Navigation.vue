<script>
  export default {
    data () {
      return {
        isOpen: false,
      };
    },
    computed: {
      menuItems () {
        return this.$store.getters.getAsideSections;
      },
      dropdownItems () {
        return this.$store.getters.getMainSections;
      },
    },
    watch: {
      '$nuxt.$route' () {
        this.isOpen = false;
      },
    },
    methods: {
      toggleDrawer () {
        this.isOpen = !this.isOpen;
      },
      logoClick () {
        this.$nuxt.$emit('logoClick');
      },
    },
  };
</script>

<template>
  <div class="navigation" :class="{'navigation--isOpen': isOpen}">
    <div class="navigation__bar">
      <nuxt-link
        class="navigation__logo-link"
        :to="localePath('/')"
        @click.native="logoClick"
      >
        <Logo class="navigation__logo" />
        <span class="sr-only">Raumgleiter</span>
      </nuxt-link>
      <button
        aria-label="Explore Menu"
        id="navigation-trigger"
        aria-haspopup="true"
        aria-controls="navigation-dropdown"
        :aria-expanded="isOpen"
        class="navigation__trigger"
        @click="toggleDrawer"
      >
        <span class="navigation__triggerInner">
          {{ $t('explore') }}
          <Icon class="navigation__trigger-icon" :name="'icon_arrow_right'" />
        </span>
        <Hamburger class="navigation__burger" :is-open="isOpen" />
      </button>
      <nav
        class="navigation__company"
        :aria-label="$t('mainNavigation')"
      >
        <ul class="navigation__menu">
          <li
            v-for="menuItem in menuItems"
            :key="'menu'+menuItem.title"
            class="navigation__menuitem"
          >
            <nuxt-link :to="localePath(menuItem.path)" @click.native="$scrollToTop">
              {{ menuItem.title }}
            </nuxt-link>
          </li>
        </ul>
        <button
          aria-hidden="true"
          class="navigation__location" @click.prevent="$scrollToBottom">
          <Icon
            class="navigation__locationIcon"
            :name="'raumgleiter_symbol'"
            :is-block="true"
          />
        </button>
      </nav>
    </div>
    <nav
      aria-labelledby="navigation-trigger"
      class="navigation__drawer"
    >
      <ol
        role="none"
        class="navigation__drawer-list"
      >
        <li
          v-for="dropdownItem in dropdownItems"
          :key="'dropdown'+dropdownItem.slug"
          role="none"
          class="navigation__drawer-item"
        >
          <nuxt-link
            :to="localePath(dropdownItem.path)"
            role="menuitem"
            @click.native="$scrollToTop"
          >
            <strong>{{ dropdownItem.title }}</strong>
            <p class="navigation__description">
              {{ dropdownItem.text }}
            </p>
          </nuxt-link>
        </li>
      </ol>
      <ul class="navigation__drawer-list navigation__drawer-list--nav">
        <li
          v-for="menuItem in menuItems"
          :key="'menu'+menuItem.title"
          class="navigation__menuitem"
        >
          <nuxt-link :to="localePath(menuItem.path)" @click.native="$scrollToTop">
            {{ menuItem.title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
  // mix-blend-mode: difference;
  .navigation {
    position: relative;
    --size-gutter-x: 1.5rem;
    font-size: 1.6rem;
    @include typo('navigationTitles');

    @include bp('phone') {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      font-size: 2rem;
    }
  }

  .navigation__bar {
    position: relative;
    z-index: 3;
    background-color: var(--color-layout--background-inverted);
    color: var(--color-text--inverted);
    height: 6rem;
  }
  .navigation__bar,
  .navigation__drawer {
    padding: var(--size-gutter-x) var(--size-gutter);
  }

  .navigation__bar {
    padding-bottom: calc(var(--size-gutter-x) * 1.1);
  }
  .navigation__logo {
    width: 16rem;
    fill: currentColor;
    display: block;
    margin-right: 1rem;

    @include bp('phone') {
      width: 15rem;
      margin-right: 0;
    }
  }
  .navigation__logo-link {
    display: inline-block;
    width: 16%;
    margin-bottom: -0.5rem;
    outline: none;

    @include bp('tablet') {
      width: auto;
      margin-right: 1em;
    }

    @include bp('phone') {
      width: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-right: 0;
    }
  }
  .navigation__trigger {
    display: inline-block;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: none;
    color: currentColor;
    font-size: 2rem;
    padding: 0;
    line-height: 1;
    outline: none;
    cursor: pointer;
    margin-top: 0.1em;
    margin-left: -0.2em;

    .icon {
      stroke: var(--color-text--inverted);
      height: 0.7em;
      width: 1em;
    }

    @include bp('phone') {
      position: absolute;
      top: 0;
      left: 0;
      margin: var(--size-gutter-x) var(--size-gutter);
    }
  }

  .navigation__triggerInner {
    @include bp('phone') {
      display: none;
    }
  }

  .navigation__burger {
    display: none;

    @include bp('phone') {
      display: block;
    }
  }

  .navigation__description {
    @include typo('navigation');
    opacity: 0.6;

    a:hover & {
      color: var(--color-text);
    }
    @include bp('phone') {
      display: none;
    }
  }

  .navigation__drawer {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding-bottom: var(--size-gutter);

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0; right: 0; bottom: 0; left: 0;
      background: var(--color-layout--accent);

      @include bp('phone') {
        background: var(--color-layout--background-inverted);
      }
    }

    @include bp('phone') {
      position: fixed;
      top: 5.8rem;
      color: var(--color-text--inverted);
      padding-bottom: calc(var(--size-gutter) * 2);
    }
  }

  .navigation__drawer-list {
    position: relative;
    z-index: 2;
    display: flex;

    @include bp('phone') {
      display: block;
    }
  }

  .navigation__drawer-list--nav {
    display: none;
    margin-left: var(--size-gutter);
    padding-top: .3em;

    .navigation__menuitem {
      margin-top: 0.6em;
    }

    @include bp('phone') {
      display: block;
    }
  }
  .navigation__drawer-item {
    flex: 0 1 16%;

    strong {
      display: block;
      margin-bottom: 1.5rem;
    }

    a {
      display: block;
      padding-right: calc(var(--size-gutter) * 0.5);
      text-decoration: none;

      &:hover {
        strong {
          text-decoration: underline;
        }
      }
    }

    @include bp('tablet') {
      flex: 1 1 auto;
    }
  }
  .navigation__menu {
    display: inline-block;
    line-height: 1;

    @include bp('phone') {
      display: none;
    }
  }
  .navigation__menu li {
    display: inline-block;
    margin-right: calc(var(--size-gutter) * 0.5);
  }
  .navigation__company {
    float: right;
  }

  // toggle animation
  .navigation__drawer {
    pointer-events: none;
  }
  .navigation__trigger-icon {
      transition: 233ms transform cubic-bezier(.7,.3,.3,1.5);
  }
  .navigation__drawer:before {
    transform: translateY(-110%);
    transition: 250ms transform cubic-bezier(.7,.3,0,1) 250ms;
  }
  .navigation__drawer-item {
    opacity: 0;
    transform: translateY(-150%);
    transition: 200ms opacity, 250ms transform cubic-bezier(.7,.3,0,1);

    @include bp('phone') {
      opacity: 0;
      transition: 200ms opacity linear, 250ms transform cubic-bezier(.7,.3,0,1);
    }

    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        transition-delay: (8 - $i) * 40ms;
      }
    }
  }
  .navigation__drawer-list--nav {
    opacity: 0;
    transition: 200ms opacity;

  }
  .navigation--isOpen {
    .navigation__drawer-list--nav {
      opacity: 1;
      transition: 200ms opacity .7s;
    }
    .navigation__trigger-icon {
      transform: rotate(90deg);
    }
    .navigation__drawer {
      pointer-events: all;
    }
    .navigation__drawer:before {
      transform: translateY(0%);
      transition: 250ms transform cubic-bezier(.7,.3,0,1);
    }
    .navigation__drawer-item {
      opacity: 1;
      transform: translateY(0%);
      transition: 400ms opacity linear, 350ms transform cubic-bezier(.7,.3,0,1);

      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 20ms;
        }
      }

      @include bp('phone') {
        opacity: 1;
        transition: 200ms opacity, 250ms transform cubic-bezier(0.7, 0.3, 0, 1);
        @for $i from 1 through 8 {
          &:nth-child(#{$i}) {
            transition-delay: 100ms + $i * 20ms, $i * 20ms;
          }
        }
      }
    }
  }

  .navigation__location {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-left: var(--size-mouse);

    .navigation__locationIcon {
      width: 3rem;
      height: 3rem;
    }

    @include bp('phone') {
      display: none;
    }
  }
</style>
