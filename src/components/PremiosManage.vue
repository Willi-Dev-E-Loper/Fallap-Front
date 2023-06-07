<template>
  <div class="container-fluid">
    <button class="logo-back ml-6 mt-7" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0">
        <h1>Actualitzar premis</h1>
      </div>
      <div class="d-flex flex-column align-start p-0 mt-4">
        <p class="titulo2">Premis actuals</p>
        <v-chip
            v-for="(premi, index) in premios"
            class="mb-2 mt-1 pil"

            border="none"
            append-icon="mdi mdi-close-circle"
            @click="deletePremio(index)"

            variant="text">

          {{ premi[3] }} {{premi[0]}} {{premi[2]}} - {{ premi[1]}}
        </v-chip>
      </div>

      <v-select
          class="mt-4  p-0 custom-select"
          v-model="fallaSeleccionada"
          :items="fallas"
          item-value="idFalla"
          item-title="nombre"
          label="Tria una falla"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>
      <v-select
          class="mt-2  p-0 custom-select"
          v-model="premioSeleccionado"
          :items="premis"
          density="comfortable"
          item-title="premio"
          label="Tipus de premi"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>
      <v-select
          v-if="premioSeleccionado==='Millor Falla'"
          class="mt-2  p-0 custom-select"
          v-model="seccionSeleccionado"
          :items="secciones"
          density="comfortable"
          item-title="seccion"
          label="Secció"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>
      <v-select
          v-if="premioSeleccionado==='Millor Falla'"
          class="mt-2  p-0 custom-select"
          v-model="monumentoSeleccionado"
          :items="monuments"
          density="comfortable"
          item-title="monument"
          label="Monument"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>
      <v-select
          class="mt-2  p-0 custom-select"
          v-model="posicionSeleccionado"
          :items="posiciones"
          density="comfortable"
          item-title="posicion"
          label="Tria una posiciò"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
          clearable
      ></v-select>

      <v-progress-linear
          v-if="loading"
          indeterminate
          rounded
          color="var(--dl-color-miostodos-moradoprincipal)"
          class="mb-2"
      ></v-progress-linear>
      <button class="btn d-flex col-sm-12 boton" @click="setPremio" >
        Afegir premi
      </button>

    </div>
    <nav-mobile></nav-mobile>

  </div>
  <div v-if="boxMsg" class="box-message-wrapper">
    <box-message :card="card"  @avanzar="realizarAccionAvanzar(index)" @cancelar="realizarAccionCancelar"></box-message>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {premioAdd} from "@/utils/icons";
const router = useRouter()

let premis= ref([{premio:'Millor Falla', id: 1},{premio:'Millor Ninot', id:2},{premio:'Millor Curtmetratge', id:3},{premio:'Millor Festival musical infantil', id:4},{premio:'Millor Engalanament de carrers', id:5},{premio:'Millor Cavalcada', id:6},{premio:'Millor Llibret', id:7},{premio:'Millor Crítica', id:8}])
let secciones= ref([{seccion:'Secció Especial', id: 1},{seccion:'Primera Secció', id:2},{seccion:'Segona Secció', id:3},{seccion:'Tercera Secció', id:4},{seccion:'Cuarta Secció', id:5}])
let monuments= ref([{monument:'Major', id: 1},{monument:'Infantil', id:2}])
let posiciones= ref([{posicion:'1er premi ', id: 1},{posicion:'2on premi', id:2},{posicion:'3er premi', id: 3},{posicion:'Sense premi', id:4}])
let idx = ref()
const store = useStore()
const premios = computed(() => {
  if (store.state.falla) {
    console.log(store.state.falla.premios)
    return store.state.falla.premios;
  } else {
    return [];
  }
});
const fallas= computed(() => {
  return store.state.fallas2select
});
let fallaSeleccionada = ref()
let premioSeleccionado = ref()
let seccionSeleccionado = ref()
let monumentoSeleccionado = ref()
let posicionSeleccionado = ref()
let loading = ref(false)
let boxMsg = ref(false)
let card=ref({
  icono: premioAdd,
  titulo:'Premi actualitzat correctament!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})
const deletePremio = (index) => {
  idx.value = index
  console.log(idx.value)
  card.value={
    icono: premioAdd,
    titulo:'Estas segur de que vols borrar el premi?',
    mensage: '',
    type:'warn',
    boton: '',
    boton1: 'No',
    boton2: 'Si'
  }
boxMsg.value= true

}
const realizarAccionAvanzar = () =>{
  store.dispatch('unsetPremio', {indice: idx.value, falla: store.state.falla.idFalla}).then(()=>{
    store.dispatch('getUserData').then(()=>{
      boxMsg.value = false
    })
  })
}
const realizarAccionCancelar = () => {
  boxMsg.value = false
}
function goBack(){router.back()}

function toggleCheckbox() {
  this.isAdmin = !this.isAdmin; // Cambia el valor de la variable cuando se cambia el estado del checkbox
}
function setPremio(){
  loading.value = true
  if(premioSeleccionado.value !== 'Millor Falla'){
    seccionSeleccionado.value = null
    monumentoSeleccionado.value = null
  }
  const premi = {
    falla: fallaSeleccionada.value,
    premio: premioSeleccionado.value,
    seccion: seccionSeleccionado.value ?? null,
    monument: monumentoSeleccionado.value ?? null,
    posicion: posicionSeleccionado.value
  }
  store.dispatch('setPremio',premi).then(()=>{
    store.dispatch('getUserData')
    loading.value = false
    boxMsg.value = true
  })
  console.log(premi);
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
.container-fluid {
  font-family: 'Inter', sans-serif;
  border: 1px solid blue;
  height: 100vh;
}

.panel-super-admin {
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
.titulo2{

  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0;
  text-align: left;
  color:#3D4C5E;

}
.pil{
  background-color:#F0F3F6;

}
.options .item {
  color: #fff;
  text-transform: capitalize;
  width: 100%;
  height: 30px;
  padding: 0 15px;
  line-height: 30px;
  cursor: pointer;
}

.options .item.active {
  background: #292929;
}

.boton {
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

.boton-1 {
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  height: 36px;
  color: var(--dl-color-miostodos-moradoprincipal);
  background-color: white;
  border: 1px var(--dl-color-miostodos-moradoprincipal) solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}
</style>
