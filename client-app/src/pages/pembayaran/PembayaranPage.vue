<script setup>
import { computed, ref, onMounted } from "vue";
import { allPembayaran, deletePembayaran } from "../../http/pembayaran";
import Navbar from "../../components/Navbar.vue";
// import ModalMapel from "../components/mapel/modalMapel.vue";

const pembayaran = ref([]);

const user = JSON.parse(localStorage.getItem("datauser"));

function destroy(id, index) {
  const answer = window.confirm("Apakah anda yakin ingin menghapus data?");
  if (answer) {
    deletePembayaran(id)
      .then((response) => {
        console.log(response);
        pembayaran.value.splice(index, 1);
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
  const { data } = await allPembayaran();
  pembayaran.value = data.data;
  destroy;
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <!-- Button trigger modal -->
      <h1>Data Pembayaran</h1>
      <div v-if="user.role == 2 || user.role == 1" class="row m-4">
        <div class="col-lg-5">
          <router-link :to="{ name: 'create.pembayaran' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        </div>
      </div>

      <table class="table table-hover p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>pembayaran</th>
                <th>Bulan</th>
                <th>total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pembayaran, index) in pembayaran" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ pembayaran.pembayaran }}</td>
                <td>{{ pembayaran.bulan }}</td>
                <td>{{ pembayaran.total }}</td>
                <td>
                  <div class="btn-group">
                    <!-- <router-link :to="{ name: 'update.mapel', params: { id: mapel.id } }" class="btn btn-sm btn-outline-info">Update</router-link> -->

                    <router-link :to="{ name: 'transaksi', params: { id: pembayaran.id } }" class="btn btn-sm btn-outline-info">Buka</router-link>
                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(pembayaran.id, index)">Delete</button>
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
