<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { allSiswa, deleteSiswa } from "../../http/siswa";
import Navbar from "../../components/Navbar.vue";

DataTable.use(DataTablesLib);

const siswa = ref([]);
const isSiswa = computed(() =>
  siswa.value.filter((siswa) => {
    return siswa.role == 3;
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
  return {
    siswa,
    isSiswa,
  };
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <h1>Data Siswa</h1>
      <div class="row m-4">
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.siswa' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>
      <table class="table table-striped p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table table-hover">
          <table class="table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>NAMA</th>
                <th>AGAMA</th>
                <th>ALAMAT</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(isSiswa, index) in isSiswa" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isSiswa.name }}</td>
                <td>{{ isSiswa.agama }}</td>
                <td>{{ isSiswa.alamat }}</td>
                <td>
                  <div class="btn-group">
                    <router-link :to="{ name: 'update.siswa', params: { id: isSiswa.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isSiswa.id, index)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- </DataTable> -->
      </table>
    </div>
  </div>
</template>
