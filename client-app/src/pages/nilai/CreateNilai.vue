<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { allSiswa } from "../../http/siswa";
import { createNilai } from "../../http/nilai";
import { allJadwal, Jadwal } from "../../http/jadwal";
import { useRouter } from "vue-router";
import { ModelListSelect } from "vue-search-select";

const data = reactive({
  nilai: "",
  jadwal_id: "",
  waktu: "",
  user_id: "",
});
const validation = reactive({
  nilai: "",
  mapel_id: "",
  waktu: "",
  user_id: "",
});
const router = useRouter();

const user = JSON.parse(localStorage.getItem("datauser"));

const jadwal = ref([]);
const siswa = ref([]);

const isSiswa = computed(() =>
  siswa.value.filter((siswa) => {
    const role = user.role != 1 ? user.role : 3;
    return siswa.role == role;
  })
);

/**
 * Fetches all available jadwal (schedule) data and stores it in the jadwal variable.
 */
async function optionJadwal() {
  try {
    const result = await allJadwal();
    jadwal.value = result.data.data;
  } catch (error) {
    console.error("Failed to fetch jadwal data:", error);
  }
}

function getMapel(item) {
  return item.hari + " - Mapel: " + item.mapel.mapel + " - Kelas: " + item.ruangan.kelas + " Jam: " + item.mulai + " s/d " + item.selesai + " WIB";
}
function jadwalSelect(items, lastSelectItem) {
  console.log(items);
}

function create() {
  createNilai(data)
    .then((response) => {
      alert("data berhasil disimpan");
      router.push({ name: "nilai" });
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
  allSiswa().then((response) => {
    siswa.value = response.data.data;
  });
  optionJadwal();
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Tambah Nilai</h3>

      <div class="form-group">
        <label for="hari">Pilih Jadwal</label>
        <model-list-select :list="jadwal" v-model="data.jadwal_id" option-value="id" placeholder="select item" :custom-text="getMapel" @select="jadwalSelect"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>

      <div class="form-group">
        <label for="bulan">Pilih Siswa</label>
        <model-list-select :list="isSiswa == null ? siswa : isSiswa" v-model="data.user_id" option-value="id" option-text="name" placeholder="select item"> </model-list-select>
        <!-- <span class="text-danger text-center">{{ validation.bulan }}</span> -->
      </div>

      <div class="form-group">
        <label for="nilai">Nilai</label>
        <input v-model="data.nilai" max="100" type="number" class="form-control" id="nilai" placeholder="Masukan nilai Transaksi" />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
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
