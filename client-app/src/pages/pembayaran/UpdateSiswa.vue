<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { Siswa, updateSiswa } from "../../http/siswa";
import { useRouter, useRoute } from "vue-router";

const data = reactive({
  name: "",
  nomor_induk: "",
  tanggal_lahir: "",
  agama: "",
  alamat: "",
  kelas: "",
  username: "",
  password: "",
  role: 3,
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
const route = useRoute();
let id = route.params.id;
const update = () => {
  updateSiswa(id, data)
    .then((response) => {
      console.log(response);
      router.push({ name: "siswa" });
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
  // console.log(validation);
};

onMounted(async () => {
  await Siswa(id).then((result) => {
    data.name = result.data.data.name;
    data.nomor_induk = result.data.data.nomor_induk;
    data.tanggal_lahir = result.data.data.tanggal_lahir;
    data.agama = result.data.data.agama;
    data.alamat = result.data.data.alamat;
    data.kelas = result.data.data.kelas;
    data.username = result.data.data.username;
    data.password = result.data.data.password;
    console.log(result.data.data.password);
  });
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="update">
      <h3>Tambah Siswa</h3>
      <div class="form-group">
        <label for="name">Nama Siswa</label>
        <input v-model="data.name" type="text" class="form-control" id="name" placeholder="Masukan Nama name" />
        <span class="text-danger text-center">{{ validation.name }}</span>
      </div>
      <div class="form-group">
        <label for="nomor_induk">Nomor Induk Siswa</label>
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
        <input v-model="data.agama" type="text" class="form-control" id="agama" placeholder="Masukan Nama nomor induk" />
        <span class="text-danger text-center">{{ validation.agama }}</span>
      </div>
      <div class="form-group">
        <label for="alamat">Alamat</label>
        <input v-model="data.alamat" type="text" class="form-control" id="alamat" placeholder="Masukan Nama nomor induk" />
        <span class="text-danger text-center">{{ validation.alamat }}</span>
      </div>
      <div class="form-group">
        <label for="alamusernameat">username</label>
        <input v-model="data.username" type="text" class="form-control" id="username" placeholder="Masukan Nama nomor induk" />
        <span class="text-danger text-center">{{ validation.username }}</span>
      </div>
      <div class="form-group">
        <label for="kelas">Kelas</label>
        <select v-model="data.kelas" class="form-control" id="kelas">
          <option value="1">KELAS I</option>
          <option value="2">KELAS II</option>
          <option value="3">KELAS III</option>
        </select>
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>
      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
