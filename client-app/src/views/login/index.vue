<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <div class="card rounded shadow text-center">
          <div class="card-body">
            <h3 class="text-center mb-3">Login</h3>
            <!-- @csrf -->
            <!-- <form action=""> -->
            <form @submit.prevent="login">
              <div class="form-floating mb-5">
                <input type="text" v-model="data.username" class="form-control" id="floatingInput" placeholder="kode" />
                <label for="floatingInput">username </label>
              </div>
              <div class="form-floating mb-5">
                <input type="text" v-model="data.password" class="form-control" id="floatingMapel" placeholder="mapel" />
                <label for="floatingMapel">password</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
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

    const validation = ref([]);
    const user = ref([]);

    const router = useRouter();
    let url = JSON.parse( localStorage.getItem('url') );

    // const token = "10|oJDWqO05sSgLOL7DVra4CTLrmw6sNedyAAdBTUIN";

    function login() {
      // const token = "10|oJDWqO05sSgLOL7DVra4CTLrmw6sNedyAAdBTUIN";
      // axios.defaults.headers.common["Authorization"] = "Bearer ";
      axios
        // .request(config)
        .post(url+"auth/login", data)
        .then((response) => {
          console.log(JSON.stringify(response));
          validation.value = response;
          user.value = response.user;
          console.log(response.user);
          localStorage.setItem( 'token', JSON.stringify(response.data.token) );
          localStorage.setItem( 'user', JSON.stringify(response.data.user) );
          
          router.push({ name: "index.mapel" });
        })
        .catch((err) => {
          // console.log(err.message);
          alert(JSON.stringify(err.user));

          // alert(JSON.stringify(err.message));
          // validation.value = err.errors;
        });
    }
    
    return {
      data,
      validation,
      router,
      login,
    };
  },
};
</script>
