<script>
export default {
  methods: {
    unmute() {
      let player = new Vimeo.Player(this.$refs.video);
      player.setMuted(false);
    }
  }
}
</script>

<template>
  <div>

    <iframe ref="video" src="https://player.vimeo.com/video/76979871?background=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

    <button @click="unmute">unmute</button>

  </div>
</template>
