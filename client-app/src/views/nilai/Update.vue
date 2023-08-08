<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col align-content-center">
        <router-link :to="{ name: 'create.nilai' }" class="btn btn-outline-primary btn-lg rounded shadow mb-3"> Add </router-link>
        <div class="card rounded shadow text-start">
          <div class="card-body">
            <h1>Nilai</h1>
            <div class="table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Siswa</th>
                    <th>Mata Pelajaran</th>
                    <th>Ruangan</th>
                    <th>Nilai</th>
                    <th>Waktu</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(nilai, index) in nilai.data" :key="index">
                    <td>{{ nilai.siswa.name }}</td>
                    <td>{{ nilai.mapel.mapel }}</td>
                    <td>{{ nilai.ruang.ruangan }}</td>
                    <td>{{ nilai.nilai }}</td>
                    <td>{{ nilai.waktu }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{ name: 'update.nilai', params: { id: nilai.id } }" class="btn btn-sm btn-outline-info">Update</router-link>
                        <button class="btn btn-sm btn-outline-warning" @click.prevent="destroy(ruangan.id, index)">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();
    let id = route.params.id;
    let url = JSON.parse(localStorage.getItem("url"));
    const token = JSON.parse(localStorage.getItem("token"));
    onMounted(() => {
      axios.get(url + "v1/nilai/" + id).then((result) => {
        data.mapel_id = this.result.data.mapel_id;
        data.ruangan_id = this.result.data.ruangan_id;
        data.user_id = this.result.data.user_id;
      });
    });

    function update() {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .put(url + "v1/nilai/" + id, data)
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
    });

    return {
      data,
      validation,
      router,
      update,
      optionSiswa,
      optionMapel,
      optionRuangan,
      selectedSiswa,
      selectedMapel,
      selectedRuangan,
      option,
      cekdata,
    };
  },
};
</script>
