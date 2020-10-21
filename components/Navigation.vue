<script>
  export default {
    data () {
      return {
        isOpen: false,
      };
    },
    computed: {
      menuItems () {
        return this.$store.state.asideSections;
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
    },
  };
</script>

<template>
  <div class="navigation" :class="{'navigation--isOpen': isOpen}">
    <div class="navigation__bar">
      <nuxt-link class="navigation__logo-link" to="/">
        <Logo class="navigation__logo" />
      </nuxt-link>
      <button
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
            <nuxt-link :to="localePath(menuItem.path)">
              {{ $t(menuItem.title) }}
            </nuxt-link>
          </li>
        </ul>
        <a class="navigation__location" href="https://goo.gl/maps/XZx5zan9WGNbG3mA9">
          <Icon
            class="navigation__locationIcon"
            :name="'location_plus'"
            :is-block="true"
          />
        </a>
      </nav>
    </div>
    <nav
      role="menu"
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
          <nuxt-link :to="localePath(menuItem.path)">
            {{ $t(menuItem.title) }}
          </nuxt-link>
        </li>
      </ul>
      <a class="navigation__location navigation__location--drawer" href="https://goo.gl/maps/XZx5zan9WGNbG3mA9">
        <Icon
          class="navigation__locationIcon"
          :name="'location_plus'"
          :is-block="true"
        />
      </a>
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
  }
  .navigation__bar,
  .navigation__drawer {
    padding: var(--size-gutter-x) var(--size-gutter);
  }

  .navigation__bar {
    padding-bottom: calc(var(--size-gutter-x) * 1.1);
    @include bp('phone') {
      //padding: 0;
    }
  }
  .navigation__logo {
    width: 13rem;
    fill: currentColor;
    display: block;
  }
  .navigation__logo-link {
    display: inline-block;
    width: 16%;
    margin-bottom: -0.5rem;
    outline: none;
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

    .icon {
      stroke: #fff;
      height: 0.7em;
      width: 1em;
    }

    @include bp('phone') {
      position: absolute;
      top: 0;
      right: 0;
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
      background: var(--color-layout--background);
    }

    @include bp('phone') {
      position: fixed;
      top: 5.8rem;
      left: auto;
      right: 0;
      bottom: 0;
      width: 60vw;
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

      &:hover strong {
        text-decoration: underline;
      }
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
    transition: 450ms transform cubic-bezier(.7,.3,0,1) 250ms;

    @include bp('phone') {
      transform: translateX(110%);
    }
  }
  .navigation__drawer-item {
    transform: translateY(-150%);
    transition: 250ms transform cubic-bezier(.7,.3,0,1);
    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        transition-delay: (8 - $i) * 50ms;
      }
    }

    @include bp('phone') {
      transform: translateX(110%);
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
      transition: 650ms transform cubic-bezier(.7,.3,0,1);

      @include bp('phone') {
        transform: translateX(0%);
      }
    }
    .navigation__drawer-item {
      transform: translateY(0%);
      transition: 450ms transform cubic-bezier(.7,.3,0,1);

      @include bp('phone') {
        transform: translateX(0%);
      }

      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 50ms;
        }
      }
    }
  }

  .navigation__location {
    display: inline-block;
    vertical-align: middle;
    margin-left: var(--size-mouse);

    .navigation__locationIcon {
      width: 3rem;
      height: 3rem;
    }

    @include bp('phone') {
      display: none;
    }
  }

  .navigation__location--drawer {
    display: none;
    pointer-events: none;

    @include bp('phone') {
      display: block;
      margin-left: 0;
      opacity: 0;
    }

    color: #000;
    fill: #000;
  }

  .navigation--isOpen .navigation__location--drawer {
    @include bp('phone') {
      pointer-events: all;
      opacity: 1;
      transition: 200ms opacity .7s;
    }
  }

</style>
