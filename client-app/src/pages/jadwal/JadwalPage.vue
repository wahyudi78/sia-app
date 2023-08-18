<script setup>
import { computed, ref, onMounted } from "vue";
import { allJadwal, deleteJadwal } from "../../http/jadwal";
import Navbar from "../../components/Navbar.vue";

const user = JSON.parse(localStorage.getItem("datauser"));

const jadwal = ref([]);
const search = ref("");

const isGuru = computed(() =>
  jadwal.value.filter((jadwal) => {
    return user.role == 2 ? jadwal.guru.id == user.id : user.role == 3 ? jadwal.ruangan.id == user.ruangan_id : jadwal;
  })
);
const isJadwal = computed(() =>
  jadwal.value.filter((jadwal) => {
    return search.value == "" ? (user.role == 2 ? jadwal.guru.id == user.id : user.role == 3 ? jadwal.ruangan.id == user.ruangan_id : jadwal) : jadwal.ruangan.kelas.toLowerCase().match(search.value.toLowerCase());
  })
);

function destroy(id, index) {
  const answer = window.confirm("apakah anda yakin ingin menghapus data?");
  if (answer) {
    deleteJadwal(id)
      .then((response) => {
        alert(JSON.stringify(response.data.message));
        jadwal.value.splice(index, 1);
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
      <div class="row m-4">
        <div v-if="user.role !== 3" class="col-lg-7">
          <router-link :to="{ name: 'create.jadwal' }" class="btn btn-outline-primary btn-sm rounded shadow mb-3"> Tambah Jadwal </router-link>
        </div>
        <div :class="user.role == 3 ? 'col-lg-12 d-flex justify-content-end' : 'col-lg-5 d-flex justify-content-end'">
          <div class="form-group">
            <input class="form-control text-right" type="text" v-model="search" placeholder="Cari Kelas" />
          </div>
        </div>
      </div>
      <div class="table table-hover">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>HARI</th>
              <th>GURU</th>

              <th>MATA PELAJARAN</th>
              <th>KELAS</th>
              <th>MULAI</th>
              <th>SELESAI</th>
              <th v-if="user.role !== 3">ACTION</th>
            </tr>
          </thead>
          <tbody v-if="user.role == 1">
            <tr v-for="(jadwal, index) in isJadwal" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ jadwal.hari }}</td>
              <td>{{ jadwal.guru.name }}</td>
              <td>{{ jadwal.mapel.mapel }}</td>
              <td>{{ jadwal.ruangan.kelas }}</td>
              <td>{{ jadwal.mulai }}</td>
              <td>{{ jadwal.selesai }}</td>
              <td v-if="user.role !== 3">
                <div class="btn-group">
                  <div class="btn-group">
                    <router-link :to="{ name: 'update.jadwal', params: { id: jadwal.id } }" class="btn btn-sm btn-outline-info">Edit</router-link>

                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(jadwal.id, index)">Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(isGuru, index) in isGuru" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ isGuru.hari }}</td>
              <td>{{ isGuru.guru.name }}</td>
              <td>{{ isGuru.mapel.mapel }}</td>
              <td>{{ isGuru.ruangan.kelas }}</td>
              <td>{{ isGuru.mulai }}</td>
              <td>{{ isGuru.selesai }}</td>
              <td v-if="user.role !== 3">
                <div class="btn-group">
                  <router-link :to="{ name: 'update.jadwal', params: { id: isGuru.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

                  <button v-if="user.role == 1" class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isGuru.id, index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
