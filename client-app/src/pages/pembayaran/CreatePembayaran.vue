<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createPembayaran } from "../../http/pembayaran";
import { useRouter } from "vue-router";
import { ModelListSelect } from "vue-search-select";

// const pass = ref(data.username);
const user = JSON.parse(localStorage.getItem("datauser"));

var myDate = new Date();

let gCOde = Math.random() * 20;

const data = reactive({
  pembayaran: "",
  bulan: "",
  user_id: user.id,
  order_id: gCOde,
  total: "",
  status: 1,
});

const bulanOption = [
  { code: "JANUARI", name: "JANUARI", desc: "desc01" },
  { code: "FEBUARI", name: "FEBUARI", desc: "desc02" },
  { code: "MARET", name: "MARET", desc: "desc03" },
  { code: "APRIL", name: "APRIL", desc: "desc04" },
  { code: "MEI", name: "MEI", desc: "desc05" },
  { code: "JUNI", name: "JUNI", desc: "desc05" },
  { code: "JULI", name: "JULI", desc: "desc06" },
  { code: "AGUSTUS", name: "AGUSTUS", desc: "desc06" },
  { code: "SEPTEMBER", name: "SEPTEMBER", desc: "desc06" },
  { code: "OKTOBER", name: "OKTOBER", desc: "desc06" },
  { code: "NOVEMBER", name: "NOVEMBER", desc: "desc06" },
  { code: "DESEMBER", name: "DESEMBER", desc: "desc06" },
];
const validation = reactive({
  pembayaran: "",
  bulan: "",
  total: "",
});

const router = useRouter();

const create = async () => {
  await createPembayaran(data)
    .then((response) => {
      // console.log(response);
      router.push({ name: "pembayaran" });

      //   mapel.value = data.data;
    })
    .catch(function (error) {
      if (error.response) {
        validation.pembayaran = error.response.data.errors["pembayaran"];
        validation.bulan = error.response.data.errors["bulan"];
        validation.total = error.response.data.errors["total"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
};
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Tambah Pembayaran SPP</h3>
      <div class="form-group">
        <label for="pembayaran">Pembayaran</label>
        <input v-model="data.pembayaran" type="text" class="form-control" id="pembayaran" placeholder="Masukan Nama pembayaran" />
        <span class="text-danger text-center">{{ validation.pembayaran }}</span>
      </div>
      <div class="form-group">
        <label for="bulan">Bulan</label>
        <model-list-select :list="bulanOption" v-model="data.bulan" option-value="code" option-text="name" placeholder="select item"> </model-list-select>
        <span class="text-danger text-center">{{ validation.bulan }}</span>
      </div>
      <div class="form-group">
        <label for="total">Total</label>
        <input v-model="data.total" type="number" class="form-control" id="total" />
        <span class="text-danger text-center">{{ validation.total }}</span>
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
