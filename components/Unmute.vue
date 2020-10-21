<script>
  export default {
    computed: {
      isMuted () {
        return this.$store.state.isMuted;
      },
    },
  };
</script>

<template>
  <svg
    class="icon-unmute"
    :class="{'icon-unmute--muted': isMuted}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 162.5 110.92"
  >

    <path d="M6.08 81.53h28.71a6.09 6.09 0 013.44 1l37.44 25.4a6.09 6.09 0 009.52-5V7.91a6.09 6.09 0 00-9.52-5L38.23 28.33a6.1 6.1 0 01-3.44 1.06H6.08a6.05 6.05 0 00-6.08 6v40.14a6.06 6.06 0 006.08 6z" />
    <g class="icon-unmute__on">
      <path class="icon-unmute__vol" d="M100.59 77.04a4.55 4.55 0 006.39 0 30.33 30.33 0 000-43.19 4.56 4.56 0 00-6.39 0 4.45 4.45 0 000 6.33 21.44 21.44 0 010 30.52 4.44 4.44 0 000 6.34z" />
      <path class="icon-unmute__vol" d="M129.77 55.46a43.73 43.73 0 01-13.06 31.23 4.45 4.45 0 000 6.33 4.53 4.53 0 006.38 0 52.75 52.75 0 000-75.1 4.54 4.54 0 00-6.38 0 4.45 4.45 0 000 6.33 43.73 43.73 0 0113.06 31.21z" />
      <path class="icon-unmute__vol" d="M153.44 55.46a66.81 66.81 0 01-20 47.82 4.45 4.45 0 000 6.33 4.54 4.54 0 006.38 0 76 76 0 000-108.3 4.54 4.54 0 00-6.38 0 4.44 4.44 0 000 6.32 66.81 66.81 0 0120 47.83z" />
    </g>
    <g class="icon-unmute__off">
      <path d="M146.34 78.05a4 4 0 01-2.83-1.17l-40.95-40.95a4 4 0 115.65-5.66l41 41a4 4 0 01-2.83 6.82z" />
      <path d="M105.44 78.05a4 4 0 01-2.83-6.82l40.95-41a4.002 4.002 0 015.66 5.66l-41 41a4 4 0 01-2.78 1.16z" />
    </g>
  </svg>
</template>

<style lang="scss">
  .icon-unmute {
    fill: currentColor;
    width: 1.2em;
    height: auto;
    overflow: visible;
    &:hover .icon-unmute__vol {
      opacity: 0;
    }
    &:hover .icon-unmute__off {
      opacity: 1;
    }

    @include bp('phone') {
      width: 2.2em;
    }
  }

  .icon-unmute__off {
    transition: 200ms opacity linear;
    opacity: 0;
  }

  .icon-unmute--muted {
    .icon-unmute__vol {
      display: block;
    }

    &:hover .icon-unmute__vol {
      animation: none;
      opacity: 1;
    }
    .icon-unmute__off {
      display: none;
    }
  }

  .icon-unmute__vol {
    display: none;
    opacity: 0;
    animation: showvolbar 1s infinite linear;
    transition: 200ms opacity linear;

    &:nth-child(2) {
      animation-delay: 150ms;
    }
    &:nth-child(3) {
      animation-delay: 250ms;
    }
  }

  @keyframes showvolbar {
    100% {
      opacity: 1;
    }
  }
</style>
