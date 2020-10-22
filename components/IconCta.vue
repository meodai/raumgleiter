<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      isBlock: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        id: '',
      };
    },
    mounted () {
      this.id = this._uid;
    },
  };
</script>

<template>
  <svg
    class="iconcta icon--cta iconcta--block"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68.02 67.95"
  >
    <defs v-if="name == 'communication'">
      <clipPath :id="`communication-clip-path-${id}`" transform="translate(-1.81 -0.15)">
        <path
          class="communication__boubble--mask"
          fill="none"
          d="M-9.49 77.35c.54 2.19 41.49-5.84 42.65-3.92L22.55 61A27.18 27.18 0 0157 22.16V-7.38C52.54-7.46-4.6-5.77-9.49-4.57"
        />
      </clipPath>
    </defs>
    <g v-if="name == 'smiley'" class="smiley">
      <circle
        class="smiley__head"
        cx="33.56"
        cy="35.06"
        r="30"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <ellipse
        class="smiley__eye-left"
        cx="25.57"
        cy="20.18"
        rx="4.63"
        ry="5.14"
      />
      <ellipse
        class="smiley__eye-right"
        cx="41.56"
        cy="20.18"
        rx="4.63"
        ry="5.14"
      />
      <path
        class="smiley__mouth"
        d="M18.77 30.15a17.66 17.66 0 1033.69 0z"
        transform="translate(-1.81 -0.15)"
      />
    </g>
    <g v-if="name == 'vr'" class="vr">
      <path
        class="base"
        d="M52.34 15.7H18.4A15.77 15.77 0 002.63 31.47V39A15.77 15.77 0 0018.4 54.72h9.08a8.39 8.39 0 01-.37-2.47 8.26 8.26 0 1116.52 0 8.08 8.08 0 01-.38 2.47h9.09A15.77 15.77 0 0068.11 39v-7.53A15.77 15.77 0 0052.34 15.7zM62 31.9H46.22a24.28 24.28 0 01-.15-2.47 7.76 7.76 0 018-7.9 7.75 7.75 0 018.12 7.9c-.02.8-.09 1.67-.19 2.47z"
        transform="translate(-1.81 -0.15)"
      />
    </g>
    <g v-if="name == 'heart'" class="heart">
      <path
        class="heart__outline"
        d="M48.53 14.86a14.63 14.63 0 0114.58 13.5v2.27c0 .39-.07.76-.13 1.14-2.29 16-24.28 22.65-27.6 23.56-3.32-.91-25.31-7.58-27.6-23.56-.06-.38-.1-.75-.13-1.14v-.1-.92-.13-.15-.35-.44-.18a14.62 14.62 0 0127.74-5.25 14.61 14.61 0 0113.16-8.25m0-5A19.7 19.7 0 0035.37 15 19.6 19.6 0 002.65 28v3.21c0 .44.1.88.17 1.32C5.56 51.42 29.3 58.88 34 60.19l1.33.37 1.33-.37c4.73-1.31 28.48-8.77 31.21-27.63.07-.45.12-.89.16-1.33V30.81v-1.56-.43V28.01a19.7 19.7 0 00-19.5-18.15z"
        transform="translate(-1.81 -0.15)"
      />
      <path
        class="heart__bump"
        d="M58 33.16a10.29 10.29 0 00.45-3 10.07 10.07 0 10-19.67 3z"
        transform="translate(-1.81 -0.15)"
      />
    </g>
    <g v-if="name == 'flashed'" class="flashed">
      <circle
        class="flashed__outline"
        cx="33.22"
        cy="34.59"
        r="30"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="5"
      />
      <path
        class="flashed__eye-left__outline"
        fill="var(--c-design-background, #fff)"
        d="M33.81 35.9L22.57 30l-11.25 5.9 2.15-12.53-9.1-8.87 12.57-1.82 5.63-11.4 5.62 11.4 12.57 1.82-9.1 8.87zM21.56 20.09l.5.49-.12.69.63-.33.62.33-.12-.69.5-.49-.69-.1-.32-.63-.31.63z"
        transform="translate(-1.81 -0.15)"
      />
      <path
        class="flashed__eye-right__outline"
        fill="var(--c-design-background, #fff)"
        d="M56.75 36.66L44.84 30.4l-11.91 6.26 2.28-13.27L25.57 14l13.32-1.93L44.84 0l5.96 12.07L64.11 14l-9.63 9.39 2.27 13.27z"
      />
      <path
        class="flashed__mouth"
        d="M21.8 31.65a13.94 13.94 0 1027.25 4.17 13.72 13.72 0 00-.64-4.17z"
        transform="translate(-1.81 -0.15)"
      />
      <path class="flashed__eye-right" d="M44.84 10.17l2.97 6.01 6.63.96-4.8 4.68 1.14 6.61-5.94-3.12-5.93 3.12 1.13-6.61-4.8-4.68 6.64-.96 2.96-6.01z" />
      <path class="flashed__eye-left" d="M20.76 10.17l2.97 6.01 6.63.96-4.8 4.68 1.13 6.61-5.93-3.12-5.93 3.12 1.13-6.61-4.8-4.68 6.63-.96 2.97-6.01z" />
    </g>
    <g v-if="name == 'raumgleiter'" class="raumgleiter">
      <path
        class="raumgleiter_r"
        d="M24.33 19.38v33.17h10.82V19.38zm27.2 8.75c.07-.72.13-1.52.13-2.25a7.09 7.09 0 00-7.43-7.23 7.09 7.09 0 00-7.29 7.23c0 .8.06 1.53.13 2.25z"
        transform="translate(-1.81 -0.15)"
      />
      <circle
        class="raumgleiter__outline"
        cx="33.52"
        cy="35.45"
        r="30"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="5"
      />
    </g>
    <g
      v-if="name == 'thumb'"
      class="thumb"
      fill="none"
      stroke="currentColor"
      stroke-miterlimit="10"
      stroke-width="5"
    >
      <path
        class="thumb__thumb"
        d="M22.15 31.66c7.08 0 15.38-5.74 15.38-12.82v-4.67a6.31 6.31 0 0112.61 0v17.49H62.5a4.81 4.81 0 014.63 6.13l-5.51 22.35a4.39 4.39 0 01-4.22 3.19H30.76a8.4 8.4 0 01-8.39-8.4z"
        transform="translate(-1.81 -0.15)"
      />
      <rect
        class="thumb__jacket"
        width="14.83"
        height="31.67"
        x="5.52"
        y="31.51"
        rx="3.94"
      />
    </g>
    <g v-if="name == 'communication'" class="communication">
      <path
        :clip-path="`url(#communication-clip-path-${id})`"
        class="communication__boubble--left"
        d="M14 41.49a21.84 21.84 0 006.86 1.09 23.25 23.25 0 004.22-.39 21.77 21.77 0 0013-7.44 16.3 16.3 0 003.72-13.38 16.33 16.33 0 00-8.22-11.2 21.82 21.82 0 00-14.81-2.35 21.8 21.8 0 00-13 7.44 16.26 16.26 0 00-3.71 13.38 15.85 15.85 0 006 9.74c-.65 2-2.65 3-5 2.7a6.08 6.08 0 003.7 2.72A7 7 0 0014 41.49"
        data-name="communication__boubble--left"
        transform="translate(-1.81 -0.15)"
      />

      <g class="communication__boubble--right">
        <path
          class="communication__boubble-right"
          d="M60.68 51.61a10.43 10.43 0 007.09 6.22 13.37 13.37 0 01-9.83 2.37 16.32 16.32 0 01-10-5.44l-20 5-1-1.57a21.94 21.94 0 0113.48-32.71 22 22 0 0127.14 22.63l-.12 1.83-6.76 1.67"
          transform="translate(-1.81 -0.15)"
        />
        <path
          class="communication__line"
          fill="none"
          stroke="var(--c-design-background, #fff)"
          stroke-miterlimit="10"
          stroke-width="3"
          d="M29.72 47.71h21.02"
        />
        <path
          class="communication__line"
          fill="none"
          stroke="var(--c-design-background, #fff)"
          stroke-miterlimit="10"
          stroke-width="3"
          d="M29.72 41.64h26.71"
          data-name="communication__line"
        />
        <path
          class="communication__line"
          fill="none"
          stroke="var(--c-design-background, #fff)"
          stroke-miterlimit="10"
          stroke-width="3"
          d="M29.72 35.57h12.54"
          data-name="communication__line"
        />
      </g>
    </g>
  </svg>
