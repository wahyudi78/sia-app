import LoginPage from "../pages/LoginPage.vue";
import Homepage from "../pages/Homepage.vue";
import MapelPage from "../pages/mapel/MapelPage.vue";
import CreateMapel from "../pages/mapel/CreateMapel.vue";
import RuanganPage from "../pages/RuanganPage.vue";
import NilaiPage from "../pages/NilaiPage.vue";
import AbsensiPage from "../pages/AbsensiPage.vue";
import JadwalPage from "../pages/JadwalPage.vue";
import SiswaPage from "../pages/SiswaPage.vue";
import GuruPage from "../pages/GuruPage.vue";
import PembayaranPage from "../pages/PembayaranPage.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
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
  },

  //** Raungan */

  {
    path: "/ruangan",
    component: RuanganPage,
    name: "ruangan",
  },
  {
    path: "/nilai",
    component: NilaiPage,
    name: "nilai",
  },
  {
    path: "/absen",
    component: AbsensiPage,
    name: "absen",
  },
  {
    path: "/ruangan",
    component: RuanganPage,
    name: "ruangan",
  },
  {
    path: "/jadwal",
    component: JadwalPage,
    name: "jadwal",
  },
  {
    path: "/siswa",
    component: SiswaPage,
    name: "siswa",
  },
  {
    path: "/guru",
    component: GuruPage,
    name: "guru",
  },

  {
    path: "/pembayaran",
    component: PembayaranPage,
    name: "pembayaran",
  },
];

export default routes;
