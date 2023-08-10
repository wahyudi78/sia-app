<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allMapel } from "../http/mapel";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const mapel = ref([]);

onMounted(async () => {
  const { data } = await allMapel();
  mapel.value = data.data;
  return {
    mapel,
  };
});
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
                <th>No</th>
                <th>MAPEL</th>
                <th>KELAS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mapel, index) in mapel" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ mapel.mapel }}</td>
                <td>{{ mapel.kelas }}</td>
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
