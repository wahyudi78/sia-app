<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allRuangan } from "../http/ruangan";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const ruangan = ref([]);

onMounted(async () => {
  const { data } = await allRuangan();
  ruangan.value = data.data;
  return {
    ruangan,
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
                <th>KODE</th>
                <th>RUANGAN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ruangan, index) in ruangan" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ ruangan.kode }}</td>
                <td>{{ ruangan.ruangan }}</td>
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
