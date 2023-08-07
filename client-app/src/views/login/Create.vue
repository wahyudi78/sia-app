<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.mapel' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow text-center">
          <div class="card-body">
            <form action="">
              <form @submit.prevent="store">
                <div class="form-floating mb-3">
                  <input type="text" v-model="data.kode" class="form-control" id="floatingInput" placeholder="kode" />
                  <label for="floatingInput">Kode </label>
                </div>
                <div class="form-floating">
                  <input v-model="data.mapel" type="text" class="form-control" id="floatingMapel" placeholder="mapel" />
                  <label for="floatingMapel">Mapel</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const data = reactive({
      kode: "",
      mapel: "",
    });

    const validation = ref([]);

    const router = useRoute();

    const token = JSON.parse( localStorage.getItem('token') );
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/v1/mapel",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    function store() {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          router.push({
            name: index.mapel,
          });
        })
        .catch((error) => {
          console.log(error);
          validation.value = err.response.data;
        });
    }

    return {
      data,
      validation,
      router,
      store,
    };
  },
};
</script>
