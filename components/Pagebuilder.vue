<script>
import Intro from "./Intro";
import CallToAction from "./CallToAction";
import ImageBlock from "./ImageBlock";
import Quote from "./Quote";
import OfferGridImages from "./OfferGridImages";
import OfferGridText from "./OfferGridText";
export default {
  name: 'Pagebuilder',
  components: {
    Intro,
    CallToAction,
    ImageBlock,
    Quote,
    OfferGridImages,
    OfferGridText,
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
