<template>
  <SideNav />
  <div class="flex-1">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Main from "./pages/Main.vue";
import SideNav from "./components/SideNav.vue";

export default defineComponent({
  name: 'App',
  components: { SideNav, Main }
});
</script>

<style>
/* add your tailwind styles here */
</style>