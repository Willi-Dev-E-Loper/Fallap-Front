<template>
  <div class="container-fluid p-0 d-flex">
    <nav-desktop v-if="isWideScreen"></nav-desktop>
    <div class="w-100">
      <button class="logo-back ml-6 mt-7" @click="goBack">
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="panel-super-admin  row" :class="isWideScreen ? 'mt-12' : '' ">

        <div class="titulo p-0">
          <h1>{{params.titulo ?? 'Crear falla'}}</h1>
        </div>
        <v-form   @submit.prevent="submitFalla" ref="form" class="p-0" :class="isWideScreen ? 'mt-10' : '' ">
          <v-file-input
              v-model="imagenPortada"
              class="mt-4  p-0 custom-select "
              clearable
              chips
              base-color="var(--dl-color-miostodos-moradoprincipal)"
              label="Selecciona imatge de portada"
              variant="outlined"
              prepend-icon=""
              prepend-inner-icon="mdi mdi-panorama-variant-outline"
              density="comfortable"
          ></v-file-input>
          <v-file-input
              v-model="logoFalla"
              class="mt-1  p-0 custom-select "
              clearable
              chips
              label="Selecciona el logo de la falla"
              base-color="var(--dl-color-miostodos-moradoprincipal)"
              variant="outlined"
              prepend-icon=""
              prepend-inner-icon="mdi mdi-shield-star-outline"
              density="comfortable"
          ></v-file-input>
          <v-text-field
              v-model="nombreFalla"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Nom de la falla"
              prepend-inner-icon="mdi mdi-account-outline"
              :rules="[v => !!v || 'El nom de la falla no pot estar buit']"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"
          ></v-text-field>
          <v-text-field
              v-model="fechaFalla"
              class="mt-1 col-sm-12 p-0 custom-input "
              density="comfortable"
              label="Any de fundaciò"
              prepend-inner-icon="mdi mdi-calendar-range"
              placeholder="1972"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-text-field
              v-model="direccionFalla"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Direcciò física"
              prepend-inner-icon="mdi mdi-map-marker-outline"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-textarea
              v-model="descripcionFalla"
              label="Pequeña descripciò, máx 160 lletres"
              auto-grow
              counter
              variant="outlined"
              rows="3"
              row-height="25"
              class="mt-1 col-sm-12 p-0 custom-input"
              color="var(--dl-color-miostodos-moradoprincipal)"

              shaped
          ></v-textarea>

          <div class="titulo p-0">
            <h1>Càrregs oficials</h1>
          </div>
          <v-text-field
              v-model="reinaMayor"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Reina major"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-text-field
              v-model="reinaInfantil"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Reina infantil"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-text-field
              v-model="presidente"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="President"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <div class="titulo p-0">
            <h1>Contacte</h1>
          </div>
          <v-text-field
              v-model="emailFalla"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Correu"
              prepend-inner-icon="mdi mdi-email-outline"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-text-field
              v-model="telefonoFalla"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Telefon"
              prepend-inner-icon="mdi mdi-cellphone"
              density="comfortable"
              variant="outlined"
              color="var(--dl-color-miostodos-moradoprincipal)"

          ></v-text-field>
          <v-text-field
              v-model="webFalla"
              class="mt-1 col-sm-12 p-0 custom-input"
              label="Lloc web"
              prepend-inner-icon="mdi mdi-web"
              density="comfortable"
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
          <button type="submit" class="btn d-flex col-sm-12 w-100 boton">
            {{params.titulo ?? 'Crear falla'}}
          </button>
        </v-form>
      </div>
    </div>

  </div>
  <nav-mobile v-if="!isWideScreen"></nav-mobile>
  <div v-if="boxMsg" class="box-message-wrapper">
    <box-message :card="card"  @avanzar="realizarAccionAvanzar" @cancelar="realizarAccionCancelar"></box-message>
  </div>
</template>

