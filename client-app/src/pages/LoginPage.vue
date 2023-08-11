<script setup>
import { onMounted } from "vue";
import { reactive, ref } from "vue";
import api from "../http/api";
import { useRouter } from "vue-router";

const router = useRouter();
const data = reactive({
  username: "",
  password: "",
});
const validation = reactive({
  username: "",
  password: "",
  nError: "",
});

function login() {
  api
    .post("auth/login", data)
    .then((response) => {
      // simpan data user dan token di storage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("datauser", JSON.stringify(response.data.user));

      // navigasi ke route home
      router.push({ name: "home" }).fullPath;
    })
    .catch(function (error) {
      if (error.response) {
        validation.username = error.response.data.errors["username"];
        validation.password = error.response.data.errors["password"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        console.log("Error", error.message);
      }
      console.log("error" + error.config);
    });
}

onMounted(async () => {
  console.log(data);
  return {
    validation,
    data,
    login,
  };
});
</script>

<template>
  <div class="contaienr">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form class="user" @submit.prevent="login">
                      <div class="form-group">
                        <input v-model="data.username" type="text" class="form-control form-control-user" id="Inputusername" placeholder="Enter username " />
                        <span class="text-danger text-center">{{ validation.username }}</span>
                      </div>
                      <div class="form-group">
                        <input v-model="data.password" type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                        <span class="text-danger text-center">{{ validation.password }}</span>
                      </div>

                      <button class="btn btn-primary btn-user btn-block mb-3 mt-3">Login</button>
                      <hr />
                      <span class="text-danger">{{ validation.nError }}</span>
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
