<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow text-center">
          <div class="card-body">
            <!-- <form action=""> -->
            <form @submit.prevent="store">
              <div class="form-floating mb-3">
                <input type="text" v-model="data.kode" class="form-control" id="floatingInput" placeholder="kode" />
                <label for="floatingInput">Kode </label>
                <div v-if="validation.kode" class="text-danger">
                  {{ validation.errors["kode"] }}
                </div>
              </div>
              <div class="form-floating">
                <input v-model="data.ruangan" type="text" class="form-control" id="floatingRuangan" placeholder="ruangan" />
                <label for="floatingRuangan">Ruangan</label>
                <div v-if="validation.mapel" class="text-danger">
                  {{ validation.errors["ruangan"] }}
                </div>
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
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const data = reactive({
      kode: "",
      ruangan: "",
    });

    const validation = ref([]);

    const router = useRouter();

    const token = JSON.parse( localStorage.getItem('token') );
    let url = JSON.parse( localStorage.getItem('url') );

    function store() {
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .post(url+"v1/ruangan", data)
        .then(() => {
          // console.log(JSON.stringify(response));
          // alert(JSON.stringify(response));
          // // validation.value = response;
          // router.push({
          //   name: "index.mapel",
          // });
          router.push({ name: "index.ruangan" });
        })
        .catch((err) => {
          // console.log(err.message);
          // alert(JSON.stringify(err.message));
          // validation.value = err.errors;
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
