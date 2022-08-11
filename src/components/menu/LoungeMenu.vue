<template>
    <q-list>
        <q-item
        clickable
            tag="a"
            target="_blank"
            :href="link">
            <q-item-section
            v-if="icon"
            avatar
            >
            <q-icon :name="icon" />
        </q-item-section>
        <q-item-section >
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
        {{ caption }}
        </q-item-label>
    </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
export default {
  name: 'LoungeMenu',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>