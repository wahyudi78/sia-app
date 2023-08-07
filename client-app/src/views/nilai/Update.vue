<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.ruangan' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow text-center">
          <div class="card-body">
            <!-- <form action=""> -->
            <form @submit.prevent="update">
              <div class="form-floating mb-3">
                <input type="text" v-model="data.kode" class="form-control" id="floatingInput" placeholder="kode" />
                <label for="floatingInput">Kode </label>
                <div v-if="validation.kode" class="text-danger">
                  {{ validation.errors["kode"] }}
                </div>
              </div>
              <div class="form-floating">
                <input v-model="data.ruangan" type="text" class="form-control" id="floatingMapel" placeholder="mapel" />
                <label for="floatingMapel">Mapel</label>
                <div v-if="validation.mapel" class="text-danger">
                  {{ validation.errors["mapel"] }}
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
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let data = reactive({
      kode: "",
      ruangan: "",
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();
    let id = route.params.id;
    let url = JSON.parse( localStorage.getItem('url') );
    const token = JSON.parse( localStorage.getItem('token') );
    onMounted(() => {
      axios.get(url+"v1/ruangan/" + id).then((result) => {
        data.kode = result.data.data.kode;
        data.ruangan = result.data.data.ruangan;
      });
    });

    function update() {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .put(url+"v1/ruangan/" + id, data)
        .then(() => {
          // console.log(JSON.stringify(response));
          // alert(JSON.stringify(response));
          // validation.value = response;
          // router.push({
          //   name: "index.ruangan",
          // });
          router.push({ name: "index.ruangan" });
        })
        .catch((err) => {
          // console.log(err.message);
          alert(JSON.stringify(err.message));

          // validation.value = err.errors;
        });
    }

    return {
      data,
      validation,
      router,
      update,
    };
  },
};
</script>
