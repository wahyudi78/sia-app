<script setup>
import { computed, ref, onMounted, onBeforeMount } from "vue";

import { allGuru, deleteGuru } from "../../http/guru";
import Navbar from "../../components/Navbar.vue";

const guru = ref([]);
const isGuru = computed(() =>
  guru.value.filter((guru) => {
    return guru.role == 2;
  })
);

function destroy(id, index) {
  deleteGuru(id)
    .then((response) => {
      console.log(response);
      guru.value.splice(index, 1);
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

onMounted(async () => {
  // const { data } = await allguru();
  // guru.value = data.data;
  // console.log(isGuru.value[0].name);
  return {
    guru,
    isGuru,
  };
});

onBeforeMount(async () => {
  const { data } = await allGuru();
  guru.value = data.data;
  // console.log(isguru.value[0].name);
  return {
    guru,
    isGuru,
  };
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <h1>Data Guru</h1>
      <div class="row m-4">
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.guru' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>
      <table class="table table-striped p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table table-hover">
          <table class="table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>NAMA</th>
                <th>AGAMA</th>
                <th>ALAMAT</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(isGuru, index) in isGuru" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isGuru.name }}</td>
                <td>{{ isGuru.agama }}</td>
                <td>{{ isGuru.alamat }}</td>
                <td>
                  <div class="btn-group">
                    <router-link :to="{ name: 'update.guru', params: { id: isGuru.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(isGuru.id, index)">Delete</button>
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
