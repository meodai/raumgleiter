<script>
/**
 * Lead Text
 *
 * ein Titel, zwei Textblöcke, optional mit "Angebots"-Listen
 *
 *
  fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,
    body: 'plaintext' || null,
    offers: []
    // or:
    offers: [
      {
        header: 'plaintext' || null,
        services: ['plaintext', 'plaintext', ...],
      },
      ...
    ]
  };
 *
 */
import Offers from './Offers';
export default {
  name: 'LeadText',
  components: {
    Offers,
  },
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
      <h1>{{ fields.header }}</h1>
      <p>{{ fields.lead }}</p>
      <p>{{ fields.body }}</p>
      <!-- Angebot Liste -->
      <Offers
        v-for="(offers, index) in fields.offers"
        :bind="'offers'+index"
        :fields="offers"
      />
    </div>
</template>
