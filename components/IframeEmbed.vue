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
    data () {
      return {
        interactive: false,
      };
    },
    methods: {
      allowInteractions () {
        this.interactive = true;
      },
    },
  };
</script>

<template>
  <div
    class="iframeEmbed"
  >
    <div
      class="iframeEmbed__overlay"
      :class="{'iframeEmbed__overlay--hidden': interactive}"
      @click="allowInteractions()"
    >
      <Icon
        :name="iframe.icon || 'experience'"
        class="iframeEmbed__overlayIcon"
      />
    </div>
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

.iframeEmbed__overlay {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: var(--color-layout--backdrop);
  cursor: pointer;

  justify-content: center;
  align-items: center;
  color: var(--color-text--inverted);
}

.iframeEmbed__overlayIcon {
  stroke: none;
}

.iframeEmbed__overlay--hidden {
  display: none;
}

.iframeEmbed__overlay > span {
  color: var(--color-text--inverted);
}
</style>
