<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { Jadwal, allJadwal, updateJadwal } from "../../http/jadwal";
import Navbar from "../../components/Navbar.vue";

import { allMapel } from "../../http/mapel";
import { allGuru } from "../../http/guru";
import { allRuangan } from "../../http/ruangan";
import { useRouter, useRoute } from "vue-router";
import { ModelListSelect } from "vue-search-select";

const jadwal = ref([]);
const ruangan = ref([]);
const mapel = ref([]);
const guru = ref([]);
const router = useRouter();
const route = useRoute();

const user = JSON.parse(localStorage.getItem("datauser"));

// const pass = ref(data.username);

const data = reactive({
  user_id: "",
  mapel_id: "",
  hari: "",
  mulai: "",
  selesai: "",
  kelas: "",
  ruangan_id: "",
});
const validation = reactive({
  guru: "",
  mapel: "",
  hari: "",
  mulai: "",
  selesai: "",
  kelas: "",
  ruangan: "",
});

const hariOptioon = [
  { code: "SENIN", name: "SENIN", desc: "desc01" },
  { code: "SELASA", name: "SELASA", desc: "desc02" },
  { code: "RABU", name: "RABU", desc: "desc03" },
  { code: "KAMIS", name: "KAMIS", desc: "desc04" },
  { code: "JUM'AT", name: "JUM'AT", desc: "desc05" },
  { code: "SABTU", name: "SABTU", desc: "desc05" },
];

function update() {
  updateJadwal(route.params.id, data)
    .then((response) => {
      console.log(response);
      router.push({ name: "jadwal" });
    })
    .catch(function (error) {
      if (error.response) {
        validation.user_id = error.response.data.errors["user_id"];
        validation.mapel_id = error.response.data.errors["mapel_id"];
        validation.hari = error.response.data.errors["hari"];
        validation.mulai = error.response.data.errors["mulai"];
        validation.selesai = error.response.data.errors["selesai"];
        validation.kelas = error.response.data.errors["kelas"];
        validation.ruangan_id = error.response.data.errors["ruangan_id"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
}

function optionMapel() {
  allMapel().then((result) => {
    mapel.value = result.data.data;
  });
}
function optionRuangan() {
  allRuangan().then((result) => {
    ruangan.value = result.data.data;
  });
}
function optionGuru() {
  allGuru().then((result) => {
    guru.value = result.data.data;
  });
}
function getJadwal() {
  Jadwal(route.params.id).then((result) => {
    console.log(result.data);
    data.user_id = result.data.data.guru.id;
    data.mapel_id = result.data.data.mapel.id;
    data.hari = result.data.data.hari;
    data.mulai = result.data.data.mulai;
    data.selesai = result.data.data.selesai;
    data.kelas = result.data.data.kelas;
    data.ruangan_id = result.data.data.ruangan.id;
  });
}

onMounted(async () => {
  // const { data } = await Jadwal(route.params.id).then((result) => {
  //   data.user_id = result.data.data.data.guru.id;
  //   data.mapel = result.data.data.data.mapel_id.id;
  //   // data.hari = result.data.hari;
  //   // data.mulai = result.data.mulai;
  //   // data.selesai = result.data.selesai;
  //   // data.kelas = result.data.kelas;
  //   // // data.ruangan = result.data.data.ruangan.id;
  //   console.log(result);

  //   return {
  //     jadwal,
  //   };
  // });
  getJadwal();
  optionMapel();
  optionRuangan();
  optionGuru();
});
</script>

<template>
  <Navbar />
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="update">
      <h3>Tambah Jadwal</h3>

      <div v-if="user.role == 1" class="form-group">
        <label for="guru">Guru</label>
        <model-list-select :list="guru" v-model="data.user_id" option-value="id" option-text="name" placeholder="select item"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>
      <div v-else class="form-group">
        <label for="guru">Guru</label>
        <input type="text" :value="user.name" disabled class="form-control" id="guru" placeholder="Masukan Nama guru" />
      </div>

      <div class="form-group">
        <label for="mapel">Mapel</label>
        <model-list-select :list="mapel" v-model="data.mapel_id" option-value="id" option-text="mapel" placeholder="select item"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>

      <div class="form-group">
        <label for="ruangan">Ruangan</label>
        <model-list-select :list="ruangan" v-model="data.ruangan_id" option-value="id" option-text="ruangan" placeholder="select item"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>

      <div class="form-group">
        <label for="ruangan">Hari</label>
        <model-list-select :list="hariOptioon" v-model="data.hari" :selectedItem="data.hari" option-value="code" option-text="name" placeholder="select item"> </model-list-select>
        <!-- <span class="text-danger text-center">{{ validation.bulan }}</span> -->
      </div>

      <div class="form-group">
        <label for="mulai">Mulai</label>
        <input v-model="data.mulai" type="time" class="form-control" id="mulai" step="2" placeholder="Masukan Nama mulai" />
      </div>
      <!-- <span class="text-danger text-center">{{ validation.mulai }}</span> -->

      <div class="form-group">
        <label for="selesai">Selesai</label>
        <input v-model="data.selesai" type="time" class="form-control" id="selesai" step="2" placeholder="Masukan Nama mulai" />
        <!-- <span class="text-danger text-center">{{ validation.mulai }}</span> -->
      </div>

      <div class="form-group">
        <label for="kelas">Kelas</label>
        <select v-model="data.kelas" class="form-control" id="kelas">
          <option value="1">KELAS I</option>
          <option value="2">KELAS II</option>
          <option value="3">KELAS III</option>
        </select>
        <!-- <span class="text-danger text-center">{{ validation.kelas }}</span> -->
      </div>
      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
