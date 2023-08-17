<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { allPembayaran, deletePembayaran } from "../../http/pembayaran";
import { createTransaksi } from "../../http/transaksi";
import Navbar from "../../components/Navbar.vue";
// import ModalMapel from "../components/mapel/modalMapel.vue";

const pembayaran = ref([]);

const user = JSON.parse(localStorage.getItem("datauser"));

function dataPembayaran() {
  allPembayaran().then((result) => {
    pembayaran.value = result.data.data;
    console.log(result.data);
  });
}

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

const dataTransaksi = reactive({
  kode: user.id + user.role + user.ruangan_id + Math.floor(Math.random() * 999) + 100,
  pembayaran_id: "",
  user_id: user.id,
  waktu: "2023-08-15",
  status: 1,
});

const create = async (id) => {
  // alert(JSON.stringify(dataTransaksi));
  dataTransaksi.pembayaran_id = id;

  await createTransaksi(dataTransaksi)
    .then((response) => {
      pay(response.data.token);
      console.log(response);
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
};

function pay(token) {
  console.log(token);
  // Create Snap API instance
  window.snap.pay(token, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      alert("payment success!");
      router.push({ name: "transaksi" });
      localStorage.setItem("sukses", JSON.stringify(result));
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      alert("wating your payment!");
      console.log(result);
      localStorage.setItem("pending", JSON.stringify(result));
    },
    onError: function (result) {
      /* You may add your own implementation here */
      alert("payment failed!");
      console.log(result);
      localStorage.setItem("error", JSON.stringify(result));
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert("you closed the popup without finishing the payment");
    },
  });
}

onMounted(async () => {
  dataPembayaran();
  // destroy;
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <!-- Button trigger modal -->
      <h1>Data Pembayaran</h1>
      <div v-if="user.role !== 3" class="row m-4">
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
                  <div v-if="user.role !== 3" class="btn-group">
                    <router-link :to="{ name: 'transaksi', params: { id: pembayaran.id } }" class="btn btn-sm btn-outline-info">Buka</router-link>
                    <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(pembayaran.id, index)">Delete</button>
                  </div>
                  <div v-else class="btn-group">
                    <input type="text" disabled hidden v-model="pembayaran.id" />
                    <button @click="create(pembayaran.id)" class="btn btn-sm btn-outline-info">Bayar</button>
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
