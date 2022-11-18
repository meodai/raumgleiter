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
    <div
      v-for="(block, index) in blocks"
      :key="slug+'block'+index+block.type"
    >
      <component
        :is="block.type"
        :fields="block.fields"
      >
        <div
          v-for="(childBlock, childIndex) in block.children"
          :key="slug+'block'+index+block.type+'-'+childIndex+childBlock.type"
        >
          <component
            :is="childBlock.type"
            :class="{ 'intro__cta': childBlock.type === 'callToAction' }"
            :fields="childBlock.fields"
          ></component>
        </div>
      </component>
    </div>
<!--    <component-->
<!--      :is="block.type"-->
<!--      v-for="(block, index) in blocks"-->
<!--      :key="slug+'-pagebuilder-'+index+'-'+block.type"-->
<!--      :fields="block.fields"-->
<!--    >-->
<!--      <component-->
<!--        :is="childBlock.type"-->
<!--        v-for="(childBlock, childIndex) in block.children"-->
<!--        :key="slug+'-pagebuilder-child-'+index+'-'+childIndex+'-'+block.type"-->
<!--        :class="{ 'intro__cta': childBlock.type === 'callToAction' }"-->
<!--        :fields="childBlock.fields"-->
<!--      />-->
<!--    </component>-->
  </div>
</template>
