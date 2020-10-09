<script>
/**
 fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,

    textBlocks: [
      {
        header: 'plaintext' || null,
        body: 'plaintext' || null,
      },
      { ... }
    ],
 *
 */
  export default {
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },
    computed: {
      firstBlock() {
        return this.fields.textBlocks.length ? this.fields.textBlocks[0] : null
      },
      remainingTextBlocks() {
        return this.fields.textBlocks.length > 1 ? this.fields.textBlocks.slice(1) : null
      },
    }
  };
</script>

<template>
  <div>
    <h3>{{fields.header}}</h3>
    <p>{{fields.lead}}</p><br>
    <br><br><br>

    <template v-for="textBlock in fields.textBlocks">
      <h4>{{textBlock.header}}</h4>
      <p>{{textBlock.body}}</p>
      <br>
    </template>
  </div>
</template>
