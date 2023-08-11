import LoginPage from "../pages/LoginPage.vue";
import Homepage from "../pages/Homepage.vue";
import MapelPage from "../pages/mapel/MapelPage.vue";
import CreateMapel from "../pages/mapel/CreateMapel.vue";
import UpdateMapel from "../pages/mapel/UpdateMapel.vue";
import RuanganPage from "../pages/ruangan/RuanganPage.vue";
import CreateRuangan from "../pages/ruangan/CreateRuangan.vue";
import UpdateRuangan from "../pages/ruangan/UpdateRuangan.vue";
import NilaiPage from "../pages/nilai/NilaiPage.vue";
import ViewNilai from "../pages/nilai/ViewNilai.vue";
import CreateNilai from "../pages/nilai/CreateNilai.vue";
import UpdateNilai from "../pages/nilai/UpdateNilai.vue";
import AbsensiPage from "../pages/AbsensiPage.vue";
import JadwalPage from "../pages/JadwalPage.vue";
import CreateSiswa from "../pages/siswa/CreateSiswa.vue";
import UpdateSiswa from "../pages/siswa/UpdateSiswa.vue";
import SiswaPage from "../pages/siswa/SiswaPage.vue";
import GuruPage from "../pages/guru/GuruPage.vue";
import CreateGuru from "../pages/guru/CreateGuru.vue";
import UpdateGuru from "../pages/guru/UpdateGuru.vue";
import PembayaranPage from "../pages/PembayaranPage.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/login",
    redirect: "/",
  },
  {
    path: "/home",
    component: Homepage,
    name: "home",
  },

  //** Mata Pelajaran */

  {
    path: "/mapel",
    component: MapelPage,
    name: "mapel",
  },
  {
    path: "/create-mapel",
    component: CreateMapel,
    name: "create.mapel",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/update-mapel/:id",
    component: UpdateMapel,
    name: "update.mapel",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  //** Raungan */

  {
    path: "/ruangan",
    component: RuanganPage,
    name: "ruangan",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/create-ruangan",
    component: CreateRuangan,
    name: "create.ruangan",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/ruangan-update/:id",
    component: UpdateRuangan,
    name: "update.ruangan",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  //** Nilai */
  {
    path: "/nilai",
    component: NilaiPage,
    name: "nilai",
  },
  {
    path: "/view-nilai",
    component: ViewNilai,
    name: "view.nilai",
  },
  {
    path: "/create-nilai",
    component: CreateNilai,
    name: "create.nilai",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/nilai-update/:id",
    component: UpdateNilai,
    name: "update.nilai",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  //**Absen */
  {
    path: "/absen",
    component: AbsensiPage,
    name: "absen",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  {
    path: "/jadwal",
    component: JadwalPage,
    name: "jadwal",
  },

  //** Siswa */
  {
    path: "/siswa",
    component: SiswaPage,
    name: "siswa",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/create-siswa",
    component: CreateSiswa,
    name: "create.siswa",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/siswa-update/:id",
    component: UpdateSiswa,
    name: "update.siswa",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  //**Guru */
  {
    path: "/guru",
    component: GuruPage,
    name: "guru",
  },
  {
    path: "/create-guru",
    component: CreateGuru,
    name: "create.guru",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/guru-update/:id",
    component: UpdateGuru,
    name: "update.guru",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1 && !localStorage.getItem("token").role) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },

  {
    path: "/pembayaran",
    component: PembayaranPage,
    name: "pembayaran",
  },
];

export default routes;
