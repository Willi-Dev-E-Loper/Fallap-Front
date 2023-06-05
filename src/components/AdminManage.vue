<template>
  <div class="container-fluid">
    <button class="logo-back ml-6 mt-7 " @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0">
        <h1>Gestiò administradors</h1>
      </div>


      <v-select
          class="mt-4  p-0 custom-select"
          v-model="fallaSeleccionada"
          :items="fallas"
          v-on:update:modelValue="getUsers"
          item-value="idFalla"
          item-title="nombre"
          label="Tria una falla"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>
      <v-select
          v-if="usuarios.length>0"
          density="comfortable"
          class="mt-4  p-0 custom-select"
          v-model="usuarioSeleccionado"
          :items="usuarios"
          item-value="idFallero"
          item-title="nombre"
          label="Tria un faller"
          color="var(--dl-color-miostodos-moradoprincipal)"
          v-on:update:modelValue="checkAdmin"
          variant="outlined"
          clearable
          return-object
      ></v-select>

      <div class="form-check">
        <input class="form-check-input custom-checkbox" type="checkbox" :checked="isAdmin" @change="toggleCheckbox">
        <label class="form-check-label" for="myCheckbox">
          Es administrador?
        </label>
      </div>
      <button class="btn d-flex col-sm-12 boton" @click="submitAdmin">
        Actualitzar
      </button>
      <v-progress-linear
          v-if="loading"
          indeterminate
          rounded
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-progress-linear>
    </div>
    <nav-mobile></nav-mobile>

  </div>
  <div v-if="boxMsg" class="box-message-wrapper">
    <box-message :card="card"></box-message>
  </div>
</template>

<script setup>
import {computed, onMounted, onUpdated, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";
import {userAdd} from "@/utils/icons";

const store = useStore()
const fallas= computed(() => {
  return store.state.fallas2select
});
const usuarios = ref([])
let fallaSeleccionada=ref()
let usuarioSeleccionado=ref()
let isAdmin= ref(false)
const router = useRouter()
let boxMsg = ref(false)
const card={
  icono: userAdd,
  titulo:'Administrador afegit correctament!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
}
const loading = ref(false);

function toggleCheckbox() {
  isAdmin.value = !isAdmin.value; // Cambia el valor de la variable cuando se cambia el estado del checkbox
}
function checkAdmin(){
  if(usuarioSeleccionado.value!==null){
    isAdmin.value = !!usuarioSeleccionado.value.role.includes("ROLE_ADMIN");
  }
}
async function getUsers(){
  if (fallaSeleccionada.value!==null){
    console.log(fallaSeleccionada.value)
    let response = await axios.get('http://localhost:8000/api/falla/falleros/' + fallaSeleccionada.value)
    console.log(response.data)
    usuarios.value = response.data
  }

}
function submitAdmin(){
  loading.value=true
  console.log(isAdmin.value + ' ' + usuarioSeleccionado.value.idFallero)
  let roles = {
    idFallero: usuarioSeleccionado.value.idFallero,
    status: isAdmin.value
  }
  store.dispatch('postRole', roles).then(()=>{
    store.dispatch('getUserData')
    loading.value = false
    boxMsg.value= true
  })
}
function goBack(){router.back()}

</script>

<style scoped>
.container-fluid{
  font-family:'Inter', sans-serif;
  border: 1px solid blue;
  height: 100vh;
}
.panel-super-admin{
  margin: 0 24px 127px 24px;

}

.logo-back:active path {
  stroke: var(--dl-color-miostodos-moradoprincipal);
}
.titulo{

  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  margin-top: 32px;
}

.options .item{
  color: #fff;
  text-transform: capitalize;
  width: 100%;
  height: 30px;
  padding: 0 15px;
  line-height: 30px;
  cursor: pointer;
}

.options .item.active{
  background: #292929;
}
.boton{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  height: 60px;
  color: #EBEEF2;
  background-color: var(--dl-color-miostodos-moradoprincipal);
  border: 1px #EBEEF2 solid;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}.custom-checkbox {
   /* Estilos personalizados para el checkbox */
   /* Por ejemplo, puedes ajustar el tamaño, el color, el fondo, los bordes, etc. */
   width: 20px;
   height: 20px;
   border: 2px solid #EBEEF2;
   background-color: #fff;
   border-radius: 5px;
 }

.custom-checkbox:checked {
  /* Estilos para el checkbox cuando está marcado */
  /* Por ejemplo, puedes cambiar el color de fondo o el estilo del borde */
  background-color: var(--dl-color-miostodos-moradoprincipal);
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
}
.box-message-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
