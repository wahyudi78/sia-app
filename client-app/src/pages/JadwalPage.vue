<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allJadwal } from "../http/jadwal";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const jadwal = ref([]);

onMounted(async () => {
  const { data } = await allJadwal();
  jadwal.value = data.data;
  console.log(jadwal);
  return {
    jadwal,
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
                <th>GURU</th>

                <th>MATA PELAJARAN</th>
                <th>RUANGAN</th>
                <th>KELAS</th>
                <th>MULAI</th>
                <th>SELESAI</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jadwal, index) in jadwal" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ jadwal.guru.name }}</td>
                <td>{{ jadwal.mapel.mapel }}</td>
                <td>{{ jadwal.ruangan.ruangan }}</td>
                <td>{{ jadwal.kelas }}</td>
                <td>{{ jadwal.mulai }}</td>
                <td>{{ jadwal.selesai }}</td>
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