<script setup>
import {onMounted, ref, defineProps, computed, onUnmounted} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {dateNow} from "@/utils/date";
import {useStore} from "vuex";
import {eventAdd, fallaAdd} from "@/utils/icons";
import NavDesktop from "@/components/NavDesktop.vue";


const router = useRouter()
const store = useStore()
let imagenPortada= ref()
let logoFalla= ref()
let nombreFalla= ref()
let fechaFalla= ref()
let direccionFalla= ref()
let descripcionFalla= ref()
let reinaMayor= ref()
let reinaInfantil= ref()
let presidente= ref()
let emailFalla= ref()
let telefonoFalla= ref()
let webFalla = ref()
let boxMsg = ref(false)
let loading = ref(false)
let params = ref(router.currentRoute.value.params)
let card=ref({
  icono: fallaAdd,
  titulo:nombreFalla.value,
  mensage: 'Estic segur de que vull crear aquesta falla',
  type:'warn',
  boton: '',
  boton1: 'No, enrere',
  boton2: 'Si, avant!'
})

const realizarAccionAvanzar = ()=> {

  loading.value = true
  let formdata = new FormData()
  if(imagenPortada.value){
    formdata.append('imagenPortada', imagenPortada.value[0])
  }
  if(logoFalla.value){
    formdata.append('logoFalla', logoFalla.value[0])
  }
  formdata.append('nombreFalla', nombreFalla.value)
  formdata.append('fechaFalla', fechaFalla.value)
  formdata.append('direccionFalla', direccionFalla.value)
  formdata.append('descripcionFalla', descripcionFalla.value)
  formdata.append('reinaMayor', reinaMayor.value)
  formdata.append('reinaInfantil', reinaInfantil.value)
  formdata.append('presidente', presidente.value)
  formdata.append('emailFalla', emailFalla.value)
  formdata.append('telefonoFalla', telefonoFalla.value)
  formdata.append('webFalla', webFalla.value)
  const handleError = () => {

    card.value = {
      icono: eventAdd,
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
        icono: eventAdd,
        titulo:'Event creat!',
        mensage: '',
        type:'success',
        boton: 'Tornar al home',
        boton1: '',
        boton2: ''
      };
    }, 4000);
  };
  if(params.value.edit === 'true'){
    store.dispatch('putFalla',formdata).then((res) => {
      if (!res.ok) {
        handleError();
      } else {
        card.value={
          icono: fallaAdd,
          titulo:'Falla creada correctament!',
          mensage: '',
          type:'success',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }

        boxMsg.value = true;
      }
    });
    store.dispatch('getUserData');
  }else{
    store.dispatch('postNewFalla',formdata).then((res)=>{
      if (!res.ok) {
        handleError();
      } else {
        card.value={
          icono: fallaAdd,
          titulo:'Falla creada correctament!',
          mensage: '',
          type:'success',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }

        boxMsg.value = true;
      }
    });
    store.dispatch('getUserData');

  }

}
const realizarAccionCancelar = ()=> {
  boxMsg.value = false
}

function goBack(){router.back()}
function submitFalla(){
  card.value.titulo = 'Falla '+ nombreFalla.value

  boxMsg.value = true



}
const isWideScreen = ref(window.innerWidth >= 1300);

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1300;
};


onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
onMounted(()=> {
  window.addEventListener('resize', handleResize);

  const titulo = router.currentRoute.value;
  if(params.value.edit === 'true'){
    const falla =useStore().state.falla
    nombreFalla.value = falla.nombre
    fechaFalla.value= falla.fechaCreacion
    direccionFalla.value= falla.direccion
    descripcionFalla.value = falla.descripcion
    reinaMayor.value= falla.cargos[0]
    reinaInfantil.value= falla.cargos[1]
    presidente.value= falla.cargos[2]
    emailFalla.value= falla.email
    telefonoFalla.value= falla.telefono
    webFalla.value= falla.web
  }
})
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
  border: 1px solid blue;

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
.titulo{

  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  margin-top: 32px;
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
