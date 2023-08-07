<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'create.ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1>Ruangan</h1>
            <div class="table">
            <table class="table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Ruangan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ruangan, index) in ruangan.data" :key="index">
                  <td>{{ ruangan.kode }}</td>
                  <td>{{ ruangan.ruangan }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.ruangan', params: { id: ruangan.id } }" class="btn btn-sm btn-outline-info">Update</router-link>
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
    let ruangan = ref([]);

    onMounted(() => {
      // get data from api

      const token = JSON.parse( localStorage.getItem('token') );
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      let url = JSON.parse( localStorage.getItem('url') );

      axios
        .get(url+"v1/ruangan/")
        .then((result) => {
          ruangan.value = result.data;
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });

    function destroy(id, index) {
      axios

        .delete(url+"v1/ruangan/" + id)
        .then(() => {
          ruangan.value.data.splice(index, 1);
        })
        .catch((err) => {});
    }

    return {
      ruangan,
      destroy,
    };
  },
};
</script>
