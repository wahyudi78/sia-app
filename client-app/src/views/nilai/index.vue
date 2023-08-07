<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'create.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1>Nilai</h1>
            <div class="table">
            <table class="table">
              <thead>
                <tr>
                  <th>Siswa</th>
                  <th>Mata Pelajaran</th>
                  <th>Guru</th>
                  <th>Kelas</th>
                  <th>Waktu</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(nilai, index) in nilai.data" :key="index">
                  <td>{{ nilai.siswa.nama }}</td>
                  <td>{{ nilai.mapel.mapel }}</td>
                  <td>{{ nilai.guru.nama }}</td>
                  <td>{{ nilai.nilai }}</td>
                  <td>{{ nilai.waktu }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.nilai', params: { id: nilai.id } }" class="btn btn-sm btn-outline-info">Update</router-link>
                      <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(ruangan.id, index)">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    // reactive state
    let nilai = ref([]);

    onMounted(() => {
      // get data from api

      const token = JSON.parse( localStorage.getItem('token') );
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      let url = JSON.parse( localStorage.getItem('url') );

      axios
        .get(url+"v1/nilai/")
        .then((result) => {
          nilai.value = result.data;
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });

    function destroy(id, index) {
      axios

        .delete(url+"v1/nilai/" + id)
        .then(() => {
          nilai.value.data.splice(index, 1);
        })
        .catch((err) => {});
    }

    return {
      nilai,
      destroy,
    };
  },
};
</script>
