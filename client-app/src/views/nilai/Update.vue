<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1 class="text-center mb-3">Update Nilai</h1>
            <form @submit.prevent="update">
              <!-- Siswa -->
              <div class="form-group mb-3">
                <label for="label">Pilih Siswa</label>

                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="dataNilai.user_id" :required="true" v-if="optionSiswa">
                  <!-- <option value="" >{{ selectedSiswa }}</option> -->
                  <option v-for="(optionSiswa, index) in optionSiswa.data" :key="index" :value="optionSiswa.id" :v-bind="optionSiswa.id" :selected="optionSiswa.id == 'test'">{{ optionSiswa.name }}</option>
                </select>
                <select value="" v-else>
                  Loadinf
                </select>
              </div>

              <!-- Mapel -->
              <div class="form-group mb-3">
                <label for="exampleFormControlSelect2">Pilih Mapel</label>
                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="dataNilai.mapel_id">
                  <!-- <option value="">Pilih</option> -->
                  <option v-for="(optionMapel, index) in optionMapel.data" :key="index" :value="optionMapel.id">{{ optionMapel.mapel }}</option>
                </select>
              </div>

              <!-- Ruangan -->
              <div class="form-group mb-3">
                <label for="exampleFormControlSelect2">Pilih Ruangan</label>
                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="dataNilai.ruangan_id">
                  <!-- <option value="">Pilih</option> -->
                  <option v-for="(optionRuangan, index) in optionRuangan.data" :key="index" :value="optionRuangan.id">{{ optionRuangan.ruangan }}</option>
                </select>
              </div>

              <!-- Nilai -->
              <div class="mb-3">
                <label for="Nilai" class="form-label">Nilai</label>
                <input v-model="dataNilai.nilai" :value="dataNilai.nilai" type="number" class="form-control" id="nilai" />
              </div>

              <!-- Waktu -->
              <div class="mb-3">
                <label for="waktu" class="form-label">Waktu</label>
                <input asp-format="{0:yyyy-MM-dd}" v-model="dataNilai.waktu" type="date" class="form-control" id="waktu" />
              </div>

              <button type="submit" class="btn btn-lg btn-outline-success">Submit</button>
            </form>
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
    let dataNilai = reactive({
      nilai: "",
      user_id: "",
      mapel_id: "",
      ruangan_id: "",
      waktu: "",
    });

    const optionSiswa = ref([]);
    const optionMapel = ref([]);
    const optionRuangan = ref([]);

    const router = useRouter();
    const route = useRoute();
    let id = route.params.id;
    let url = JSON.parse(localStorage.getItem("url"));
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const nilai = axios.get(url + "v1/nilai/" + id).then((response) => {
      console.log(response.data);
      dataNilai.nilai = response.data.data.nilai;
      dataNilai.waktu = response.data.data.waktu;
      dataNilai.user_id = response.data.data.siswa.id;
      dataNilai.ruangan_id = response.data.data.ruang.id;
      dataNilai.mapel_id = response.data.data.mapel.id;
      // console.log(response.data.data.siswa.id);
    });

    function update() {
      const token = JSON.parse(localStorage.getItem("token"));

      axios
        // .request(config)
        .put(url + "v1/nilai/" + id, dataNilai)
        .then(() => {
          router.push({ name: "index.nilai" });
        })
        .catch((err) => {
          // console.log(err.message);
          alert(JSON.stringify(err.message));

          // validation.value = err.errors;
        });
    }
    function option(path) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get(url + path)
        .then((result) => {
          if (path === "v1/users") {
            optionSiswa.value = result.data;
          }
          if (path === "v1/mapel") {
            optionMapel.value = result.data;
          }
          if (path === "v1/ruangan") {
            optionRuangan.value = result.data;
          }

          // alert(siswaData);
        })
        .catch((err) => {
          // console.log(err.response.statusText);
          console.log(err);
        });
    }
    onMounted(() => {
      option("v1/users");
      option("v1/mapel");
      option("v1/ruangan");
      nilai;
    });

    return {
      dataNilai,
      router,
      update,
      optionSiswa,
      optionMapel,
      optionRuangan,

      option,
      nilai,
    };
  },
};
</script>
