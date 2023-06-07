<template>
  <div class="container-fluid">
    <button class="logo-back ml-6 mt-7" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">

      <div class="titulo p-0">
        <h1>Importar usuaris CSV</h1>
      </div>

      <v-form   @submit.prevent="submitCsv" ref="form" class="p-0">
      <v-select
          v-if="store.state.role==='ROLE_SUPER_ADMIN'"
          class="mt-4  p-0 custom-select "
          v-model="fallaSeleccionada"
          :items="fallas"
          item-value="idFalla"
          item-title="nombre"
          label="Tria una falla"
          variant="outlined"
          density="comfortable"
          rounded="circle"

          clearable
      ></v-select>

          <v-file-input
              v-model="csv"
              accept=".csv"
              :rules=" [v => (v && v.length > 0) || 'El camp archiu csv no pot estar buit']"
              class="mt-4  p-0 custom-select "
              clearable
              chips
              label="Archiu .csv"
              variant="outlined"
              prepend-icon=""
              prepend-inner-icon="mdi mdi-paperclip"
              density="comfortable"
          ></v-file-input>


      <button class="btn d-flex col-sm-12 boton w-100"  >
        Importar usuaris
      </button>
      <v-progress-linear
          v-if="loading"
          indeterminate
          rounded
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-progress-linear>
      </v-form>
    </div>
    <nav-mobile></nav-mobile>

  </div>
  <div v-if="boxMsg" class="box-message-wrapper">
    <box-message :card="card"  @avanzar="realizarAccionAvanzar" @cancelar="realizarAccionCancelar"></box-message>
    <v-progress-linear
        v-if="loading"
        indeterminate
        rounded
        color="var(--dl-color-miostodos-moradoprincipal)"
    ></v-progress-linear>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {fallaAdd, userAdd} from "@/utils/icons";

const router = useRouter()
const store = useStore()
let boxMsg = ref(false)
let loading = ref(false)
const fallas= computed(() => {
  return store.state.fallas2select
});
let fallaSeleccionada=ref()
let csv = ref()
let card = ref({
  icono: userAdd,
  titulo:'Importar usuaris',
  mensage: 'Estic segur de que vull importar aquests usuaris a la falla',
  type:'warn',
  boton: '',
  boton1: 'No, enrere',
  boton2: 'Si, avant!'
})
const idF= computed(() => {
  if (store.state.falla){
    return store.state.falla.idFalla
  }
});
const realizarAccionAvanzar = ()=> {
  console.log('asdasd')
  let formData = new FormData()
  if(csv.value){
    const idFalla = store.state.role==='ROLE_SUPER_ADMIN' ? fallaSeleccionada.value  : idF.value
    formData.append('csv', csv.value[0])
    formData.append('idFalla', idFalla )
    store.dispatch('postNewCsv', formData).then((res)=>{

      if(!res.ok){
        loading.value = true
        card.value={
          icono: userAdd,
          titulo:'Oh oh, algo no ixit com esperava!',
          mensage: '',
          type:'',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }
        setTimeout(()=>{boxMsg.value=false},3000)
        setTimeout(()=>{ loading.value = false},3000)
        setTimeout(()=>{ card.value = {
          icono: userAdd,
          titulo: 'Importar usuaris',
          mensage: 'Estic segur de que vull importar aquests usuaris a la falla',
          type: 'warn',
          boton: '',
          boton1: 'No, enrere',
          boton2: 'Si, avant!'
        }},4000)

      }else{
        card.value={
          icono: userAdd,
          titulo:'Usuaris importats correctament!',
          mensage: '',
          type:'success',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }
        store.dispatch('getUserData')
        console.log((res))
      }


    })
  }

}
const realizarAccionCancelar = ()=> {
  boxMsg.value = false
}

function goBack(){ router.back()}
const submitCsv = ()=>{
  if(csv.value){

    boxMsg.value = true
  }

}
function toggleCheckbox() {
  this.isAdmin = !this.isAdmin; // Cambia el valor de la variable cuando se cambia el estado del checkbox
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
  border: 1px solid blue;
  height: 100vh;
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

</style>
