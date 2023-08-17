<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createTransaksi } from "../../http/transaksi";
import { allSiswa } from "../../http/siswa";
import { ModelListSelect } from "vue-search-select";
import { useRouter, useRoute } from "vue-router";

// const pass = ref(data.username);
const user = JSON.parse(localStorage.getItem("datauser"));

const router = useRouter();
const route = useRoute();

let idPembayaran = route.params.id;

const siswa = ref([]);

const isSiswa = computed(() =>
  siswa.value.filter((siswa) => {
    return siswa.role == 3;
  })
);

const dataTransaksi = reactive({
  kode: "",
  pembayaran_id: idPembayaran,
  user_id: "",
  waktu: "",
  status: 1,
});

const validation = reactive({});

const create = async () => {
  dataTransaksi.kode = idPembayaran + dataTransaksi.user_id + Math.floor(Math.random() * 999) + 100;
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
  const { data } = await allSiswa();
  siswa.value = data.data;
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Bayar SPP Siswa</h3>
      <div class="form-group">
        <label for="waktu">Waktu Pembayaran</label>
        <input v-model="dataTransaksi.waktu" type="date" class="form-control" id="waktu" placeholder="Masukan Waktu Transaksi" />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>
      <div class="form-group">
        <label for="bulan">Pilih Siswa</label>
        <model-list-select :list="isSiswa" v-model="dataTransaksi.user_id" option-value="id" option-text="name" placeholder="select item"> </model-list-select>
        <!-- <span class="text-danger text-center">{{ validation.bulan }}</span> -->
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
