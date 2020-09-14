<script>
export default {
  name: 'Pagebuilder',
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
