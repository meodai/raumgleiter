<script>
  export default {
    mounted () {
      const boot = p5 => {
        let helix = chroma.cubehelix().start(0).rotations(-2).gamma(1).hue(1).lightness([.5, .9]);
        let i = 0;
        let j = 0;
        let multi = 1;
        let currentLetter = '404';
        const $page = this.$refs.error;

        p5.setup = () => {
          const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
          cnv.parent($page);
          p5.textAlign(p5.CENTER);
          p5.fill(0);
          p5.rect(0,0,p5.windowWidth, p5.windowHeight);
        };

        p5.windowResized = () => {
          p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };

        p5.draw = () => {
          j += 0.001;
          i += 0.001 * multi;
          if(i > 1 && multi == 1) {
            multi = -1;
          } else if( i < 0 && multi == -1) {
            multi = 1;
          };
          p5.textSize(p5.map(p5.noise(j, i, 2), 0 ,1, 150, 500));
          p5.fill(helix(i).rgb());
          p5.stroke(255,80);
          p5.translate(
            p5.map(p5.noise(j, i, 2), 0 ,1, -200, p5.windowWidth + 200),
            p5.map(p5.noise(j,j,0), 0 ,1, -200, p5.windowHeight + 200)
          )
          p5.rotate(i * i * 10);
          p5.text(currentLetter,0,0);
        }
      }

      new p5(boot);
    },
    head () {
      return {
        script: [
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js',
          },
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.0.3/chroma.min.js',
          }
        ],
      };
    },
  };
</script>

<template>
  <div class="error-page" ref="error">
  </div>
</template>

<style lang="scss">
  .error-page {
    overflow: hidden;

  }
</style>
