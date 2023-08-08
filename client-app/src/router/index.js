import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";
import MapelIndex from "../views/mapel/index.vue";
import MapelCreate from "../views/mapel/Create.vue";
import MapelUpdate from "../views/mapel/Update.vue";
import RuanganIndex from "../views/ruangan/index.vue";
import RuanganCreate from "../views/ruangan/Create.vue";
import RuanganUpdate from "../views/ruangan/Update.vue";
import NilaiIndex from "../views/nilai/index.vue";
import NilaiCreate from "../views/nilai/Create.vue";
import NilaiUpdate from "../views/nilai/Update.vue";
import AbsensiIndex from "../views/absensi/index.vue";
import AbsensiCreate from "../views/absensi/Create.vue";
import AbsensiUpdate from "../views/absensi/Update.vue";
import DashboardIndex from "../views/dashboard/index.vue";
import DashboardCreate from "../views/dashboard/Create.vue";
import DashboardUpdate from "../views/dashboard/Update.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      beforeEnter: guardMyroute,
      redirect: { name: "index.login" },
      // component: Login,
    },
    {
      path: "/login",
      name: "index.login",
      // beforeEnter : guardMyroute(),

      component: Login,
    },

    // Dashboard
    {
      path: "/dashboard",
      name: "index.dashboard",
      beforeEnter: guardMyroute,

      component: DashboardIndex,
    },
    {
      path: "/dashboard-add",
      name: "create.dashboard",
      beforeEnter: guardMyroute,

      component: DashboardCreate,
    },
    {
      path: "/dashboard-update/:id",
      name: "update.dashboard",
      beforeEnter: guardMyroute,

      component: DashboardUpdate,
    },

    // mapel
    {
      path: "/mapel",
      name: "index.mapel",
      beforeEnter: guardMyroute,
      component: MapelIndex,
    },
    {
      path: "/mapel-add",
      name: "create.mapel",
      beforeEnter: guardMyroute,
      component: MapelCreate,
    },
    {
      path: "/mapel-update/:id",
      name: "update.mapel",
      beforeEnter: guardMyroute,
      component: MapelUpdate,
    },
    // Ruangan
    {
      path: "/ruangan",
      name: "index.ruangan",
      beforeEnter: guardMyroute,

      component: RuanganIndex,
    },
    {
      path: "/ruangan-add",
      name: "create.ruangan",
      beforeEnter: guardMyroute,

      component: RuanganCreate,
    },
    {
      path: "/ruangan-update/:id",
      name: "update.ruangan",
      beforeEnter: guardMyroute,

      component: RuanganUpdate,
    },

    // Nilai
    {
      path: "/nilai",
      name: "index.nilai",
      beforeEnter: guardMyroute,

      component: NilaiIndex,
    },
    {
      path: "/nilai-add",
      name: "create.nilai",
      beforeEnter: guardMyroute,

      component: NilaiCreate,
    },
    {
      path: "/nilai-update/:id",
      name: "update.nilai",
      beforeEnter: guardMyroute,

      component: NilaiUpdate,
    },
    // Absensi
    {
      path: "/absensi",
      name: "index.absensi",
      beforeEnter: guardMyroute,

      component: AbsensiIndex,
    },
    {
      path: "/absensi-add",
      name: "create.absensi",
      beforeEnter: guardMyroute,

      component: AbsensiCreate,
    },
    {
      path: "/absensi-update/:id",
      name: "update.absensi",
      beforeEnter: guardMyroute,

      component: AbsensiUpdate,
    },
  ],
});
// router.beforeEach((to) => {
//   // only redirect to 'Home'
//   // if we're not already on it
//   if (!localStorage.getItem('token')) {
//     return '/login'
//   }
// })

function guardMyroute(to, from, next) {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    next({ name: "index.login" });
  } else {
    next();
  }
}

function loginGuard(to, from, next) {
  // const token = JSON.parse( localStorage.getItem('token') );
  // if(token){
  //   next({name:'index.dashboard'})
  // }else{
  //  next()
  // }
}
export default router;
