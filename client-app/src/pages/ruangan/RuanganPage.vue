<script setup>
import { computed, ref, onMounted } from "vue";
import { allRuangan, deleteRuangan } from "../../http/ruangan";
import Navbar from "../../components/Navbar.vue";


const ruangan = ref([]);
function destroy(id, index) {

  const answer = window.confirm("Apakah anda yakin ingin menghapus data?");
if (answer) {
  function destroy(id, index) {
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
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>
      <table class="table table-striped p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table table-hover">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>RUANGAN</th>
                <th>KELAS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ruangan, index) in ruangan" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ ruangan.ruangan }}</td>
                <td>{{ ruangan.kelas }}</td>
                <td>
                  <div class="btn-group">
                    <div class="btn-group">
                      <router-link :to="{ name: 'update.ruangan', params: { id: ruangan.id } }" class="btn btn-sm btn-outline-info">Update</router-link>

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
