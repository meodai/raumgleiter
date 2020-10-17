<script>

  export default {
    props: {
      video: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        player: null,
        loaded: false,
        // muted: true,
        playing: false,
      };
    },
    mounted () {

    },
    beforeDestroy () {
      if (this.player) {
        this.player.destroy();
      }
    },
    methods: {
      initVideo () {
        this.loaded = true;
        this.$nextTick(() => {
          this.player = new Vimeo.Player(this.$refs.video);
          this.player.on('play', () => {
            this.playing = true;
          // canAutoPlay
          //   .video({timeout: 100, muted: false})
          //   .then(({result, error}) => {
          //     if(result)
          //       this.player.setMuted(false);
          //     }
          //   })
          });
        });
      },

      // toggleMute () {
      //   this.muted = !this.muted;
      //   this.player.setMuted(this.muted);
      // },

      visibilityChanged (isVisible) {
        if (!this.loaded) {
          if (isVisible) {
            this.initVideo();
          }
        } else if (!isVisible && this.playing) {
          this.player.pause();
        } else if (isVisible) {
          this.player.play();
        }
      },
    },
  };
</script>

<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 300,
      throttleOptions: {
        leading: 'visible',
      },
    }"
    class="vimeoEmbed"
    :style="{
      paddingBottom: (video.height / video.width * 100) + '%',
      backgroundImage: loaded ? 'url(' + video.thumbnail + ')' : null,
    }"
  >
    <!-- TODO: video thumbnail -->
    <!-- <div class="vimeoEmbed__iframe" :style="{ backgroundImage: 'url(' + video.thumbnail + ')' }"></div>-->
    <iframe
      v-if="loaded"
      ref="video"
      class="vimeoEmbed__iframe"
      :src="loaded ? `https://player.vimeo.com/video/${video.vimeoId}?background=1` : null"
      width="100%"
      height="100%"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    />
    <!--    <button @click="toggleMute">mute</button>-->
  </div>
</template>

<style scoped>
.vimeoEmbed {
  position: relative;
}

.vimeoEmbed__iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
