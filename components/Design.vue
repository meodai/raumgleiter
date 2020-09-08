<script>
  export default {

  };
</script>

<template>
</template>

<style lang="scss">
@use 'sass:map';

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

//
// Mixes the base-font-size with a given view-width ratio
//
// $screenWidthRatio: @float [0-1] .1 means 10% of the font size is relative to the browser width
// $designWidth: @int reference resolution, mostly the width of the sketch / photoshop file or the current breakpoint
// $targetPXSize: @int PX value at $designWidth
//
// @return @string calc that mixes VW with %
// because we mix it with % it only works for font-sizes
//

// 1) Settings

$grid-fractions: (
  '1\\/1': 1/1,
  '1\\/2': 1/2,
  '1\\/3': 1/3,
  '2\\/3': 2/3,
  '1\\/4': 1/4,
  '3\\/4': 3/4,
  '1\\/5': 1/5,
  '2\\/5': 2/5,
  '3\\/5': 3/5,
  '1\\/6': 1/6,
  '1\\/8': 1/8,
  '6\\/8': 6/8,
);

// add cell 1 - 24 aliases
//@for $i from 1 through 24 {
//  $grid-fractions: map-merge($grid-fractions, ($i: $i/24));
//}

// needed breakpoints for grid cell modifier classes (actual breakpoint: modifier class)
$grid-breakpoints: (
  'tablet': 'tablet',
  'phone': 'phone',
);

// desktop or mobile first
$grid-default-breakpoint: 'desktop';

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

$dialog-typo: (
  desktop: (
    default: (
      font-size: 2.2rem,
      font-family: unquote('MatterSQ, -apple-system, sans-serif'),
      font-weight: 300,
      line-height: 1.22,
      color: var(--color-text),
    ),
    title: (
      font-size: var(--size-mouse),
      font-weight: 900,
    ),
    title--page: (
      font-size: var(--size-cat),
      line-height: 1.12,
      font-weight: 900,
    ),
    title--hero: (
      font-size: var(--size-pony),
      line-height: 1.12,
      font-weight: 900,
    ),
    lead: (
      font-size: var(--size-mouse),
      font-weight: bold,
    ),
    paragraph: (
      font-size: 2.2rem,
      font-weight: 300,
      line-height: 1.22,
    )
  ),
  phone: (
    default: (
      font-size: 1.8rem,
      line-height: 1.3,
    ),
  )
);

$dialog-breakpoints: (
  desktop: 'min-width: 769px',
  tablet: 'max-width: 768px',
  phone: 'max-width: 415px'
);

// 2) Tools

@mixin bp($name) {
  @if map-has-key($dialog-breakpoints, $name) {
    @media (#{map-get($dialog-breakpoints, $name)}) {
      @content;
    }
  } @else {
    @error 'there is no breakpoint called #{$name}';
  }
}

@import 'dialog-typography/dist/dialog-typography';

@function screen-ratio-mix(
  $screen-width-ratio: 0.1, // adds 10% of screen-width
  $design-width: 1440, // the target width (artboard width)
  $target-px-size: 10 // target size in PX
) {
  $percent-size: $target-px-size / 16% * 100%;
  @return calc(#{$percent-size - $percent-size * $screen-width-ratio}% + #{$screen-width-ratio * (100 / $design-width) * 10}vw);
}

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
  font-size: 2.2rem;
  line-height: 1.22;
  background: var(--color-layout--background);
}

// 5) Objects
.l-design-width {
  padding: var(--size-design-bezel);
}

.l-design-width--wide {
  padding: var(--size-design-bezel--wide);
}

// sass-lint:disable space-around-operator, mixin-name-format, function-name-format, mixins-before-declarations
/*!
FIRST OF ALL
- CSS grids are great for building the bigger picture. They makes it really easy to manage the layout of the page, and can even handle more unorthodox and asymmetrical designs.
- Flexbox is great at aligning the content inside elements. Use flex to position the smaller details of a design.
- Use CSS grids for 2D layouts (rows AND columns).
- Flexbox works better in one dimension only (rows OR columns).
- There is no reason to use only CSS grids or only flexbox. Learn both and use them together.
CODE EXAMPLES
- zweite, 3. und 4. Spalte
    - grid-column: 2 / span 3
    - grid-column-start: 2; grid-column-end: span 3;
    - grid-column: 2 / 5
- grid-row-start und -end gibt es auch --> alle 5 Zeilen, 1 Spalte Offset und 4 Spalten umfasst
    - grid-row: 1/6; grid-column: 2/6;
- grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end
- order definieren wenn Markup Aufteilung vorgibt
    - order beginnt bei 0
    - darf auch negativ definiert werden z.B. order: -1;
BROWSER SUPPORT
- CSS Grid does not support all browsers
- use width and % for unsupported browsers
*/

// grid cell mixin
@mixin grid__cell($breakpoint-name: null) {
  @each $fraction-key, $fraction-value in $grid-fractions {
    $selector: --#{$fraction-key};

    @if ($breakpoint-name) {
      $selector: --#{$fraction-key}\@#{$breakpoint-name};
    }

    &#{$selector} {
      width: calc(#{$fraction-value * 100% / 10% * (10% - 0.0095%)} - var(--size-gutter-x));
      flex: 0 0 auto;
    }

    &--push#{$selector} {
      margin-left: calc(#{$fraction-value * 100% / 10% * (10% - 0.0095%)} + var(--size-gutter-x));
    }

    &--pull#{$selector} {
      margin-right: calc(#{$fraction-value * 100% / 10% * (10% - 0.0095%)} + var(--size-gutter-x));
    }
  }

  $selector: '--none';

  @if ($breakpoint-name) {
    $selector: --#{'none'}\@#{$breakpoint-name};
  }

  &--push#{$selector} {
    left: 0;
  }

  &--pull#{$selector} {
    right: 0;
  }

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

$textStyles: map.get($dialog-typo, $grid-default-breakpoint);

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
