// import './assets/main.css'

import "./assets/jquery/jquery.min.js";
import "./assets/sb-admin-2.css";
// import "./assets/bootstrap/js/bootstrap.bundle.js";
import "./assets/sb-admin-2";
import "./assets/fontawesome-free/css/all.min.css";
import "vue-search-select/dist/VueSearchSelect.css";
// import "./assets/jquery-global.js";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import $ from "jquery";

const app = createApp(App);

app.use(router, $);

app.mount("#app");
