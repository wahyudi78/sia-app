<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { allSiswa } from "../../http/siswa";
import { createAbsensi } from "../../http/absensi";
import { allJadwal, Jadwal } from "../../http/jadwal";
import { useRouter } from "vue-router";
import { ModelListSelect } from "vue-search-select";
import { allGuru } from "../../http/guru";
import Navbar from "../../components/Navbar.vue";

const user = JSON.parse(localStorage.getItem("datauser"));
const router = useRouter();

const jadwal = ref([]);
const guru = ref([]);
var times = new Date();
var time = times.getHours() + ":" + times.getMinutes() + ":" + times.getSeconds();
const data = reactive({
  keterangan: "",
  waktu: "",
  jam: time,
  jadwal_id: "",
  user_id: user.role !== 1 ? user.role : "",
});
const validation = reactive({
  keterangan: "",
  waktu: "",
  jam: "",
  jadwal_id: "",
  user_id: "",
});

/**
 * Fetches all available jadwal (schedule) data and stores it in the jadwal variable.
 */
async function optionJadwal() {
  try {
    const result = await allJadwal();
    jadwal.value = result.data.data;
  } catch (error) {
    console.error("Failed to fetch jadwal data:" + error);
  }
}
const isJadwal = computed(() =>
  jadwal.value.filter((jadwal) => {
    return user.role !== 1 ? jadwal.guru.id == user.id : jadwal;
  })
);
async function optionGuru() {
  try {
    const result = await allGuru();
    guru.value = result.data.data;
  } catch (error) {
    console.error("Failed to fetch jadwal data:" + error);
  }
}

const isGuru = computed(() =>
  guru.value.filter((guru) => {
    return guru.role == 2;
  })
);

function getMapel(item) {
  return item.hari + " - Mapel: " + item.mapel.mapel + " - Kelas: " + item.ruangan.kelas + " Jam: " + item.mulai + " s/d " + item.selesai + " WIB";
}
function jadwalSelect(items, lastSelectItem) {
  console.log(items);
}

function create() {
  createAbsensi(data)
    .then((response) => {
      alert("data berhasil disimpan");
      router.push({ name: "absensi" });
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
}

onMounted(async () => {
  console.log(user);
  optionJadwal();
  optionGuru();
});
</script>

<template>
  <Navbar />

  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Tambah Absensi</h3>

      <div v-if="user.role == 1" class="form-group">
        <label for="guru">Pilih Guru</label>
        <model-list-select :list="isGuru" v-model="data.user_id" option-value="id" option-text="name" placeholder="select item"> </model-list-select>
        <!-- <span class="text-danger text-center">{{ validation.bulan }}</span> -->
      </div>
      <div v-else class="form-group">
        <label for="guru">Guru</label>
        <input :value="user.name" disabled type="text" class="form-control" id="guru" placeholder=" " />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>
      <div class="form-group">
        <label for="hari">Pilih Jadwal</label>
        <model-list-select :list="isJadwal" v-model="data.jadwal_id" option-value="id" placeholder="select item" :custom-text="getMapel" @select="jadwalSelect"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>

      <div class="form-group">
        <label for="kelas">Keterangan</label>
        <select v-model="data.keterangan" class="form-control" id="kelas">
          <option value="1">Masuk</option>
          <option value="2">Tidak Masuk</option>
          <option value="3">Izin</option>
        </select>
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>

      <div class="form-group">
        <label for="waktu">waktu</label>
        <input v-model="data.waktu" type="date" class="form-control" id="waktu" placeholder="Masukan waktu Transaksi" />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
