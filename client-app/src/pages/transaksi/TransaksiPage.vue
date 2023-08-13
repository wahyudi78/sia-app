<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { allTransaksi, deleteTransaksi, createTransaksi } from "../../http/transaksi";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../../components/Navbar.vue";

// import ModalMapel from "../components/mapel/modalMapel.vue";

const transaksi = ref([]);

const user = JSON.parse(localStorage.getItem("datauser"));
const router = useRouter();
const route = useRoute();
let id = route.params.id;

const isTransaksi = computed(() =>
  transaksi.value.filter((transaksi) => {
    return transaksi.pembayaran.id == id;
  })
);
const isSiswaTransaksi = computed(() =>
  transaksi.value.filter((transaksi) => {
    return transaksi.siswa.id == user.id;
  })
);

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

const current = new Date();
const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

const dataTransaksi = {
  kode: 222222,
  pembayaran_id: route.params.id,
  user_id: user.id,
  waktu: date,
  status: 1,
};

const create = async () => {
  console.log(route.params.id);
  await createTransaksi(dataTransaksi)
    .then((response) => {
      // console.log("Create Transaksi = " + JSON.stringify(response));
      // router.push({ name: "transaksi", params: { id: id } });
      pay(response.data.token);
      console.log(response);
      //   mapel.value = data.data;
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
      const { data } = allTransaksi();
      transaksi.value = data.data;
      console.log(result);
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      alert("wating your payment!");
      console.log(result);
    },
    onError: function (result) {
      /* You may add your own implementation here */
      alert("payment failed!");
      console.log(result);
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert("you closed the popup without finishing the payment");
    },
  });
}

onMounted(async () => {
  const { data } = await allTransaksi();
  transaksi.value = data.data;
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <!-- Button trigger modal -->
      <h1>Data Transaksi</h1>
      <div class="row m-4">
        <div v-if="user.role != -3" class="col-lg-5">
          <!-- <rbutton @click="create()" class="btn btn-sm btn-outline-info">Buat Transaksi</rbutton> -->
          <router-link :to="{ name: 'create.transaksi', params: { id: id } }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Buat Transaksi Baru </router-link>
        </div>
        <div v-else class="col-lg-5">
          <!-- <rbutton @click="create()" class="btn btn-sm btn-outline-info">Buat Transaksi</rbutton> -->
          <router-link @onClick.prevent="create()" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Buat Transaksi Baru </router-link>
        </div>
      </div>

      <table class="table table-hover p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Transaksi</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th v-if="user.role == 4">Action</th>
              </tr>
            </thead>
            <tbody v-if="user.role != 3">
              <tr v-for="(isTransaksi, index) in isTransaksi" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isTransaksi.kode }}</td>
                <td>{{ isTransaksi.pembayaran.pembayaran }}</td>
                <td>{{ isTransaksi.status }}</td>
                <td v-if="user.role == 4">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-info">Bayar</button>
                    <button class="btn btn-sm btn-outline-warning">Batal</button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="user.role == 3">
              <tr v-for="(isSiswaTransaksi, index) in isSiswaTransaksi" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ isSiswaTransaksi.kode }}</td>
                <td>{{ isSiswaTransaksi.pembayaran.pembayaran }}</td>
                <td>{{ isSiswaTransaksi.status }}</td>
                <td v-if="user.role == 4">
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-info">Bayar</button>
                    <button class="btn btn-sm btn-outline-warning">Batal</button>
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
