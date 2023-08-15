<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createAbsensi, Absensi, updateAbsensi } from "../../http/absensi";
import { allJadwal, Jadwal } from "../../http/jadwal";
import { useRouter,useRoute } from "vue-router";
import { allGuru, Guru } from "../../http/guru";

const user = JSON.parse(localStorage.getItem("datauser"));
const router = useRouter();
const route = useRoute();



const jadwal = ref([]);
const guru = ref([]);




var times = new Date();
var time = times.getHours() + ":" + times.getMinutes() + ":" + 
            times.getSeconds();
const data = reactive({
  keterangan : "",
  waktu: "",
  jam: time,
  jadwal_id: "",
  user_id: user.role !== 1 ? user.role :  "",
});
const validation = reactive({
  keterangan : "",
  waktu: "",
  jam: "",
  jadwal_id: "",
  user_id:  "",
});



function jadwalValue() {
  Jadwal(data.jadwal_id).then((result) => {
     jadwal.value = result.data.data.mapel
    });
}

function update() {
 console.log(route.params.id,data);
  updateAbsensi(route.params.id,data)
    .then((response) => {
      alert("data berhasil diupdate");
      router.push({ name: "absensi" });
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
}

onMounted(async () => {

   Absensi(route.params.id).then((result) => {
    data.keterangan = result.data.data.keterangan;
    data.waktu = result.data.data.waktu;
    data.jam = result.data.data.jam;
    data.user_id = result.data.data.guru.id;
    data.jadwal_id = result.data.data.jadwal.id;
    jadwalValue();

    
     Guru(data.user_id).then((result) => {
     guru.value = result.data.data
  });
   
  });

 
 
});
</script>

<template>
  <div class="card p-3 m-5 w-50">
    <form @submit.prevent="update">
      <h3>Tambah Nilai</h3>

     
      <div class="form-group">
        <label for="guru">Mata Pelajaran</label>
        <input :value="jadwal.mapel"  disabled type="text" class="form-control" id="guru" placeholder=" " />
        <span class="text-danger text-center">{{ validation.waktu }}</span>
      </div>

      <div class="form-group">
        <label for="guru">Guru</label>
        <input :value="guru.name"  disabled type="text" class="form-control" id="guru" placeholder=" " />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>

      <div class="form-group">
        <label for="kelas">Keterangan</label>
        <select v-model="data.keterangan" class="form-control" id="kelas">
          <option value="1">Masuk</option>
          <option value="2">Tidak Masuk</option>
          <option value="3">Izin</option>
        </select>
        <span class="text-danger text-center">{{ validation.kelas }}</span>
      </div>

      <div class="form-group">
        <label for="waktu">waktu</label>
        <input v-model="data.waktu" type="date" class="form-control" id="waktu" placeholder="Masukan waktu Transaksi" />
        <!-- <span class="text-danger text-center">{{ validation.waktu }}</span> -->
      </div>

      <button type="submit" class="btn btn-outline-primary">Submit</button>
    </form>
  </div>
</template>
