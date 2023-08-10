<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { Ruangan, updateRuangan } from "../../http/ruangan";
import { useRouter, useRoute } from "vue-router";

const data = reactive({
  ruangan: "",
  kelas: "",
});
const validation = reactive({
  ruangan: "",
  kelas: "",
});

const router = useRouter();
const route = useRoute();
let id = route.params.id;
const update = () => {
  updateRuangan(id, data)
    .then((response) => {
      console.log(response);
      router.push({ name: "ruangan" });
    })
    .catch(function (error) {
      if (error.response) {
        validation.ruangan = error.response.data.errors["ruangan"];
        validation.kelas = error.response.data.errors["kelas"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  // console.log(validation);
};

onMounted(async () => {
  await Ruangan(id).then((result) => {
    data.ruangan = result.data.data.ruangan;
    data.kelas = result.data.data.kelas;
  });
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="update">
      <h3>Tambah Mata Pelajaran</h3>
      <div class="form-group">
        <label for="mapel">Mata Pelajaran</label>
        <input v-model="data.ruangan" type="text" class="form-control" id="ruangan" placeholder="Masukan Nama ruangan" />
        <span class="text-danger text-center">{{ validation.ruangan }}</span>
      </div>
      <div class="form-group">
        <label for="kelas">Kelas</label>
        <select v-model="data.kelas" :selected="data.kelas" class="form-control" id="kelas">
          <option value="1">KELAS I</option>
          <option value="2">KELAS II</option>
          <option value="3">KELAS III</option>
        </select>
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>
      <h4>ruangan :{{ data.ruangan }} kelas={{ data.kelas }}</h4>
      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
