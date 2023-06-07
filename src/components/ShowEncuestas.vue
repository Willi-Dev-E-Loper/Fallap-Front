<template>
  <div class="container-fluid">
    <button class="logo-back ml-6 mt-7" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0">
        <h1>Veure enquestes</h1>
      </div>

        <encuesta-results></encuesta-results>

    </div>
    <nav-mobile></nav-mobile>

  </div>
</template>

<script setup>
import {onBeforeMount, ref, computed} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import EncuestaResults from "@/components/EncuestaResults.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {userAdd} from "@/utils/icons";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
let nombre = ref("")
let fechaNacimiento = ref("")
let email = ref("")
let boxMsg = ref(false)
const card={
  icono: userAdd,
  titulo:'Usuari afegit!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
}
const loading = ref(false); // Variable reactiva para controlar la visibilidad del logo de carga


const fallas= computed(() => {
  return store.state.fallas2select
});
let fallaSeleccionada=ref()


function submitUser(){
  loading.value = true; // Muestra el logo de carga al iniciar la solicitud

  let user = {
    nombre: nombre.value,
    falla: fallaSeleccionada.value.idFalla,
    email: email.value,
  }
  store.dispatch('postNewUser',user).then(()=>{
    loading.value = false; // Muestra el logo de carga al iniciar la solicitud
    boxMsg.value= true
  })
}

function goBack(){router.back()}
</script>

<style scoped>
.box-message-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.container-fluid{
  font-family:'Inter', sans-serif;
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

.custom-input{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #3D4C5E;

}
option{
  width: 345px;
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

</style>
