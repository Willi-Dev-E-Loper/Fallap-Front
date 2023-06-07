<template>
  <div class="container-fluid">
    <button class="logo-back ml-6 mt-7" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0 mb-4">
        <h1>Afegir usuari</h1>
      </div>

      <v-form   @submit.prevent="submitUser" ref="form" class="p-0">
      <v-select
          v-if="store.state.role==='ROLE_SUPER_ADMIN'"
          class="mt-1 col-sm-12 p-0 custom-input"
          v-model="fallaSeleccionada"
          :items="fallas"
          item-value="idFalla"
          item-title="nombre"
          label="Tria una falla"
          variant="outlined"
          density="comfortable"
          color="var(--dl-color-miostodos-moradoprincipal)"

          return-object
          clearable
      ></v-select>
      <v-text-field
          class="mt-1 col-sm-12 p-0 custom-input"
          label="Nom de l'usuari/a"
          v-model="nombre"
          :rules="[v => !!v || 'El camp nom no pot estar buit']"
          prepend-inner-icon="mdi mdi-account-outline"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"

      ></v-text-field>
      <v-text-field
          class="mt-1 col-sm-12 p-0 custom-input "
          density="comfortable"
          label="Any de naixement"
          v-model="fechaNacimiento"
          type="date"
          :rules="[v => !!v || 'El camp data no pot estar buit']"
          placeholder="--/--/--"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"

      ></v-text-field>
      <v-text-field
          class="mt-1 col-sm-12 p-0 custom-input"
          label="E-mail de l'usuari/a"
          prepend-inner-icon="mdi mdi-email-outline"
          density="comfortable"
          :rules="[v => !!v || 'El e-mail data no pot estar buit']"

          v-model="email"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"

      ></v-text-field>

        <v-progress-linear
            v-if="loading"
            indeterminate
            rounded
            color="var(--dl-color-miostodos-moradoprincipal)"
            class="mb-2"
        ></v-progress-linear>
      <button class="btn d-flex col-sm-12 boton w-100" >
        Crear l'usuari
      </button>

      </v-form>
    </div>
    <nav-mobile></nav-mobile>

  </div>
  <div v-if="boxMsg" class="box-message-wrapper">
    <box-message :card="card"></box-message>
  </div>
</template>

<script setup>
import {onBeforeMount, ref, computed} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {comentAdd, userAdd} from "@/utils/icons";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
let nombre = ref("")
let fechaNacimiento = ref("")
let email = ref("")
let boxMsg = ref(false)
let card=ref({
  icono: userAdd,
  titulo:'Usuari afegit!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})
const loading = ref(false); // Variable reactiva para controlar la visibilidad del logo de carga


const fallas= computed(() => {
  return store.state.fallas2select
});
const idF= computed(() => {
  if (store.state.falla){
    return store.state.falla.idFalla
  }
});
let fallaSeleccionada=ref()


function submitUser(){
   // Muestra el logo de carga al iniciar la solicitud
  const handleError = () => {

    card.value = {
      icono: userAdd,
      titulo: 'Oh oh, algo no ha ixit com esperava!',
      mensage: '',
      type: '',
      boton: 'Tornar al home',
      boton1: '',
      boton2: ''
    };
    boxMsg.value = true;
    setTimeout(() => {
      boxMsg.value = false;
    }, 3000);
    setTimeout(() => {
      loading.value = false;
    }, 3000);
    setTimeout(() => {
      card.value = {
        icono: userAdd,
        titulo:'Usuari afegit!',
        mensage: '',
        type:'success',
        boton: 'Tornar al home',
        boton1: '',
        boton2: ''
      };
    }, 4000);
  };

  let user = {
    nombre: nombre.value,
    falla: store.state.role==='ROLE_SUPER_ADMIN' ? fallaSeleccionada.value.idFalla  : idF.value,
    email: email.value,
  }
  if(nombre.value && fechaNacimiento.value &&email.value){
    loading.value = true;
    store.dispatch('postNewUser',user).then((res)=>{
      loading.value=false
      console.log(res)
      if (!res.ok) {
        handleError();
      } else {
        boxMsg.value = true;
      }
    })
  }

}

function goBack(){ router.back()}
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
