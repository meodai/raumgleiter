<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
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
  <div class="hamburger" :class="{'hamburger--open': isOpen}">
    <div class="hamburger__inner" />
  </div>
</template>

<style lang="scss">
  .hamburger {
    position: relative;
    width: 3.8rem;
    height: 2.8rem;
  }

  .hamburger__inner {
    top: 50%;
    display: block;
    width: 80%;
    margin-top: -.2rem;
  }

  .hamburger__inner,
  .hamburger__inner::after,
  .hamburger__inner::before {
    position: absolute;
    height: 2px;
    transition-timing-function: ease, linear;
    transition-duration: 150ms, 150ms;
    transition-property: transform, color;
    transition-delay: 100ms, 0;
    border-radius: 2px;
    background-color: currentColor;
  }

  .hamburger__inner::after,
  .hamburger__inner::before {
    width: 100%;
    display: block;
    content: "";
  }

  .hamburger__inner::before {
    top: -6px;
  }

  .hamburger__inner::after {
    bottom: -6px;
  }

  .hamburger--open {
    .hamburger__inner {
      background: transparent;
    }
    .hamburger__inner::before {
      transform: translateY(.8rem) rotate(45deg);
    }
    .hamburger__inner::after {
      transform: translateY(-.8rem) rotate(-45deg);
    }
  }
</style>
