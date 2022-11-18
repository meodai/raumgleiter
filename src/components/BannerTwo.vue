<script>
  export default {
    computed: {
      navHeight() {
        return this.$store.getters.getBannerStatus ? 'calc(6rem + 4.2rem)' : '6rem';
      },
      currentBannerData() {
        return this.$store.getters.getCurrentBannerData;
      },
      bannerTwoStatus() {
        return this.$store.getters.getBannerTwoStatus;
      },
      bannerWidth() {
        // Approx. map char number to size
        // Ref: https://stackoverflow.com/a/345203
        const chars = this.currentBannerData.text2.length;
        // 0.037
        const value = (chars - 2) * 0.025 + 10;
        return value + 'em';
      }
    },
  };
</script>

<template>
    <div v-if="bannerTwoStatus">
      <template v-if="currentBannerData.link2">
        <a
          :href="currentBannerData.link2"
          class="bannerTwo"
          :style="{ marginTop: navHeight, maxWidth: 'calc(30px + '+bannerWidth+')' }"
        >
          <nl2br
            tag="div"
            :text="currentBannerData.text2"
            class-name="bannerTwo__text"
          />
        </a>
      </template>
      <template v-else>
        <div
          class="bannerTwo"
          :style="{ marginTop: navHeight, maxWidth: 'calc(30px + '+bannerWidth+')' }"
        >
          <nl2br
            tag="div"
            :text="currentBannerData.text2"
            class-name="bannerTwo__text"
          />
        </div>
      </template>
    </div>
</template>

<style lang="scss">
  .bannerTwo {
    @include typo('paragraph');
    top: 2em;
    right: 2em;
    position: absolute;
    background: #e20117;
    z-index: 2;
    place-content: center;
    color: #ffffff;
    display: grid;
    border-radius: 100%;
    padding: 20px;
    aspect-ratio: 1;
    text-align: center;
    transition: transform 0.3s cubic-bezier(.55,.17,.18,.84);
    transform: scale(0.8);
  }

  .bannerTwo:hover {
    text-decoration: none;
    transform: rotate(18deg) scale(1);
  }

  .bannerTwo__text {
    @include typo('paragraph');
    word-break: normal;
    hyphens: none;
  }

  @include bp('phone') {
    .bannerTwo {
      right: auto;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .bannerTwo:hover {
      transform: translate(-50%, -50%) rotate(18deg) scale(1.1);
    }
  }
</style>
