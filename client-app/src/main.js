// import './assets/main.css'

import "./assets/sb-admin-2.css";
import "./assets/jquery/jquery.min.js";
import "./assets/bootstrap/js/bootstrap.bundle.js";
import "./assets/sb-admin-2";
import "./assets/fontawesome-free/css/all.min.css";
import 'vue-search-select/dist/VueSearchSelect.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
