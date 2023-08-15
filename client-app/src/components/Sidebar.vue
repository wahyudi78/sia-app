<script setup>
import { computed, ref, onMounted } from "vue";

const user = JSON.parse(localStorage.getItem("datauser"));
onMounted(async () => {
  return {
    user,
  };
});
</script>

<template>
  <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->

    <router-link to="/" class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">SI <sup>Akademik</sup></div>
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'home' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></router-link
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->

    <!-- Nav Item - Utilities Collapse Menu -->
    <li v-if="user.role == 1" class="nav-item">
      <a class="nav-link" href="#" data-toggle="collapse" data-target="#master" aria-expanded="true" aria-controls="master">
        <i class="fas fa-fw fa-data"></i>
        <span>Master Data</span>
      </a>
      <div id="master" class="collapse show" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Mata Pelajaran</h6>
          <router-link to="/mapel" class="collapse-item">Mata Pelajaran</router-link>
          <router-link to="/ruangan" class="collapse-item" href="utilities-border.html">Ruangan</router-link>
          <router-link to="/siswa" class="collapse-item" href="utilities-animation.html">Siswa</router-link>
          <router-link to="/guru" class="collapse-item" href="utilities-other.html">Guru</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" data-toggle="collapse" data-target="#Layanan" aria-expanded="true" aria-controls="Layanan">
        <i class="fas fa-fw fa-service"></i>
        <span>Layanan</span>
      </a>
      <div id="Layanan" class="collapse show" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Siswa</h6>
          <router-link to="/nilai" class="collapse-item" href="utilities-color.html">Nilai</router-link>
          <h6 class="collapse-header">Guru</h6>
          <router-link v-if="user.role !== 3" to="/absensi" class="collapse-item" href="utilities-border.html">Absensi</router-link>
          <router-link to="/jadwal" class="collapse-item" href="utilities-border.html">Jadwal</router-link>
          <h6 class="collapse-header">Pembayaran</h6>
          <router-link to="/pembayaran" class="collapse-item" href="utilities-animation.html">Pembayaran SpP</router-link>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <!--  -->

    <!-- Divider -->
  </ul>
  <!-- End of Sidebar -->
</template>
