<script>
/**
 fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,
    firstParagraphHeader: 'plaintext' || null,
    firstParagraphBody: 'plaintext' || null,
    linkText: 'plaintext' || null,

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
  };
</script>

<template>
  <div>
    <h3>{{fields.header}}</h3>
    <p>{{fields.lead}}</p><br>
    <h4>{{fields.firstParagraphHeader}}</h4>
    <p>{{fields.firstParagraphBody}}</p>
    <a href="#">{{fields.linkText}}</a>
    <br><br><br>

    <template v-for="textBlock in fields.textBlocks">
      <h4>{{textBlock.header}}</h4>
      <p>{{textBlock.body}}</p>
      <br>
    </template>
  </div>
</template>
