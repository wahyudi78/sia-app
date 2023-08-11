<script setup>
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { allNilai, deleteNilai, Nilai } from "../../http/nilai";
import Navbar from "../../components/Navbar.vue";
// import ModalMapel from "../components/mapel/modalMapel.vue";

const nilai = ref([]);
const user = JSON.parse(localStorage.getItem("datauser"));

const isNilai = computed(() =>
  nilai.value.filter((nilai) => {
    return (nilai.jadwal.guru.id = user.id);
  })
);

function validuser() {
  if (user.role == 2) {
    // const isNilai = nilai;
    const isNilai = computed(() =>
      nilai.value.filter((nilai) => {
        return nilai.jadwal.guru.id == user.id;
      })
    );
  } else if (user.role == 2) {
    const isNilai = computed(() =>
      nilai.value.filter((nilai) => {
        return nilai.guru.id == user.id;
      })
    );
  }
}

function destroy(id, index) {
  const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
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

onMounted(async () => {
  // const { data } = await allguru();
  // guru.value = data.data;
  // console.log(isGuru.value[0].name);
  console.log(user.role);
  console.log(nilai.value.jadwal);

  return {
    nilai,
    isNilai,
  };
});
onBeforeMount(async () => {
  const { data } = await allNilai();
  nilai.value = data.data;
  return {
    nilai,
    isNilai,
  };
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <!-- Button trigger modal -->
      <h1>Data Mata Pelajaran</h1>
      <div class="row m-4">
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>

      <table class="table table-hover p-5">
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Siswa</th>
                <th>Mapel</th>
                <th>Nilai</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(isNilai, index) in isNilai" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isNilai.guru.name }}</td>
                <td>{{ isNilai.jadwal.mapel.mapel }}</td>
                <td>{{ isNilai.nilai }}</td>
                <td>{{ isNilai.kelas }}</td>
                <td>
                  <div class="btn-group">
                    <router-link :to="{ name: 'update.nilai', params: { id: isNilai.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(mapel.id, index)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </table>
    </div>
  </div>
</template>
