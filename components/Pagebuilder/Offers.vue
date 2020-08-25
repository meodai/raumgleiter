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
    <h3>{{ fields.header }}</h3>
    <ul>
      <li v-for="service in fields.services">
        {{ service }}
      </li>
    </ul>
  </div>
</template>
