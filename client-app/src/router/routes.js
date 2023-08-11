import LoginPage from "../pages/LoginPage.vue";
import Homepage from "../pages/Homepage.vue";
import MapelPage from "../pages/mapel/MapelPage.vue";
import CreateMapel from "../pages/mapel/CreateMapel.vue";
import UpdateMapel from "../pages/mapel/UpdateMapel.vue";
import RuanganPage from "../pages/ruangan/RuanganPage.vue";
import CreateRuangan from "../pages/ruangan/CreateRuangan.vue";
import UpdateRuangan from "../pages/ruangan/UpdateRuangan.vue";
import NilaiPage from "../pages/NilaiPage.vue";
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
  {
    path: "/update-mapel/:id",
    component: UpdateMapel,
    name: "update.mapel",
  },

  //** Raungan */

  {
    path: "/ruangan",
    component: RuanganPage,
    name: "ruangan",
  },
  {
    path: "/create-ruangan",
    component: CreateRuangan,
    name: "create.ruangan",
  },
  {
    path: "/ruangan-update/:id",
    component: UpdateRuangan,
    name: "update.ruangan",
  },

  //** Nilai */
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
    path: "/jadwal",
    component: JadwalPage,
    name: "jadwal",
  },

  //** Siswa */
  {
    path: "/siswa",
    component: SiswaPage,
    name: "siswa",
  },
  {
    path: "/create-siswa",
    component: CreateSiswa,
    name: "create.siswa",
  },
  {
    path: "/siswa-update/:id",
    component: UpdateSiswa,
    name: "update.siswa",
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
  },
  {
    path: "/guru-update/:id",
    component: UpdateGuru,
    name: "update.guru",
  },

  {
    path: "/pembayaran",
    component: PembayaranPage,
    name: "pembayaran",
  },
];

export default routes;
