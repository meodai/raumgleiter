<script>
import LeadText from './Pagebuilder/LeadText';
import Offers from './Pagebuilder/Offers';
import IntroText from './Pagebuilder/IntroText';
export default {
  name: 'Pagebuilder',
  components: {
    LeadText,
    Offers,
    IntroText,
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
    />
  </div>
</template>
