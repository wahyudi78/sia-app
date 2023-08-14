import AbsensiPage from "../pages/AbsensiPage.vue";

import Homepage from "../pages/Homepage.vue";

//**Jadwal */
import JadwalPage from "../pages/jadwal/JadwalPage.vue";
import CreateJadwal from "../pages/jadwal/CreateJadwal.vue";
import UpdateJadwal from "../pages/jadwal/UpdateJadwal.vue";

import LoginPage from "../pages/LoginPage.vue";

//** Route Guru */
import CreateGuru from "../pages/guru/CreateGuru.vue";
import GuruPage from "../pages/guru/GuruPage.vue";
import UpdateGuru from "../pages/guru/UpdateGuru.vue";

//**Route Mapel */
import CreateMapel from "../pages/mapel/CreateMapel.vue";
import MapelPage from "../pages/mapel/MapelPage.vue";
import UpdateMapel from "../pages/mapel/UpdateMapel.vue";

//**Route Nilai */
import CreateNilai from "../pages/nilai/CreateNilai.vue";
import NilaiPage from "../pages/nilai/NilaiPage.vue";
import UpdateNilai from "../pages/nilai/UpdateNilai.vue";
import ViewNilai from "../pages/nilai/ViewNilai.vue";

//**Route Pembayaran */
import PembayaranPage from "../pages/pembayaran/PembayaranPage.vue";
import CreatePembayaran from "../pages/pembayaran/CreatePembayaran.vue";
import UpdatePembayaran from "../pages/pembayaran/UpdatePembayaran.vue";

//**Route Ruangan */
import CreateRuangan from "../pages/ruangan/CreateRuangan.vue";
import RuanganPage from "../pages/ruangan/RuanganPage.vue";
import UpdateRuangan from "../pages/ruangan/UpdateRuangan.vue";

//**Route Siswa */
import CreateSiswa from "../pages/siswa/CreateSiswa.vue";
import SiswaPage from "../pages/siswa/SiswaPage.vue";
import UpdateSiswa from "../pages/siswa/UpdateSiswa.vue";

//**Route Transaksi */
import CreateTransaksi from "../pages/transaksi/CreateTransaksi.vue";
import TransaksiPage from "../pages/transaksi/TransaksiPage.vue";
import UpdateTransaksi from "../pages/transaksi/UpdateTransaksi.vue";

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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1 && !user) {
        alert("Maaf anda tidak memiliki hak akses ");
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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1 && !user) {
        alert("Maaf anda tidak memiliki hak akses ");
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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1 && !user) {
        alert("Maaf anda tidak memiliki hak akses ");
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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1 && !user) {
        alert("Maaf anda tidak memiliki hak akses ");
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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1 && !user) {
        alert("Maaf anda tidak memiliki hak akses ");
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
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role == 3) {
        alert("Maaf anda tidak memiliki hak akses ");
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

  //**Jadwal */
  {
    path: "/jadwal",
    component: JadwalPage,
    name: "jadwal",
  },
  {
    path: "/create-jadwal",
    component: CreateJadwal,
    name: "create.jadwal",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/jadwal-update/:id",
    component: UpdateJadwal,
    name: "update.jadwal",
    beforeEnter() {
      if (localStorage.getItem("datauser").role == 3) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
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

  //**Pembayaran */
  {
    path: "/pembayaran",
    component: PembayaranPage,
    name: "pembayaran",
  },
  {
    path: "/create-pambayaran",
    component: CreatePembayaran,
    name: "create.pembayaran",
    beforeEnter() {
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (user.role != 1) {
        alert("Maaf anda tidak memiliki hak akses ");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/pambayaran-update/:id",
    component: UpdatePembayaran,
    name: "update.pambayaran",
    beforeEnter() {
      if (localStorage.getItem("datauser").role !== 1 && !localStorage.getItem("token").role) {
        alert("Anda tidak punya akses");
        // block navigation
        return { name: "login" };
      }
    },
  },
  //**Transaksi */
  {
    path: "/transaksi/:id",
    component: TransaksiPage,
    name: "transaksi",
  },
  {
    path: "/create-transaksi/:id",
    component: CreateTransaksi,
    name: "create.transaksi",
    beforeEnter() {
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (!user) {
        alert("Maaf anda tidak memiliki hak akses ");
        // block navigation
        return { name: "login" };
      }
    },
  },
  {
    path: "/transaksi-update/:id",
    component: UpdateTransaksi,
    name: "update.transaksi",
    beforeEnter() {
      const user = JSON.parse(localStorage.getItem("datauser"));
      // alert(user.role);
      if (!user) {
        alert("Maaf anda tidak memiliki hak akses ");
        // block navigation
        return { name: "login" };
      }
    },
  },
];

export default routes;
