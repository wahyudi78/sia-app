import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import routes from "./routes";

const user = JSON.parse(localStorage.getItem("datauser"));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (!localStorage.getItem("datauser") && to.name !== "login") {
    // redirect the user to the login page
    return { name: "login" };
  }
  if (localStorage.getItem("datauser") && to.name == "login") {
    // redirect the user to the login page
    return { name: "home" };
  }
});

export default router;
