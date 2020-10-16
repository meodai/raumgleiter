<script>
  import Intro from './Intro';
  import CallToAction from './CallToAction';
  import ImageBlock from './ImageBlock';
  import Quote from './Quote';
  import OfferGridImages from './OfferGridImages';
  import OfferGridText from './OfferGridText';
  import Related from './Related';
  export default {
    name: 'Pagebuilder',
    components: {
      Intro,
      CallToAction,
      ImageBlock,
      Quote,
      OfferGridImages,
      OfferGridText,
      Related,
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
  };
</script>

<template>
  <div>
    <component
      :is="block.type"
      v-for="(block, index) in blocks"
      :key="slug+'-pagebuilder-'+index"
      :fields="block.fields"
    >
      <component
        :is="childBlock.type"
        v-for="(childBlock, childIndex) in block.children"
        :key="slug+'-pagebuilder-child-'+childIndex"
        :class="{ 'intro__cta': childBlock.type === 'callToAction' }"
        :fields="childBlock.fields"
      />
    </component>
  </div>
</template>
