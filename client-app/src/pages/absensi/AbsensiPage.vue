<script setup>
import { computed, ref, onMounted } from "vue";
import { allAbsensi, deleteAbsensi } from "../../http/absensi";
import Navbar from "../../components/Navbar.vue";

const absensi = ref([]);
const search = ref("");
const user = JSON.parse(localStorage.getItem("datauser"));
const isAbsensi = computed(() =>
  absensi.value.filter((absensi) => {
    return search.value == "" ? (user.role !== 1 ? absensi.guru.id == user.id : absensi) : absensi.guru.name.toLowerCase().match(search.value.toLowerCase());
  })
);

onMounted(async () => {
  const { data } = await allAbsensi();
  absensi.value = data.data;
  // console.log(isAbsensi);
  return {
    absensi,
  };
});

function destroy(id, index) {
  const answer = window.confirm("Apakah anda yakin ingin menghapus data?");
  if (answer) {
    deleteAbsensi(id)
      .then((response) => {
        absensi.value.splice(index, 1);
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
  <div class="conatiner m-3">
    <div class="card p-3">
      <div class="row">
        <div class="col-lg-7">
          <router-link :to="{ name: 'create.absensi' }" class="btn btn-outline-primary btn-sm rounded shadow mb-3"> Tambah Absensi </router-link>
        </div>
        <div class="col-lg-5 d-flex justify-content-end">
          <div class="form-group">
            <input class="form-control text-right" type="text" v-model="search" placeholder="Cari Nama Guru" />
          </div>
        </div>
      </div>
      <div class="table table-hover">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>NAMA</th>
              <th>MATA PELAJARAN</th>
              <th>HARI</th>
              <th>MULAI</th>
              <th>SELESAI</th>
              <th>RUANGAN</th>
              <th>KETERANGAN</th>
              <th v-if="user.role == 1 || user.role == 2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(isAbsensi, index) in isAbsensi" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ isAbsensi.guru.nomor_induk }}</td>
              <td>{{ isAbsensi.guru.name }}</td>
              <td>{{ isAbsensi.jadwal.mapel.mapel }}</td>
              <td>{{ isAbsensi.jadwal.hari }}</td>
              <td>{{ isAbsensi.jadwal.mulai }} WIB</td>
              <td>{{ isAbsensi.jadwal.selesai }} WIB</td>
              <td>{{ isAbsensi.jadwal.ruangan.kelas }}</td>
              <td :class="isAbsensi.keterangan == 1 ? 'text-success' : isAbsensi.keterangan == 2 ? 'text-danger' : 'text-warning'">{{ isAbsensi.keterangan == 1 ? "MASUK" : isAbsensi.keterangan == 2 ? "TIDAK MASUK" : "SAKIT" }}</td>

              <td v-if="user.role == 1 || user.role == 2">
                <div class="btn-group">
                  <router-link :to="{ name: 'update.absensi', params: { id: isAbsensi.id } }" class="btn btn-sm btn-outline-info">ubah</router-link>

                  <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isAbsensi.id, index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
