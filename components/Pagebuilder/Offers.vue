<script>
/**
 * angebots-Liste
 *
 * ein Titel, eine Liste von Angeboten
 *
 *
 fields = {
  header: 'plaintext' || null,
  services: ['plaintext', 'plaintext', ...],
 };
 *
 */
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
      <li
        v-for="service in fields.services"
        :key="'service'+service"
      >
        {{ service }}
      </li>
    </ul>
  </div>
</template>
