<template>
  <div>
    <Design />
    <Navigation v-if="!$config.livePreview" />
    <Nuxt />
    <Icons />
    <PreviewScrollPosition v-if="$config.livePreview" />
  </div>
</template>
