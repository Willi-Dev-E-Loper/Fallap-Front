<template>
  <div class="container-flex p-0">
    <button class="logo-back ml-6 mt-10" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">


      <div class="titulo p-0">
        <h1>{{params.titulo ? 'Editar event' : 'Crear event'}}</h1>
      </div>
      <v-form   @submit.prevent="submitEvent" ref="form" class="p-0">
        <v-file-input
            v-model="imagenEvento"
            class="mt-4  p-0 custom-select "
            clearable
            chips
            base-color="var(--dl-color-miostodos-moradoprincipal)"
            label="Selecciona imatge per al event 1000x300px"
            variant="outlined"
            prepend-icon=""
            prepend-inner-icon="mdi mdi-panorama-variant-outline"
            density="comfortable"
        ></v-file-input>
        <v-text-field
            v-model="tituloEvento"
            class="mt-1 col-sm-12 p-0 custom-input"
            label="Titol de l'event"
            :rules="[v => !!v || 'El titol no pot estar buit']"
            density="comfortable"
            variant="outlined"
            color="var(--dl-color-miostodos-moradoprincipal)"

        ></v-text-field>
        <v-text-field
            v-model="fechaEvento"
            class="mt-1 col-sm-12 p-0 custom-input date-input"
            density="comfortable"
            label="Data de l'event"
            type="date"
            :rules="[v => !!v || 'El titol no pot estar buit']"
            placeholder="--/--/--"
            variant="outlined"
            color="var(--dl-color-miostodos-moradoprincipal)"
            style="color:rgb(61 76 94 / 64%);"

        ></v-text-field>
        <v-textarea
            v-model="descripcionEvento"
            label="Descripciò de l'event"
            placeholder="Introdueix  ací la informaciò de l'event"
            auto-grow
            counter
            variant="outlined"
            rows="3"
            row-height="25"
            class="mt-1 col-sm-12 p-0 custom-input"
            color="var(--dl-color-miostodos-moradoprincipal)"

            shaped
        ></v-textarea>
        <div class="form-check ">
          <input  class="form-check-input custom-checkbox" type="checkbox" :checked="tienePago" @change="toggleCheckbox">
          <label class="form-check-label custom-input" for="myCheckbox">
            Aquest event inclou pagament
          </label>
        </div>
        <v-text-field
            v-if="tienePago"
            v-model="importe"
            type="number"
            class="mt-2 col-sm-12 p-0 custom-input "
            density="comfortable"
            label="Introdueix l'import"
            append-icon="mdi mdi-currency-eur"
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
        <button class="btn d-flex col-sm-12 w-100 boton" >
          {{params.titulo ? 'Editar event' : 'Crear event'}}
        </button>
      </v-form>



    </div>

  </div>
  <nav-mobile></nav-mobile>
 <v-fade-transition>
    <div v-if="boxMsg" class="box-message-wrapper">
      <box-message :card="card"></box-message>
    </div>
  </v-fade-transition>
</template>

<script setup>
import {onMounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {dateNow} from "@/utils/date";
import {eventAdd} from "@/utils/icons";

const router = useRouter()
const params = router.currentRoute.value.params;
const ispago = params.tienePago.toLowerCase()
let tienePago= ref(!!params.tienePago)
const store = useStore()
let imagenEvento = ref()
let tituloEvento = ref(params.titulo ?? '');
let fechaEvento = ref(params.fecha ?? '')
let descripcionEvento = ref(params.contenido ?? '')
let importe= ref( params.pago ?? '')
let idEvent = ref(params.idEvento);
let boxMsg = ref(false)
let loading = ref(false)
let card=ref({
  icono: eventAdd,
  titulo:'Event creat!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})

function submitEvent(){


  store.commit("setIdEvent", idEvent.value);
  let formdata = new FormData()
  if(imagenEvento.value){
    formdata.append('imagenEvento', imagenEvento.value[0])
  }
  formdata.append('tituloEvento', tituloEvento.value)
  formdata.append('fechaEvento', fechaEvento.value)
  formdata.append('fechaCreacion', dateNow())
  formdata.append('descripcionEvento', descripcionEvento.value)
  formdata.append('importe', importe.value)
  formdata.append('tienePago', tienePago.value)
  const handleError = () => {
    boxMsg.value = true;
    card.value = {
      icono: eventAdd,
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

  //console.log(store.state.falla.idFalla)
  if(tituloEvento.value && fechaEvento.value){
    loading.value=true
    if(idEvent.value){
      store.dispatch('putEvent',formdata).then((res) => {
        loading.value=false
        if (!res.ok) {
          handleError();
        } else {
          boxMsg.value = true;
        }
      });
      store.dispatch('getUserData');
    }else{
      formdata.append('idFalla', store.state.falla.idFalla)
      store.dispatch('postNewEvent',formdata).then((res) => {
        loading.value=false
        if (!res.ok) {
          handleError();
        } else {
          boxMsg.value = true;
        }
      });
      store.dispatch('getUserData');
    }
  }

}

function toggleCheckbox() {
  tienePago.value = !tienePago.value; // Cambia el valor de la variable cuando se cambia el estado del checkbox
  console.log(tienePago.value)

}
const addUser= ()=>{
  console.log('paiohopidnoai')
}
function goBack(){router.back()}
onMounted(()=>{
  if(params){
    console.log('params')
    console.log(params)
    tienePago.value = params.tienePago === 'true';
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
.container-flex{
  font-family:'Inter', sans-serif;
  padding: 10px;
  height: 90vh;
}
.panel-super-admin{
  margin: 28px 24px 32px 24px;
}
.titulo{

  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  margin-top: 0;
}
.custom-input{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #3D4C5E;
}
.custom-checkbox {
  box-shadow: none; /* Cambia "purple" al color morado deseado */
  background-color:#FFFFFF  ;
  border-color:var(--dl-color-miostodos-moradoprincipal);


}
.custom-checkbox:checked {
  box-shadow: 0 0 5px var(--dl-color-miostodos-moradoprincipal); /* Cambia "purple" al color morado deseado */
  background-color:var(--dl-color-miostodos-moradoprincipal);
  border-color:#EBEEF2;

}

.logo-back:active path {
  stroke: var(--dl-color-miostodos-moradoprincipal);
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

</style>
