<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createRuangan } from "../../http/ruangan";
import { useRouter } from "vue-router";

const data = reactive({
  kelas: "",
});
const validation = reactive({
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
    <div class="row m-4">
      <div class="col-lg-5">
        <router-link :to="{ name: 'ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Batal </router-link>
      </div>
    </div>
    <form @submit.prevent="create">
      <h3>Tambah Kelas</h3>
      <div class="form-group">
        <label for="Kelas">Nama Kelas</label>
        <input v-model="data.kelas" type="text" class="form-control" id="kelas" placeholder="Masukan Nama kelas" />
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
