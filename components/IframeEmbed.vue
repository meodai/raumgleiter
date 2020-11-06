<script>
  export default {
    props: {
      iframe: {
        type: Object,
        required: true,
      },
      title: {
        type: String,
        default: 'Showcase',
      },
    },
  };
</script>

<template>
  <div
    class="iframeEmbed"
  >
    <iframe
      :title="title"
      class="iframeEmbed__iframe lazyload"
      :data-src="iframe.url"
      width="100%"
      height="100%"
      frameborder="0"
      allow="fullscreen"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.iframeEmbed {
  position: relative;
  padding-bottom: 56.25%;
}

.iframeEmbed__iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
