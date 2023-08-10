<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { allGuru } from "../http/guru";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

// const store = useGuruStore();

// const { isguru } = storeToRefs(store);
// const { fetchallGuru } = store;

const guru = ref([]);
const isGuru = computed(() =>
  guru.value.filter((guru) => {
    return guru.role == 2;
  })
);

onMounted(async () => {
  const { data } = await allGuru();
  guru.value = data.data;
  console.log(isGuru.value[0].name);
  return {
    guru,
    isGuru,
  };
});

// const columns = [
//   { data: "nomor_induk", title: "NIP" },
//   { data: "name", title: "NAMA" },
//   { data: "agama", title: "AGAMA" },
//   { data: "alamat", title: "ALAMAT" },
// ];
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
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
              <tr v-for="(isGuru, index) in isGuru" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isGuru.name }}</td>
                <td>{{ isGuru.agama }}</td>
                <td>{{ isGuru.alamat }}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-info">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
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