</template>

<style lang="scss">
  .iconcta {
    overflow: visible;
    display: block;
    width: 5rem;
    height: 5rem;
    fill: currentColor;
  }

  .calltoaction__block {
    // contextual animations

    .heart__outline,
    .heart__bump {
      transform: scale(0);
      opacity: 0;
      transform-origin: 50% 50%;

      transition: 300ms opacity linear, 644ms transform cubic-bezier(0.3, 0.7, 0, 1.3);
      transition-delay: var(--inital-delay);
    }

    .heart__bump {
      transition-delay: calc(var(--inital-delay) + 0.4s);
    }

    .communication__boubble--left,
    .communication__boubble--mask,
    .communication__boubble--right {
      transition: 300ms opacity linear, 644ms transform cubic-bezier(0.3, 0.7, 0, 1.3);
      transition-delay: var(--inital-delay);
    }

    .communication__boubble--left {
      opacity: 0;
      transform-origin: 0% 50%;
      transform: translate(-2rem, 0) scale(.5);
    }
    .communication__boubble--mask {
      transform: translate(1rem, 1rem);
      transition-delay: calc(var(--inital-delay) + 0.4s);
    }
    .communication__boubble--right {
      opacity: 0;
      transform-origin: 100% 50%;
      transform: translate(2rem, 2rem) scale(.5);
      transition-delay: calc(var(--inital-delay) + 0.4s);
    }
    .communication__line {
      stroke-dasharray: 30 30;
      stroke-dashoffset: 30;
      transition: 250ms stroke-dashoffset cubic-bezier(0.3, 0.7, 0, 1.3);
      transition-delay: calc(var(--inital-delay) + 1s);

      &:nth-child(3) {
        transition-delay: calc(var(--inital-delay) + 1.2s);
      }
      &:nth-child(4) {
        transition-delay: calc(var(--inital-delay) + 1.4s);
      }
    }

    .flashed__outline {
      stroke-dasharray: 300 300;
      stroke-dashoffset: -300;
      transition: 650ms stroke-dashoffset cubic-bezier(0.3, 0.7, 0, 1.3);
      transition-delay: calc(var(--inital-delay) + .5s);
    }
    .flashed__eye-left,
    .flashed__eye-left__outline,
    .flashed__eye-right,
    .flashed__eye-right__outline,
    .flashed__mouth {
      opacity: 0;
      transition: 300ms opacity linear, 644ms transform cubic-bezier(0.3, 0.7, 0, 1.3);
      transform-origin: 45% 45%;
    }

    .flashed__eye-left,
    .flashed__eye-left__outline {
      transform: scale(.5) rotate(1000deg);
      transition-delay: calc(var(--inital-delay) + .8s);
    }
    .flashed__eye-right,
    .flashed__eye-right__outline {
      transform: scale(.5) rotate(-1000deg);
      transition-delay: calc(var(--inital-delay) + .9s)
    }

    .flashed__mouth {
      transform: scaleY(.1);
      transition-delay: calc(var(--inital-delay) + 1s)
    }
  }

  .calltoaction__block--visible {
    .heart__outline,
    .heart__bump,
    .communication__boubble--left,
    .communication__boubble--mask,
    .communication__boubble--right,
    .flashed__eye-left,
    .flashed__eye-left__outline,
    .flashed__eye-right,
    .flashed__eye-right__outline,
    .flashed__mouth {
      transform: translate(0, 0) scale(1) rotate(0);
      opacity: 1;
    }
    .communication__line,
    .flashed__outline {
      stroke-dashoffset: 0;
    }
  }
</style>
