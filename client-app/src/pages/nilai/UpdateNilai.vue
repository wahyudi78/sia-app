<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { updateNilai, Nilai } from "../../http/nilai";
import { allJadwal, Jadwal } from "../../http/jadwal";
import { useRouter, useRoute } from "vue-router";
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

const user = JSON.parse(localStorage.getItem("datauser"));
const router = useRouter();
const route = useRoute();
const jadwal = ref([]);
const siswa = ref([]);

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

function update() {
  updateNilai(route.params.id, data)
    .then((response) => {
      router.push({ name: "nilai" });
    })
    .catch(function (error) {
      if (error.response) {
        validation.nilai = error.response.data.errors["nilai"];
        validation.user_id = error.response.data.errors["user_id"];
        validation.jadwal_id = error.response.data.errors["jadwal_id"];
        validation.waktu = error.response.data.errors["waktu"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  console.log(data);
}

onMounted(async () => {
  Nilai(route.params.id).then((response) => {
    data.nilai = response.data.data.nilai;
    data.jadwal_id = response.data.data.jadwal.id;
    data.waktu = response.data.data.waktu;
    data.user_id = response.data.data.siswa.id;
    siswa.value = response.data.data.siswa;
    console.log(response.data.data.nilai);
  });
  optionJadwal();
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="update">
      <h3>Update Nilai</h3>

      <div class="form-group">
        <label for="hari">Pilih Jadwal</label>
        <model-list-select :list="jadwal" v-model="data.jadwal_id" option-value="id" placeholder="select item" :custom-text="getMapel"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>

      <div class="form-group">
        <label for="siswa">Siswa</label>
        <input disabled :value="siswa.name" type="text" class="form-control" id="siswa" placeholder="" />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>
      <div class="form-group">
        <label for="nilai">Nilai</label>
        <input v-model="data.nilai" type="number" class="form-control" id="nilai" placeholder="Masukan nilai " />

        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>

      <div class="form-group">
        <label for="waktu">waktu</label>
        <input v-model="data.waktu" type="date" class="form-control" id="waktu" placeholder="Masukan waktu " />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
