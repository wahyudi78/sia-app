<script setup>
import Navbar from "./components/Navbar.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter().path;
// const route = useRoute();

localStorage.setItem("url", JSON.stringify("http://127.0.0.1:8000/api/"));
// localStorage.setItem( 'url', JSON.stringify('https://dev-code.my.id/sia/public/api/') );
</script>
<template>
  <Navbar v-if="useRoute().name != 'index.login'" />
  <h1>{{ router }}</h1>
  <router-view></router-view>
</template>
