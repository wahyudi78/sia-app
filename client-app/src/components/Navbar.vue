<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="container justify-content-center text-center">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'index.dashboard' }" class="nav-link"> Home </router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Absensi</a> -->
              <router-link :to="{ name: 'index.absensi' }" class="nav-link"> Absensi </router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Absensi</a> -->
              <router-link :to="{ name: 'index.mapel' }" class="nav-link"> Mapel </router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Absensi</a> -->
              <router-link :to="{ name: 'index.ruangan' }" class="nav-link"> Ruangan </router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Absensi</a> -->
              <router-link :to="{ name: 'index.nilai' }" class="nav-link"> Nilai </router-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="#">Absensi</a> -->
            </li>
            <div class="d-flex justify-content-end float-right">
              <button class="btn btn-sm btn-outline-warning" @click.prevent="logout()">Logout</button>

            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const token = JSON.parse( localStorage.getItem('token') );
const url = JSON.parse( localStorage.getItem('url') );
const router = useRouter();
function logout(){
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        // .request(config)
        .post(url+"auth/logout")
        .then((res) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if(res.status==200){

            this.router.push({ name: "index.login" });
          }
        })
        .catch((err) => {
          router.push({ name: "index.login" });
          
        });
}
</script>