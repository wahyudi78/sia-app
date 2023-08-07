<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'create.absensi' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1>Absensi</h1>
            <div class="table table-hover">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>guru</th>
                  <th>ruang</th>
                  <th>mapel</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(absen, index) in absen.data" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ absen.guru.nama }}</td>
                  <td>{{ absen.ruang.ruangan }}</td>
                  <td>{{ absen.mapel.mapel }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.absensi', params: { id: absen.id } }" class="btn btn-sm btn-outline-info">Update</router-link>
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
    let absen = ref([]);

    onMounted(() => {
      // get data from api
      let url = JSON.parse( localStorage.getItem('url') );
      const token = JSON.parse( localStorage.getItem('token') );
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      axios
        .get(url+"v1/absensi/")
        .then((result) => {
          absen.value = result.data;
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });

    function destroy(id, index) {
      axios

        .delete(url+"v1/nilai/" + id)
        .then(() => {
          absen.value.data.splice(index, 1);
        })
        .catch((err) => {});
    }

    return {
      absen,
      destroy,
    };
  },
};
</script>
