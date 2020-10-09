<script>
  import { throttle } from 'throttle-debounce';

  export default {
    mounted () {
      if (this.$config.livePreview) {
        const storageKey = `scrollPosition:${this.$route.path}`;

        setTimeout(() => {
          // If scroll position is set, scroll to it
          if (sessionStorage.getItem(storageKey)) {
            window.scrollTo(0, parseInt(sessionStorage.getItem(storageKey)));
          }

          // Record scroll position in session storage to retain scroll position in Live Preview
          setTimeout(() => {
            window.addEventListener('scroll', throttle(200, function () {
              sessionStorage.setItem(storageKey, window.scrollY);
            }));
          }, 1000);
        }, 200);
      }
    },
  };
</script>

<template>
  <div />
</template>
