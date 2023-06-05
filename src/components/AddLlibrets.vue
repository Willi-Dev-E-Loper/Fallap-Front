<template>
  <div class="container-fluid p-0">
    <button class="logo-back ml-6 mt-7" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0">
        <p>Actualitzar llibrets</p>
      </div>


      <div class="d-flex flex-column align-start p-0">
        <p class="titulo2">Llibrets actuals</p>
        <v-chip
            v-for="llibret in llibrets"
            class="mb-2 mt-1 pil"
            border="none"
            closable

            variant="text">

          {{ llibret[0] }} - {{ llibret[1] }}
        </v-chip>
      </div>

      <p class="titulo2 mt-4 p-0">Afegir llibret</p>

      <v-text-field
          v-model="nombreLlibret"
          class="mt-1 col-sm-12 p-0 custom-input"
          label="Titol del llibret"
          prepend-inner-icon="mdi mdi-notebook-edit-outline"
          density="comfortable"
          placeholder="El foc de la vida"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-text-field>

      <v-file-input
          v-model="llibret"
          class="mt-1  p-0 custom-select "
          clearable
          chips
          base-color="var(--dl-color-miostodos-moradoprincipal)"
          label="Selecciona o arrastra el llibret ací"
          variant="outlined"
          prepend-icon=""
          prepend-inner-icon="mdi mdi-notebook-plus-outline"
          density="comfortable"
      ></v-file-input>
      <v-text-field
          v-model="anyLlibret"
          class="mt-1 col-sm-12 p-0 custom-input"
          label="Any del llibret"
          prepend-inner-icon="mdi mdi-calendar-range"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-text-field>



      <button class="btn d-flex col-sm-12 boton" @click="submitLlibret">
        Afegir llibret
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
  <v-fade-transition>
    <div v-if="boxMsg" class="box-message-wrapper">
      <box-message :card="card"></box-message>
    </div>
  </v-fade-transition>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {dateNow} from "@/utils/date";
import {useStore} from "vuex";
import { llibretAdd} from "@/utils/icons";
const router = useRouter()
const store = useStore()
let nombreLlibret= ref()
let llibret = ref()
let anyLlibret = ref()
const llibrets = computed(() => {
  if (store.state.falla) {
    console.log(store.state.falla.llibrets)
    return store.state.falla.llibrets;
  } else {
    return [];
  }
});
let boxMsg = ref(false)
let loading = ref(false)
let card=ref({
  icono: llibretAdd,
  titulo:'Llibret actualitzat!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})
function submitLlibret(){

  let formdata = new FormData()
  if(llibret.value){
    formdata.append('llibret', llibret.value[0])
  }
  formdata.append('nombreLlibret', nombreLlibret.value)
  formdata.append('fecha', anyLlibret.value)
  formdata.append('falla', store.state.falla.idFalla)
  const handleError = () => {
    boxMsg.value = true;
    card.value = {
      icono: llibretAdd,
      titulo: 'Oh oh, algo no ha ixit com esperava!',
      mensage: '',
      type: '',
      boton: 'Tornar al home',
      boton1: '',
      boton2: ''
    };
    setTimeout(() => {
      boxMsg.value = false;
    }, 3000);
    setTimeout(() => {
      loading.value = false;
    }, 3000);
    setTimeout(() => {
      card.value = {
        icono: llibretAdd,
        titulo: 'Llibret actualitzat!!',
        mensage: '',
        type: 'success',
        boton: 'Tornar al home',
        boton1: '',
        boton2: ''
      };
    }, 4000);
  };
  //console.log(store.state.falla.idFalla)
  store.dispatch('setLlibret',formdata).then((res) => {
    if (!res.ok) {
      handleError();
    } else {
      boxMsg.value = true;
    }
    store.dispatch('getUserData')
  })

}
function goBack(){router.back()}
function submitFalla(){
  let falla={
    imagenPortada:imagenPortada.value,
    logoFalla:logoFalla.value,
    nombreFalla:nombreFalla.value,
    fechaFalla:fechaFalla.value,
    direccionFalla:direccionFalla.value,
    descripcionFalla:descripcionFalla.value,
    reinaMayor:reinaMayor.value,
    reinaInfantil:reinaInfantil.value,
    presidente:presidente.value,
    emailFalla:emailFalla.value,
    telefonoFalla:telefonoFalla.value,
    webFalla:webFalla.value,
  }
  console.log(falla)
}

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
.custom-select{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #3D4C5E;
}
.pil{
  background-color:#F0F3F6;

}
.titulo{

  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  margin-top: 32px;
}
.titulo2{

  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0;
  text-align: left;

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

}
.boton:active{
  border-color:var(--dl-color-miostodos-moradoprincipal);
  color:var(--dl-color-miostodos-moradoprincipal);
}

</style>
