<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow text-center">
          <div class="card-body">
            <!-- <form action=""> -->
            <form @submit.prevent="store">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Pilh Siswa</option>
                  <option v-for="(siswaData, index) in siswaData" :key="index" :value="siswaData.id">{{ siswaData.nama }}</option>
                </select>
                <label for="floatingSelect">Works with selects</label>
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
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const data = reactive({
      nilai: "",
      siswa: "",
      guru: "",
      mapel: "",
      ruang: "",
      waktu: "",
    });
    const siswa = reactive({
      nilai: "",
      siswa: "",
      guru: "",
      mapel: "",
      ruang: "",
      waktu: "",
    });
    let siswaData = ref([]);

    const validation = ref([]);

    const router = useRouter();

    const token = JSON.parse( localStorage.getItem('token') );
    let url = JSON.parse( localStorage.getItem('url') );

    function store() {
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .post(url+"v1/nilai", data)
        .then(() => {
          // console.log(JSON.stringify(response));
          // alert(JSON.stringify(response));
          // // validation.value = response;
          // router.push({
          //   name: "index.mapel",
          // });
          router.push({ name: "index.nilai" });
        })
        .catch((err) => {
          // console.log(err.message);
          // alert(JSON.stringify(err.message));
          // validation.value = err.errors;
        });
    }

    onMounted(() => {
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get(url+"v1/siswa/")
        .then((result) => {
          siswaData.value = result.data;
          // alert(siswaData);
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    });

    function getSiswa() {
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get(url+"v1/siswa/")
        .then((result) => {
          siswaData.value = result.data;
          // alert(siswaData);
        })
        .catch((err) => {
          console.log(err.response.statusText);
        });
    }

    return {
      data,
      validation,
      router,
      store,
      getSiswa,
    };
  },
};
</script>
