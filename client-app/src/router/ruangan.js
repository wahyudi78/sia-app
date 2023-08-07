import { createRouter, createWebHistory } from "vue-router";

import RuanganIndex from "../views/ruangan/index.vue";
import RuanganCreate from "../views/ruangan/Create.vue";
import RuanganUpdate from "../views/ruangan/Update.vue";
const routes = [
  // ruangan
  {
    path: "/ruangan",
    name: "index.ruangan",
    component: RuanganIndex,
  },
  {
    path: "/ruangan-add",
    name: "create.ruangan",
    component: RuanganCreate,
  },
  {
    path: "/ruangan-update/:id",
    name: "update.ruangan",
    component: RuanganUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
