<script setup>
import { onMounted, ref, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import api from "../http/api";
import setAuthHeader from "../http/setAuthHeader";
import { allSiswa, deleteSiswa } from "../http/siswa";
import { allRuangan } from "../http/ruangan";
import { allPembayaran } from "../http/pembayaran";

const token = JSON.parse(localStorage.getItem("token"));

const users = ref([]);
const ruangan = ref([]);
const pembayaran = ref([]);

const isSiswa = computed(() =>
  users.value.filter((users) => {
    return users.role == 3;
  })
);
const isGuru = computed(() =>
  users.value.filter((users) => {
    return users.role == 2;
  })
);
onMounted(async () => {
  setAuthHeader(token);
  api;
  isSiswa;
  isGuru;
  const { data } = await allSiswa();
  users.value = data.data;

  allRuangan().then((result) => {
    ruangan.value = result.data.data;
  });
  allPembayaran().then((result) => {
    pembayaran.value = result.data.data;
    console.log(pembayaran);
  });
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="row">
      <!-- Earnings (Monthly) Card Example -->
      <div class="col-lg mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Siswa</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ isSiswa.length }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Guru</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ isGuru.length }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Ruangan</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ ruangan.length }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Pembayaran</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ pembayaran.length }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
