<template>
  <div class="container my-5">
    <div class="row justify-content-center pt-5">
      <div class="col-lg-5 align-content-center">
        <div class="card rounded shadow">
          <div class="card-body">
            <h3 class="mb-3 text-center">Login</h3>
            <!-- @csrf -->
            <!-- <form action=""> -->
            <form @submit.prevent="login">
              <!-- <div class="form-floating mb-5">
                <input type="text" v-model="data.username" class="form-control" id="floatingInput" placeholder="kode" />
                <label for="floatingInput">username </label>
              </div>
              <div class="form-floating mb-5">
                <input type="text" v-model="data.password" class="form-control" id="floatingMapel" placeholder="mapel" />
                <label for="floatingMapel">password</label>
              </div> -->
              <div class="form-group p-2">
                <label for="username" class="mb-3">Email address</label>
                <input type="text" v-model="data.username" class="form-control mb-3" id="username" placeholder="Masukan Username" />
              </div>
              <div class="form-group p-2">
                <label for="password" class="mb-3">Password</label>
                <input type="password" v-model="data.password" class="form-control mb-3" id="password" placeholder="Password" />
              </div>
              <div class="text-center">
                <button type="submit" :disabled="btn" class="btn btn-outline-primary btn-lg mb-5">Login</button>
              </div>
            </form>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { onMounted } from "vue";

import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });

    let btn = false;

    const validation = ref([]);
    const user = ref([]);

    const router = useRouter();
    let url = JSON.parse(localStorage.getItem("url"));

    // const token = "10|oJDWqO05sSgLOL7DVra4CTLrmw6sNedyAAdBTUIN";

    function login() {
      this.btn = true;
      axios
        // .request(config)
        .post(url + "auth/login", data)
        .then((response) => {
          validation.value = response;
          user.value = response.user;
          this.btn = false;

          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.user));

          router.push({ name: "index.dashboard" });
        })
        .catch((err) => {
          // console.log(err.message);
          alert(JSON.stringify(JSON.stringify(err)));
          console.log(JSON.stringify(JSON.stringify(err.message)));
          this.btn = false;

          // alert(JSON.stringify(err.message));
          // validation.value = err.errors;
        });
    }

    return {
      data,
      validation,
      router,
      login,
      btn,
    };
  },
};
</script>
