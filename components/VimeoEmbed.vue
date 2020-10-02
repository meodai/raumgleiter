<script>

export default {
  data() {
    return {
      player: null,
      loaded: false,
      muted: true,
      playing: false,
    }
  },
  mounted() {

  },
  methods: {
    initVideo() {
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

    toggleMute() {
      this.muted = !this.muted;
      this.player.setMuted(this.muted);
    },

    visibilityChanged(isVisible) {
      if(!this.loaded) {
        if(isVisible) {
          this.initVideo();
        }
        return;
      }

      if(!isVisible && this.playing) {
        this.player.pause();
        // todo: unmute?
      } else if(isVisible) {
        this.player.play();
      }
    },
  }
}
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
  >

    <iframe v-if="loaded" ref="video" :src="loaded ? 'https://player.vimeo.com/video/76979871?background=1' : null"
            width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

    <button @click="toggleMute">mute</button>

  </div>
</template>
