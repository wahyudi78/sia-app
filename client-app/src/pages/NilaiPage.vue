<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allNilai } from "../http/nilai";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const nilai = ref([]);

onMounted(async () => {
  const { data } = await allNilai();
  nilai.value = data.data;
  console.log(nilai);
  return {
    nilai,
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
                <th>GURU</th>
                <th>MATA PELAJARAN</th>
                <th>RUANGAN</th>
                <th>NILAI</th>
                <th>WAKTU</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nilai, index) in nilai" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ nilai.siswa.name }}</td>
                <td>{{ nilai.guru.name }}</td>
                <td>{{ nilai.mapel.mapel }}</td>
                <td>{{ nilai.ruang.ruangan }}</td>
                <td :class="nilai.nilai < 75 ? 'text-danger' : nilai.nilai > 80 ? 'text-success' : 'text-primary'">{{ nilai.nilai }}</td>
                <td>{{ nilai.waktu }}</td>
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
