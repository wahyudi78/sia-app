<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createGuru } from "../../http/guru";
import { allRuangan } from "../../http/ruangan";

import { useRouter } from "vue-router";
import { ModelListSelect } from "vue-search-select";

const ruangan = ref([]);

// const pass = ref(data.username);

const data = reactive({
  name: "",
  nomor_induk: "",
  tanggal_lahir: "",
  agama: "",
  alamat: "",
  kelas: "",
  username: "",
  password: "",
  role: 2,
});
const validation = reactive({
  name: "",
  nomor_induk: "",
  tanggal_lahir: "",
  agama: "",
  alamat: "",
  kelas: "",
  username: "",
});
const router = useRouter();

function optionRuangan() {
  allRuangan().then((result) => {
    ruangan.value = result.data.data;
  });
}

const create = async () => {
  data.password = data.username;
  await createGuru(data)
    .then((response) => {
      // console.log(response);
      router.push({ name: "guru" });

      //   mapel.value = data.data;
    })
    .catch(function (error) {
      if (error.response) {
        validation.name = error.response.data.errors["name"];
        validation.nomor_induk = error.response.data.errors["nomor_induk"];
        validation.tanggal_lahir = error.response.data.errors["tanggal_lahir"];
        validation.agama = error.response.data.errors["agama"];
        validation.alamat = error.response.data.errors["alamat"];
        validation.kelas = error.response.data.errors["kelas"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  console.log(validation);
};

onMounted(async () => {
  optionRuangan();
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="create">
      <h3>Tambah Guru</h3>
      <div class="form-group">
        <label for="name">Nama Guru</label>
        <input v-model="data.name" type="text" class="form-control" id="name" placeholder="Masukan Nama name" />
        <span class="text-danger text-center">{{ validation.name }}</span>
      </div>
      <div class="form-group">
        <label for="nomor_induk">Nomor Induk Pegawai</label>
        <input v-model="data.nomor_induk" type="number" class="form-control" id="nomor_induk" placeholder="Masukan Nama nomor induk" />
        <span class="text-danger text-center">{{ validation.nomor_induk }}</span>
      </div>
      <div class="form-group">
        <label for="tanggal_lahir">Tanggal Lahir</label>
        <input v-model="data.tanggal_lahir" type="date" class="form-control" id="tanggal_lahir" />
        <span class="text-danger text-center">{{ validation.tanggal_lahir }}</span>
      </div>
      <div class="form-group">
        <label for="agama">Agama</label>
        <input v-model="data.agama" type="text" class="form-control" id="agama" placeholder="Masukan Agama" />
        <span class="text-danger text-center">{{ validation.agama }}</span>
      </div>
      <div class="form-group">
        <label for="alamat">Alamat</label>
        <input v-model="data.alamat" type="text" class="form-control" id="alamat" placeholder="Masukan Alamat" />
        <span class="text-danger text-center">{{ validation.alamat }}</span>
      </div>
      <div class="form-group">
        <label for="alamusernameat">username</label>
        <input v-model="data.username" type="text" class="form-control" id="username" placeholder="Masukan username" />
        <span class="text-danger text-center">{{ validation.username }}</span>
      </div>
      <div class="form-group">
        <label for="ruangan">Ruangan</label>
        <model-list-select :list="ruangan" v-model="data.ruangan_id" option-value="id" option-text="kelas" placeholder="select item"> </model-list-select>
        <span class="text-danger text-center">{{ validation.ruangan_id }}</span>
      </div>
      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
