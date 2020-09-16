<script>
  export default {
    props: {
      dropdownItems: {
        required: true,
        type: Array,
      },
      menuItems: {
        required: true,
        type: Array,
      },
    },
    methods: {
      toggleDrawer: function toggleDrawer () {
        this.isOpen = !this.isOpen;
      },
    },
    data () {
      return {
        isOpen: false,
      };
    },
  };
</script>

<template>
  <div class="navigation" :class="{'navigation--isOpen': isOpen}">
    <div class="navigation__bar">
      <a class="navigation__logo-link" href="/">
        <Logo class="navigation__logo" />
      </a>
      <button
        id="navigation-trigger"
        aria-haspopup="true"
        aria-controls="navigation-dropdown"
        :aria-expanded="isOpen"
        class="navigation__trigger"
        @click="toggleDrawer"
      >
        Explore
        <Icon class="navigation__trigger-icon" :name="'icon_arrow_right'" />
      </button>
      <nav
        class="navigation__company"
        aria-label="Company Navigation"
      >
        <ul class="navigation__menu">
          <li
            v-for="menuItem in menuItems"
            :key="menuItem.route"
            class="navigation__menuitem"
          >
            <a :href="menuItem.route">
              {{menuItem.title}}
            </a>
          </li>
        </ul>
        <a class="navigation__location" href="https://goo.gl/maps/XZx5zan9WGNbG3mA9">
          Location
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
          :key="dropdownItem.route"
          role="none"
          class="navigation__drawer-item"
        >
          <a
            :href="dropdownItem.route"
            rolte="menuitem"
          >
            <strong>{{dropdownItem.title}}</strong>
            <p class="navigation__description">{{dropdownItem.text}}</p>
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style lang="scss">
  .navigation {
    position: relative;
    --size-gutter-x: 1.5rem;
    font-size: 1.6rem;
    @include typo('navigationTitles');
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
  .navigation__logo {
    width: 13rem;
    fill: currentColor;
    display: block;
  }
  .navigation__logo-link {
    display: inline-block;
    width: 16%;
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
  }



  .navigation__description {
    @include typo('navigation');
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
      top: 0; right: 0; bottom: 0; left: 0;
      background: var(--color-layout--background);
    }
  }
  .navigation__drawer-list {
    position: relative;
    z-index: 2;
    display: flex;
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
    }
  }
  .navigation__menu {
    display: inline-block;
    line-height: 1;
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
  }
  .navigation__drawer-item {
    transform: translateY(-150%);
    transition: 250ms transform cubic-bezier(.7,.3,0,1);
    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        transition-delay: (8 - $i) * 50ms;
      }
    }
  }

  .navigation--isOpen {
    .navigation__trigger-icon {
      transform: rotate(90deg);
    }
    .navigation__drawer {
      pointer-events: all;
    }
    .navigation__drawer:before {
      transform: translateY(0%);
      transition: 650ms transform cubic-bezier(.7,.3,0,1);
    }
    .navigation__drawer-item {
      transform: translateY(0%);
      transition: 450ms transform cubic-bezier(.7,.3,0,1);
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 50ms;
        }
      }
    }
  }
</style>
