<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { Ruangan, updateRuangan } from "../../http/ruangan";
import { useRouter, useRoute } from "vue-router";

const data = reactive({
  kelas: "",
});
const validation = reactive({
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
        validation.ruangan = error.response.data.errors["kelas"];
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
    data.kelas = result.data.data.kelas;
  });
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <div class="row m-4">
      <div class="col-lg-5">
        <router-link :to="{ name: 'create.ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Tamabh Ruangan </router-link>
      </div>
    </div>
    <form @submit.prevent="update">
      <h3>Tambah Ruangan</h3>
      <div class="form-group">
        <label for="kelas">Nama Kelas</label>
        <input v-model="data.kelas" type="text" class="form-control" id="kelas" placeholder="Masukan Nama kelas" />
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
