<template>
  <div class="video-teaser-container">
    <client-only>
      <slot />
    </client-only>
  </div>
</template>

<style>
  .video-teaser-container {
    width: 100%;
    height: 100vh;
    background-color: var(--color-layout--background-inverted);
  }
</style>
