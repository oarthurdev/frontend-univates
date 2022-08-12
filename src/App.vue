<template>
  <main-layout></main-layout>
</template>

<script>
import { defineComponent } from "vue";
import MainLayout from "./layouts/MainLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    "main-layout": MainLayout,
  },
});
</script>
