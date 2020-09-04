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
  4) Base:                 Un-classed HTML elements (type selectors).
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

@function screen-ratio-mix(
  $screen-width-ratio: 0.1, // adds 10% of screen-width
  $design-width: 1440, // the target width (artboard width)
  $target-px-size: 10 // target size in PX
) {
  $percent-size: $target-px-size / 16% * 100%;
  @return calc(#{$percent-size - $percent-size * $screen-width-ratio}% + #{$screen-width-ratio * (100 / $design-width) * 10}vw);
}

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

:root {
  font-size: screen-ratio-mix(
    .3, // 20% of the the font-size is relative to the screen width
    1440, // artboard width
    10, // target PX size (base font-size in the design)
    // 10px as a base so 1rem would be around 10px
  );
}

html, body {
  margin: 0;
  padding: 0;
}

html {

  font-family:
    MatterSQ,
    -apple-system,
    sans-serif;
}

body {
  font-size: 2.2rem;
  line-height: 1.22;
}

.t-title {
  font-weight: bold;
}

.t-title--main {

}
</style>
