<script>
  export default {

  };
</script>

<template>
</template>

<style lang="scss">

  /*
                                     __  _____  __    __   __
                                    | |  | |  / /`  ( (` ( (`
                                   |_|  |_|  \_\_, _)_) _)_)
                                          `-.` '.-'
                                       `-.    A   .-'.
                                    `-.    -./_\.-    .-'
                                        -.  /___\  .-
                                    `-.   `/__|__\'   .-'.
                                 `-.    -./.-"^"-.\.-      '
                                    `-.  / <`(o)*> \  .-'
                                 .-   .`/__`-...-'__\'   .-
                                ,...`-./_/____|____\_\.-'.,.
                                   ,-'    ,` . . ',   `-,
                               _,-' /____/____.____\____\ `-,_
                                       ,      |      .
                                      /     ,.+.,     \
   -<# ITCSS (Inverted Triangle CSS) -> (https://csswizardry.com/2018/11/itcss-and-skillshare/) #>-
  __________________________________________________________________________________________________
   \---------------------------/------------                          Generic CSS (Low specificity)
    \                         /  1) Settings (Design)                              Y
     \-----------------------/---------------- (optional Skin or Theme)            |
      \                     /    2) Tools                                          |
       \-------------------/--------------------                                   |
        \                 /      3) Generic                                        |
         \---------------/------------------------                                 |
          \             /        4) Elements                                       |
           \-----------/----------------------------                               |
            \         /          5) Objects                                        |
             \-------/--------------------------------                             |
              \     /            6) Components                                     |
               \---/------------------------------------                           |
                \ /              7) Utilities (Trumps)                             V
                 V                                                   Explicit CSS (High specificity)
  1) Settings:             Global variables, config switches.
  2) Tools:                Default mixins and functions.
  3) Generic:              Ground-zero styles (Normalize.css, resets, box-sizing).
  4) Elements:             Un-classed HTML elements (type selectors).
  5) Objects:              Cosmetic-free design patterns
  6) Components:           Designed components, chunks of UI.
  7) Utilities/Trumps:     Helpers and overrides.

*/

// 1) Settings

:root {
  --size-mouse: 3.2rem; // small title
  --size-rat: 4.2rem;
  --size-cat: 6.2rem; // title
  --size-dog: 8.6rem;
  --size-pony: 13rem; // large title
  --size-horse: 20rem;

  --size-gutter: var(--size-rat);
  --size-design-bezel: var(--size-dog);
  --size-design-bezel--wide: var(--size-horse);
  --size-stack: var(--size-dog);

  --color-black: #000;
  --color-white: #fff;

  --color-text: var(--color-black);
  --color-text--inverted: var(--color-white);

  --color-layout--background: var(--color-white);
  --color-layout--background-inverted: var(--color-black);
}

// 2) Tools


// 3) Generic

@import 'modern-css-reset/dist/reset';

@font-face {
  font-family: MatterSQ;
  src: url("~assets/fonts/MatterSQTRIAL-Regular.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: MatterSQ;
  src: url("~assets/fonts/MatterSQTRIAL-SemiBold.otf") format("opentype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: MatterSQ;
  src: url("~assets/fonts/MatterSQTRIAL-Heavy.otf") format("opentype");
  font-weight: 900;
  font-style: normal;
}

// 4) Elements

:root {
  font-size: screen-ratio-mix(
    .3, // 20% of the the font-size is relative to the screen width
    1440, // artboard width
    10, // target PX size (base font-size in the design)
    // 10px as a base so 1rem would be around 10px
  );
}

body {
  @include typo('default');
  background: var(--color-layout--background);
}

// 5) Objects
.l-design-width {
  padding: var(--size-design-bezel);
}

.l-design-width--wide {
  padding: var(--size-design-bezel--wide);
}

.l-grid {
  --size-gutter-x: var(--size-gutter);
  --size-gutter-y: calc(var(--size-gutter) * 0.5);

  display: flex;
  width: calc(100% + var(--size-gutter-x));
  margin-left: calc(-1 * var(--size-gutter-x));
  margin-bottom: calc(-1 * var(--size-gutter-y));
  flex-wrap: wrap;
  padding: 0;

  &__cell {
    flex: 1 0 auto;

    margin-left: var(--size-gutter-x);
    margin-bottom: var(--size-gutter-y);
    box-sizing: border-box;

    @include grid__cell();
    @each $breakpoint-name, $breakpoint-value in $grid-breakpoints {
      @include bp($breakpoint-name) {
        @include grid__cell($breakpoint-name: $breakpoint-value);
      }
    }

    &--align-right {
      display: flex;
      justify-content: flex-end;
    }

    &--align-bottom {
      display: flex;
      align-items: flex-end;
    }

    &--align-centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--break {
      flex-grow: 1;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }

  &--no-gap {
    --size-gutter: 0rem; //sass-lint:disable-line zero-unit Needed because otherwise calc does not work with %
    --size-gutter-x: var(--size-gutter);
    --size-gutter-y: var(--size-gutter);
  }
}

// 6) Components

.c-design {
  color: var(--color-text);
  background: var(--color-layout--background);
}
.c-design--inverted {
  color: var(--color-text--inverted);
  background: var(--color-layout--background-inverted);
}

// generic font classes

$textStyles: map-get($dialog-typo, $grid-default-breakpoint);

@each $textStyleName, $textStyle in $textStyles {
  .t-#{$textStyleName} {
    @include typo($textStyleName);

    margin-top: 1em;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
