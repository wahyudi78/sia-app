<script setup>
import { computed, ref, onMounted } from "vue";
import { allNilai, deleteNilai } from "../../http/nilai";
import Navbar from "../../components/Navbar.vue";

const nilai = ref([]);

const search = ref("");
const user = JSON.parse(localStorage.getItem("datauser"));

const isNilai = computed(() =>
  nilai.value.filter((nilai) => {
    return search.value === "" ? (user.role == 1 ? nilai : user.role == 2 ? nilai.jadwal.guru.id == user.id : user.role == 3 ? nilai.siswa.id == user.id : nilai) : nilai.siswa.name.toLowerCase().match(search.value.toLowerCase());
  })
);

onMounted(async () => {
  const { data } = await allNilai();
  nilai.value = data.data;
  console.log(isNilai);
  return {
    nilai,
  };
});

function destroy(id, index) {
  const answer = window.confirm("Apakah anda yakin ingin menghapus data?");
  if (answer) {
    deleteNilai(id)
      .then((response) => {
        console.log(response);
        nilai.value.splice(index, 1);
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
</script>

<template>
  <Navbar />
  <!-- <Navbar /> -->
  <div class="conatiner m-3">
    <div class="card p-3">
      <div class="row">
        <div v-if="user.role !== 3" class="col-lg-5">
          <router-link :to="{ name: 'create.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Tambah Nilai </router-link>
        </div>
        <div :class="user.role == 3 ? 'col-lg-12 d-flex justify-content-end' : 'col-lg-5 d-flex justify-content-end'">
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
              <th>Siswa</th>
              <th>MATA PELAJARAN</th>
              <th>RUANGAN</th>
              <th>Nilai</th>
              <th>WAKTU</th>
              <th v-if="user.role == 1 || user.role == 2">ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(isNilai, index) in isNilai" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ isNilai.siswa.nomor_induk }}</td>
              <td>{{ isNilai.siswa.name }}</td>
              <td>{{ isNilai.jadwal.mapel.mapel }}</td>
              <td>{{ isNilai.jadwal.ruangan.kelas }}</td>
              <td :class="isNilai.nilai < 75 ? 'text-danger' : isNilai.nilai > 80 ? 'text-success' : 'text-primary'">{{ isNilai.nilai }}</td>
              <td>{{ isNilai.waktu }}</td>
              <td v-if="user.role == 1 || user.role == 2">
                <div class="btn-group">
                  <router-link :to="{ name: 'update.nilai', params: { id: isNilai.id } }" class="btn btn-sm btn-outline-info">ubah</router-link>

                  <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isNilai.id, index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
