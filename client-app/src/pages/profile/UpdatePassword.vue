<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { ubahPassword } from "../../http/user";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../../components/Navbar.vue";

const users = JSON.parse(localStorage.getItem("datauser"));
const router = useRouter();

const data = reactive({
  id: users.id,
  old_password: "",
  new_password: "",
});
const konfirmasi = reactive({ konf: "" });

const update = () => {
  if (konfirmasi.conf !== data.new_password) {
    alert("Ulangi password tidak sesuai");
  }
  ubahPassword(data)
    .then((response) => {
      alert("Password berhasil diubah");

      router.push({ name: "home" });
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
        // validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        // validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  // console.log(validation);
};

onMounted(async () => {});
</script>

<template>
  <Navbar />

  <div class="card p-3 m-5 w-50">
    <h3>Update Password</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="name">Password Lama</label>
        <input v-model="data.old_password" type="text" class="form-control" id="name" placeholder="password lama" />
      </div>
      <div class="form-group">
        <label for="password_baru">Password Baru</label>
        <input v-model="data.new_password" type="text" class="form-control" id="password_baru" placeholder="password baru" />
      </div>
      <div class="form-group">
        <label for="password_confirm">Ulangi Password Baru</label>
        <input v-model="konfirmasi.conf" type="text" class="form-control" id="password_confirm" placeholder="ulangi password baru" />
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
