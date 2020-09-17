<script>
import Intro from "./Intro";
import Calltoaction from "./Calltoaction";
import ImageBlock from "./ImageBlock";
import Quote from "./Quote";
export default {
  name: 'Pagebuilder',
  components: {
    Intro,
    Calltoaction,
    ImageBlock,
    Quote,
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
}
</script>

<template>
  <div>
    <component
      v-for="(block, index) in blocks"
      :key="slug+'-pagebuilder-'+index"
      :is="block.type"
      :fields="block.fields"
    >
      <!-- TODO: add classes -->
      <component
        class="intro__cta"
        v-if="block.children.length"
        v-for="(childBlock, childIndex) in block.children"
        :key="slug+'-pagebuilder-child-'+childIndex"
        :is="childBlock.type"
        :fields="childBlock.fields"
      />
    </component>
  </div>
</template>
