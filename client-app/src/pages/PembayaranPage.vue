<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allPembayaran } from "../http/pembayaran";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const pembayaran = ref([]);

onMounted(async () => {
  const { data } = await allPembayaran();
  pembayaran.value = data.data;
  console.log(pembayaran);
  return {
    pembayaran,
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
                <th>SISWA</th>
                <th>KODE PEMBAYARAN</th>
                <th>WAKTU</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pembayaran, index) in pembayaran" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ pembayaran.siswa.name }}</td>
                <td>{{ pembayaran.kode }}</td>
                <td>{{ pembayaran.waktu }}</td>
                <td>{{ pembayaran.status }}</td>
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
