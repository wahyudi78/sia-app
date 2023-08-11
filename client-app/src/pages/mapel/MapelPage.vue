<script setup>
import { computed, ref, onMounted } from "vue";
import { allMapel, deleteMapel } from "../../http/mapel";
import Navbar from "../../components/Navbar.vue";
// import ModalMapel from "../components/mapel/modalMapel.vue";

const mapel = ref([]);

const user = JSON.parse(localStorage.getItem("datauser"));

function destroy(id, index) {
  const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
  if (answer) {
    deleteMapel(id)
      .then((response) => {
        console.log(response);
        mapel.value.splice(index, 1);
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
  const { data } = await allMapel();
  mapel.value = data.data;
  destroy;
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <!-- Button trigger modal -->
      <h1>Data Mata Pelajaran</h1>
      <div v-if="user.role == 2 || user.role == 1" class="row m-4">
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.mapel' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>

      <table class="table table-hover p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>MAPEL</th>
                <th>KELAS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mapel, index) in mapel" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ mapel.mapel }}</td>
                <td>{{ mapel.kelas }}</td>
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
        <!-- </DataTable> -->
      </table>
    </div>
  </div>
</template>
