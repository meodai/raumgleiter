<script>
import Intro from "./Intro";
export default {
  name: 'Pagebuilder',
  components: {
    Intro,
  },
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      default: '',
    },
  },
  computed: {
    supportedBlocks() {
      return this.blocks.filter(block => [
        'intro',
      ].includes(block.type))
    }
  }
}
</script>

<template>
  <div>
    <component
      v-for="(block, index) in supportedBlocks"
      :key="slug+'-pagebuilder-'+index"
      :is="block.type"
      :fields="block.fields"
    />
  </div>
</template>
