<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { allNilai } from "../../http/nilai";
import Navbar from "../../components/Navbar.vue";

DataTable.use(DataTablesLib);

const nilai = ref([]);
const user = JSON.parse(localStorage.getItem("datauser"));
const isNilai = computed(() =>
  nilai.value.filter((nilai) => {
    return nilai.guru.id == user.id;
  })
);

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
                <th>Guru</th>
                <th>MATA PELAJARAN</th>
                <th>RUANGAN</th>
                <th>WAKTU</th>
                <th v-if="user.role == 1 || user.role == 2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(isNilai, index) in isNilai" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isNilai.guru.name }}</td>
                <td>{{ isNilai.jadwal.mapel.mapel }}</td>
                <td>{{ isNilai.jadwal.ruangan.ruangan }}</td>
                <!-- <td :class="isNilai.nilai < 75 ? 'text-danger' : isNilai.nilai > 80 ? 'text-success' : 'text-primary'">{{ isNilai.nilai }}</td> -->
                <td>{{ isNilai.waktu }}</td>
                <td v-if="user.role == 1 || user.role == 2">
                  <div class="btn-group">
                    <router-link :to="{ name: 'view.nilai' }" class="btn btn-outline-primary"> Buka </router-link>

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
