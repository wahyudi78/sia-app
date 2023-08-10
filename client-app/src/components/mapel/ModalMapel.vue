<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { createMapel, allMapel } from "../../http/mapel";

const data = reactive({
  mapel: "",
  kelas: "",
});
const validation = reactive({
  mapel: "",
  kelas: "",
});
// const emit = defineEmits(["create"]);

// const cretaMapel = (event) => {
//   if (event.target.value) {
//     data.mapel = event.target.value;
//     data.kelas = event.target.value;
//     event.targer.value = "";
//     emit("create", createMapel);
//   }
// };

const create = async () => {
  await createMapel(data)
    .then((response) => {
      console.log(response);
      this.closeModal();
      this.mapel.value.unshift(response.data);

      //   mapel.value = data.data;
    })
    .catch(function (error) {
      if (error.response) {
        validation.mapel = error.response.data.errors["mapel"];
        validation.kelas = error.response.data.errors["kelas"];
      } else if (error.request) {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";
      } else {
        validation.nError = "Gagal terhubung ke server, silahkan periksa koneksi anda";

        // console.log("Error", error.message);
      }
      //   console.log("error" + error.config);
    });
  console.log(validation);
};
</script>
<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form @submit.prevent="create">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah Mata Pelajaran</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="mapel">Mata Pelajaran</label>
              <input v-model="data.mapel" type="text" class="form-control" id="mapel" placeholder="Masukan Nama Mapel" />
              <span class="text-danger text-center">{{ validation.mapel }}</span>
            </div>
            <div class="form-group">
              <label for="kelas">Kelas</label>
              <select v-model="data.kelas" class="form-control" id="kelas">
                <option value="1">KELAS I</option>
                <option value="2">KELAS II</option>
                <option value="3">KELAS III</option>
              </select>
              <span class="text-danger text-center">{{ validation.kelas }}</span>
            </div>

            <!-- <button type="submit" class="btn btn-primary">Simpan</button> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
