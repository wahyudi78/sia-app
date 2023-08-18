<script setup>
import { useRoute } from "vue-router";
import SidebarVue from "./components/Sidebar.vue";
import $ from "jquery";
const location = useRoute();
</script>

<template>
  <!-- Page Wrapper -->
  <!-- <p>{{ location.name }}</p> -->
  <div v-if="location.name === 'login'">
    <RouterView />
  </div>
  <div v-else id="wrapper">
    <SidebarVue />
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
