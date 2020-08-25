<script>
import IntroText from './Pagebuilder/IntroText';
import Offers from './Pagebuilder/Offers';
import Quote from './Pagebuilder/Quote';
export default {
  name: 'Pagebuilder',
  components: {
    IntroText,
    Offers,
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
    />
  </div>
</template>
