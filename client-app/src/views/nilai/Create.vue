<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'index.nilai' }" class="btn btn-outline-warning btn-lg rounded shadow mb-3"> Back </router-link>
        <div class="card rounded shadow">
          <div class="card-body">
            <!-- <form action=""> -->
            <form @submit.prevent="store">
              <!-- Siswa -->
              <div class="form-group mb-3">
                <label for="label">Pilih Siswa</label>

                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="selectedSiswa">
                  <!-- <option value="">Pilih</option> -->
                  <option v-for="(optionSiswa, index) in optionSiswa.data" :key="index" :value="optionSiswa.id">{{ optionSiswa.name }}</option>
                </select>
              </div>

              <!-- Mapel -->
              <div class="form-group mb-3">
                <label for="exampleFormControlSelect2">Pilih Mapel</label>
                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="selectedMapel">
                  <!-- <option value="">Pilih</option> -->
                  <option v-for="(optionMapel, index) in optionMapel.data" :key="index" :value="optionMapel.id">{{ optionMapel.mapel }}</option>
                </select>
              </div>

              <!-- Ruangan -->
              <div class="form-group mb-3">
                <label for="exampleFormControlSelect2">Pilih Ruangan</label>
                <select class="form-select mb-2 mt-2" aria-label="Default select example" v-model="selectedRuangan">
                  <!-- <option value="">Pilih</option> -->
                  <option v-for="(optionRuangan, index) in optionRuangan.data" :key="index" :value="optionRuangan.id">{{ optionRuangan.ruangan }}</option>
                </select>
              </div>

              <!-- Nilai -->
              <div class="mb-3">
                <label for="Nilai" class="form-label">Nilai</label>
                <input v-model="data.nilai" type="number" class="form-control" id="nilai" />
              </div>

              <!-- Waktu -->
              <div class="mb-3">
                <label for="waktu" class="form-label">Waktu</label>
                <input v-model="data.waktu" type="date" class="form-control" id="waktu" />
              </div>

              <button type="submit" class="btn btn-lg btn-outline-success">Submit</button>
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
      user_id: "",
      mapel_id: "",
      ruangan_id: "",
      waktu: "",
    });

    const optionSiswa = ref([]);
    const optionMapel = ref([]);
    const optionRuangan = ref([]);
    const selectedSiswa = "";
    const selectedMapel = "";
    const selectedRuangan = "";

    const today = new Date();
    const now = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

    const validation = ref([]);

    const router = useRouter();

    const token = JSON.parse(localStorage.getItem("token"));
    let url = JSON.parse(localStorage.getItem("url"));

    function store() {
      data.mapel_id = this.selectedMapel;
      data.ruangan_id = this.selectedRuangan;
      data.user_id = this.selectedSiswa;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .post(url + "v1/nilai", data)
        .then(() => {
          router.push({ name: "index.nilai" });
        })
        .catch((err) => {
          console.log("error :" + err);
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

    function cekdata() {
      data.mapel_id = this.selectedMapel;
      data.ruang_id = this.selectedRuangan;
      data.user_id = this.selectedSiswa;
      // data.waktu = this;
      console.log(data);
    }

    onMounted(() => {
      option("v1/users");
      option("v1/mapel");
      option("v1/ruangan");
    });

    return {
      data,
      validation,
      router,
      store,
      optionSiswa,
      optionMapel,
      optionRuangan,
      selectedSiswa,
      selectedMapel,
      selectedRuangan,
      option,
      cekdata,
      now,
    };
  },
};
</script>
