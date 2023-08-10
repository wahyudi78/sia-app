<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import { computed, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { allUser } from "../http/user";
import Navbar from "../components/Navbar.vue";

DataTable.use(DataTablesLib);

const user = ref([]);

onMounted(async () => {
  const { data } = await allUser();
  user.value = data.data;
  console.log(user.value[0].name);
  return {
    user,
  };
});
</script>

<template>
  <Navbar />
  <div class="conatiner m-3">
    <div class="card p-3">
      <table class="table table-striped p-5">
        <!-- <DataTable :data="isGuru" class="display"> -->
        <div class="table table-hover">
          <table class="table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>NAMA</th>
                <th>AGAMA</th>
                <th>ALAMAT</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in user" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.agama }}</td>
                <td>{{ user.alamat }}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-info">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- </DataTable> -->
      </table>
    </div>
  </div>
</template>
