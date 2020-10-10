<script>
/**
 fields = {
    header: 'plaintext' || null,
    lead: 'plaintext' || null,
    linkText: 'plaintext' || null,

    items: [
      {
        caption: 'plaintext' || null,
        images: [
          {image}, {image}
        ],
        video: {
          mp4: 'https://url-to-video.mp4'
        },
        // either images is []
        // or video is null
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
  <div class="offer-grid l-design-width">
    <h3>{{ fields.header }}</h3>
    <p>{{ fields.lead }}</p>
    <a href="#">{{ fields.linkText }}</a>

    <template v-for="(item, i) in fields.items">
      <figure :key="i">
        <ResponsiveImage v-if="item.images.length" :image="item.images[0]" />
        <figcaption>{{ item.caption }}</figcaption>
      </figure>
    </template>
  </div>
</template>
