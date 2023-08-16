<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createMapel, allMapel } from "../../http/mapel";
import { useRouter } from "vue-router";

const data = reactive({
  mapel: "",
});
const validation = reactive({
  mapel: "",
});
const router = useRouter();

const create = async () => {
  await createMapel(data)
    .then((response) => {
      console.log(response);
      router.push({ name: "mapel" });

      //   mapel.value = data.data;
    })
    .catch(function (error) {
      if (error.response) {
        validation.mapel = error.response.data.errors["mapel"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  console.log(validation);
};
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <div class="row m-4">
      <div class="col-lg-5">
        <router-link :to="{ name: 'mapel' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Batal </router-link>
      </div>
    </div>
    <form @submit.prevent="create">
      <h3>Tambah Mata Pelajaran</h3>
      <div class="form-group">
        <label for="mapel">Mata Pelajaran</label>
        <input v-model="data.mapel" type="text" class="form-control" id="mapel" placeholder="Masukan Nama Mapel" />
        <span class="text-danger text-center">{{ validation.mapel }}</span>
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
