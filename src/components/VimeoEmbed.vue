<script>
  import Player from '@vimeo/player';

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
        // Mute videos by default
        muted: true,
        playing: false,
        showThumbnail: true,
      };
    },
    computed: {
      isMuted () {
        return this.$store.state.isMuted || this.muted;
      },
      soundEnabled () {
        return this.video.hasSound;
      },
      embedUrl () {
        let url = `https://player.vimeo.com/video/${this.video.vimeoId}?`;
        if (this.video.hash) {
          url += `h=${this.video.hash}&`;
        }
        return url + 'background=1';
      },
    },
    watch: {
      isMuted () {
        if (!this.soundEnabled) {
          return;
        }
        if (!this.isMuted) {
          this.$nuxt.$emit('mute-videos', this.video.vimeoId);
        }
        if (this.player) {
          this.player.setMuted(this.isMuted);
        }
      },
    },
    created () {
      this.$nuxt.$on('mute-videos', this.onUnmuteOtherVideo);
    },
    beforeDestroy () {
      if (this.player) {
        this.player.destroy();
      }
      this.$nuxt.$off('mute-videos', this.onUnmuteOtherVideo);
    },
    methods: {
      initVideo () {
        this.loaded = true;
        this.$nextTick(() => {
          this.player = new Player(this.$refs.video);
          this.player.on('play', () => {
            this.playing = true;
            setTimeout(() => {
              this.showThumbnail = false;
            }, 1000);
          });
        });
      },

      toggleMute () {
        this.muted = !this.isMuted;
        this.$store.commit('setMuteState', this.muted);
      },

      onUnmuteOtherVideo (unmutedVideoId) {
        if (unmutedVideoId !== this.video.vimeoId) {
          this.muted = true;
        }
      },

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
      throttle: 500,
      throttleOptions: {
        leading: 'visible',
      },
    }"
    class="vimeoEmbed"
    :style="{
      paddingBottom: (video.height / video.width * 100) + '%',
    }"
  >
    <button
      v-if="soundEnabled"
      aria-label="Toggle video sound"
      class="vimeoEmbed__unmute"
      @click="toggleMute"
    >
      <Unmute />
    </button>
    <ResponsiveImage
      v-if="video.thumbImage"
      class="vimeoEmbed__thumb"
      :image="video.thumbImage"
      :style="{
        opacity: showThumbnail ? 1 : 0,
      }"
    />
    <iframe
      v-if="loaded"
      ref="video"
      class="vimeoEmbed__iframe"
      :src="loaded ? embedUrl : null"
      width="100%"
      height="100%"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    />
  </div>
</template>

<style scoped lang="scss">
.vimeoEmbed {
  position: relative;
  background-size: 100% auto;
  background-position: 50% 50%;
}

.vimeoEmbed__iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: -1px;
  right: -1px;
}

.vimeoEmbed__thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vimeoEmbed__unmute {
  opacity: 1;
  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
  z-index: 99;
  outline: none;
  cursor: pointer;
  transition: 200ms opacity linear;

  .icon-unmute {
    width: 2.4rem;
    height: 2.4rem;

    @include bp('phone') {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
}
</style>
