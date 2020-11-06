<script>
  export default {
    created () {
      this.$store.dispatch('nuxtServerInit');
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        if (process.client) {
          const P5 = require('p5');
          const chroma = require('chroma-js');

          const boot = (p5) => {
            const helix = chroma.cubehelix().start(0).rotations(-1).gamma(1).hue(2).lightness([0.2, 0.7]);
            let i = 0;
            let j = 0;
            let multi = 1;
            const currentLetter = '404';
            const $page = this.$refs.error;

            p5.setup = () => {
              const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
              cnv.parent($page);
              p5.textFont('MatterSQ');
              p5.textStyle(p5.BOLD);
              p5.textAlign(p5.CENTER);
              p5.fill(0);
              p5.rect(0, 0, p5.windowWidth, p5.windowHeight);
            };

            p5.windowResized = () => {
              p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
            };

            p5.draw = () => {
              j += 0.001;
              i += 0.001 * multi;
              if (i > 1 && multi === 1) {
                multi = -1;
              } else if (i < 0 && multi === -1) {
                multi = 1;
              };
              p5.textSize(p5.map(p5.noise(j, i, 2), 0, 1, 150, 500));
              p5.fill(helix(i).rgb());
              p5.stroke(255, 80);
              p5.translate(
                p5.map(p5.noise(j, i, 2), 0, 1, -200, p5.windowWidth + 200),
                p5.map(p5.noise(j, j, 0), 0, 1, -200, p5.windowHeight + 200),
              );
              p5.rotate(i * i * 10);
              p5.text(currentLetter, 0, 0);
            };
          };

          // eslint-disable-next-line no-new
          new P5(boot);
        }
      },
      head () {
        return {
          title: 'Page not found',
        };
      },
    },
  };
</script>

<template>
  <div>
    <div ref="error" class="error-page" />
  </div>
</template>

<style lang="scss">
  .error-page {
    max-height: 100vh;
    overflow: hidden;
    background-color: var(--color-layout--background-inverted);
  }
</style>
