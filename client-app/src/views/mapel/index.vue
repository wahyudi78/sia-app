<template>
  <div class="container my-5">
    
        <router-link :to="{ name: 'create.mapel' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1>Mata Pelajaran</h1>

            <div class="table-responsive w-100">
            <table class="table w-100">
              <thead class=" w-100">
                <tr >
                  <th  class="col-lg-2">No</th>
                  <th  class="col-lg-2">Kode</th>
                  <th  class="col-lg-6">Mapel</th>
                  <th  class="col-lg-4">Actions</th>
                </tr>
              </thead>
              <tbody class=" w-100">
                <tr v-for="(mapel, index) in mapel.data" :key="index" >
                  <td>{{ index+1 }}</td>
                  <td>{{ mapel.kode }}</td>
                  <td>{{ mapel.mapel }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.mapel', params: { id: mapel.id } }" class="btn btn-sm btn-outline-info">Update</router-link>
                      <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(mapel.id, index)">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
    let mapel = ref([]);
    let url = JSON.parse( localStorage.getItem('url') );


    onMounted(() => {
      // get data from api
     

      const token = JSON.parse( localStorage.getItem('token') );
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      axios
        .get(url+"v1/mapel/")
        .then((result) => {
          mapel.value = result.data;
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });

    function destroy(id, index) {
      // const token = "10|oJDWqO05sSgLOL7DVra4CTLrmw6sNedyAAdBTUIN";
      // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios

        .delete(url+"v1/mapel/" + id)
        .then(() => {
          mapel.value.data.splice(index, 1);
        })
        .catch((err) => {
          // console.log(err.message);
          // validation.value = err.errors;
        });
    }

    return {
      mapel,
      destroy,
    };
  },
};
</script>
