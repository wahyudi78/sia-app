<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createRuangan } from "../../http/ruangan";
import { useRouter } from "vue-router";

const data = reactive({
  ruangan: "",
  kelas: "",
});
const validation = reactive({
  ruangan: "",
  kelas: "",
});
const router = useRouter();

const create = async () => {
  await createRuangan(data)
    .then((response) => {
      // console.log(response);
      router.push({ name: "ruangan" });

      //   mapel.value = data.data;
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
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Tambah Ruangan</h3>
      <div class="form-group">
        <label for="mapel">Ruangan</label>
        <input v-model="data.ruangan" type="text" class="form-control" id="ruangan" placeholder="Masukan Nama ruangan" />
        <span class="text-danger text-center">{{ validation.ruangan }}</span>
      </div>
      <div class="form-group">
        <label for="kelas">Kelas</label>
        <select v-model="data.kelas" class="form-control" id="kelas">
          <option value="1">KELAS I</option>
          <option value="2">KELAS II</option>
          <option value="3">KELAS III</option>
        </select>
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>
      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
