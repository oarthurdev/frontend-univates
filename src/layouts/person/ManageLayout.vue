<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="margin-left">
      <main-layout />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainLayout from "../MainLayout.vue";

export default {
  components: {
    "main-layout": MainLayout,
  },
  setup() {
    return {};
  },
};
</script>
