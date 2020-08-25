<script>
export default {
  props: {
    fields: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    {{ fields.body }}
    {{ fields.caption }}
  </div>
</template>
