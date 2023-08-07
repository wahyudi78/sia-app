import { createRouter, createWebHistory } from "vue-router";

import MapelIndex from "../views/mapel/index.vue";
import MapelCreate from "../views/mapel/Create.vue";
import MapelUpdate from "../views/mapel/Update.vue";
const routes = [
  // ruangan
  {
    path: "/mapel",
    name: "index.mapel",
    component: MapelIndex,
  },
  {
    path: "/mapel-add",
    name: "create.mapel",
    component: MapelCreate,
  },
  {
    path: "/mapel-update/:id",
    name: "update.mapel",
    component: MapelUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
