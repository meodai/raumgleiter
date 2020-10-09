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
  <div>
    <h3>{{ fields.header }}</h3>
    <p>{{ fields.lead }}</p>
    <a href="#">{{ fields.linkText }}</a>
    <br><br>
    <template v-for="item in fields.items">
      <hr>
      <figure style="max-width: 200px">
        <ResponsiveImage v-if="item.images.length" :image="item.images[0]" />
        <figcaption>{{ item.caption }}</figcaption>
      </figure>
    </template>
    <br><br>
  </div>
</template>
