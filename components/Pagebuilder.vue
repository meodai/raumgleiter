<script>
import Intro from "./Intro";
import Calltoaction from "./Calltoaction";
export default {
  name: 'Pagebuilder',
  components: {
    Intro,
    Calltoaction,
  },
  props: {
    blocks: {
      type: Array|Object,
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
      <component
        v-if="block.children.length"
        v-for="(childBlock, childIndex) in block.children"
        :key="slug+'-pagebuilder-child-'+childIndex"
        :is="childBlock.type"
        :fields="childBlock.fields"
      />
    </component>
  </div>
</template>
