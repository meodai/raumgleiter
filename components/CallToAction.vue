<script>
  export default {
    /**
      fields = {
        icon: 'plaintext' || null,
        header: 'plaintext' || null,
        text: 'plaintext' || null,
        contactName: 'plaintext' || null,
        phone: 'plaintext' || null,
        email: 'plaintext' || null,
        background: {}
        // or:
        background: {
          type: 'video',
          mp4: 'https://url-to-video.mp4',
        }
        // or:
        background: {
          type: 'image',
          image: {
            // image object
            width, height, srcSet, ....
          },
      }
    */
    props: {
      fields: {
        type: Object,
        required: true,
      },
    },
    computed: {
      showFirstRow () {
        return this.fields.icon || this.fields.header;
      },
      showSecondRow () {
        return this.fields.contactName || this.fields.phone || this.fields.email;
      },
    },
  };
</script>

<template>
  <article
    v-if="showFirstRow || showSecondRow"
    class="calltoaction"
    aria-label="Contact Us"
    :class="{'calltoaction--fullwidth': fields.fullwidth}"
  >
    <div class="calltoaction__content">
      <aside
        v-if="showFirstRow"
        class="calltoaction__first"
      >
        <Icon
          v-if="fields.icon"
          class="calltoaction__icon"
          :name="fields.icon"
          :is-block="true"
        />
        <h3 v-if="fields.header" class="calltoaction__title">
          {{ fields.header }}
        </h3>
        <p class="calltoaction__content">
          {{ fields.text }}
        </p>
      </aside>
      <aside
        v-if="showSecondRow"
        class="calltoaction__second"
      >
        <Icon
          class="calltoaction__icon"
          name="communication"
          :is-block="true"
        />
        <h3 v-if="fields.contactName" class="calltoaction__title">
          {{ fields.contactName }}
        </h3>
        <p class="calltoaction__content">
          <a v-if="fields.phone" :href="'tel:'+fields.phone">{{ fields.phone }}</a>
          <a v-if="fields.email" :href="'mailto:'+fields.email">{{ fields.email }}</a>
        </p>
      </aside>
    </div>
  </article>
</template>

<style lang="scss">
  .calltoaction--fullwidth {
    display: flex;
    vertical-align: middle;
    padding-top: 15rem;
    padding-bottom: 30rem;

    .calltoaction__content {
      margin: 0 auto;
    }
  }

  .calltoaction__icon {
    margin-bottom: 0.5rem;
  }

  .calltoaction__second {
    margin-top: var(--size-gutter);
    margin-left: 20%;
  }

  .calltoaction__content {
    margin-top: 0.1em;
  }
</style>
