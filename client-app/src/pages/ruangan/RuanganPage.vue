<script setup>
import { computed, ref, onMounted } from "vue";
import { allRuangan, deleteRuangan } from "../../http/ruangan";
import Navbar from "../../components/Navbar.vue";

const ruangan = ref([]);
const search = ref("");

const isKelas = computed(() =>
  ruangan.value.filter((ruangan) => {
    return search.value == "" ? ruangan : ruangan.kelas.toLowerCase().match(search.value.toLowerCase());
  })
);

function destroy(id, index) {
  const answer = window.confirm("Apakah anda yakin ingin menghapus data?");
  if (answer) {
    deleteRuangan(id)
      .then((response) => {
        console.log(response);
        ruangan.value.splice(index, 1);
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
  const { data } = await allRuangan();
  ruangan.value = data.data;
  return {
    ruangan,
  };
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <h1>Data Ruangan</h1>
      <div class="row m-4">
        <div class="col-lg-7">
          <router-link :to="{ name: 'create.ruangan' }" class="btn btn-outline-primary btn-md rounded shadow mb-3"> Tambah Ruangan </router-link>
        </div>
        <div class="col-lg-5 d-flex justify-content-end">
          <div class="form-group">
            <input class="form-control text-right" type="text" v-model="search" placeholder="Cari Kelas" />
          </div>
        </div>
      </div>
      <table class="table table-striped p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table table-hover">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>KELAS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ruangan, index) in isKelas" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ ruangan.kelas }}</td>
                <td>
                  <div class="btn-group">
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.ruangan', params: { id: ruangan.id } }" class="btn btn-sm btn-outline-info">Edit</router-link>

                      <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(ruangan.id, index)">Delete</button>
                    </div>
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
