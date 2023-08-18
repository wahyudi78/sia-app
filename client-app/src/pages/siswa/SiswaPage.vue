<script setup>
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { allSiswa, deleteSiswa } from "../../http/siswa";
import Navbar from "../../components/Navbar.vue";

const siswa = ref([]);
const search = ref("");
const isSiswa = computed(() =>
  siswa.value.filter((siswa) => {
    return search.value == "" ? siswa.role == 3 : siswa.name.toLowerCase().match(search.value.toLowerCase());
  })
);

function destroy(id, index) {
  const answer = window.confirm("apakah anda yakin ingin menghapus data?");
  if (answer) {
    deleteSiswa(id)
      .then((response) => {
        console.log(response);
        siswa.value.splice(index, 1);
      })
      .catch(function (error) {
        if (error.response) {
        } else if (error.request) {
        } else {
          console.log("Error", error.message);
        }
        console.log("error" + error.config);
      });
  }
}

onMounted(async () => {
  // const { data } = await allSiswa();
  // siswa.value = data.data;
  // console.log(isSiswa.value[0].name);
  return {
    siswa,
    isSiswa,
  };
});

onBeforeMount(async () => {
  const { data } = await allSiswa();
  siswa.value = data.data;
  // console.log(isSiswa.value[0].name);
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <h1>Data Siswa</h1>

      <div class="row m-4">
        <div class="col-lg-7">
          <router-link :to="{ name: 'create.siswa' }" class="btn btn-outline-primary btn-md rounded shadow mb-3"> Tambah Siswa </router-link>
        </div>
        <div class="col-lg-5 d-flex justify-content-end">
          <div class="form-group">
            <input class="form-control text-right" type="text" v-model="search" placeholder="Cari Nama" />
          </div>
        </div>
      </div>

      <div class="table table-hover">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIS</th>
              <th>NAMA</th>
              <th>AGAMA</th>
              <th>ALAMAT</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(isSiswaList, index) in isSiswa || FilterSiswa" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ isSiswaList.nomor_induk }}</td>
              <td>{{ isSiswaList.name }}</td>
              <td>{{ isSiswaList.agama }}</td>
              <td>{{ isSiswaList.alamat }}</td>
              <td>
                <div class="btn-group">
                  <router-link :to="{ name: 'update.siswa', params: { id: isSiswaList.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

                  <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isSiswaList.id, index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
