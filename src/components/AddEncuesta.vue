<template>
  <div class="container-flex p-0">
    <button class="logo-back ml-6 mt-10" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">


      <div class="titulo p-0">
        <h1>{{params.idEncuesta ? 'Editar enquesta' :'Crear enquesta'}}</h1>
      </div>

      <v-text-field
          v-model="pregunta"
          class="mt-1 col-sm-12 p-0 custom-input"
          label="Pregunta"
          :rules="[v => !!v || 'La pregunta no pot estar vuida']"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"

      ></v-text-field>
      <v-text-field
          v-model="respuesta"
          class="mt-1 col-sm-12 p-0 custom-input "
          density="comfortable"
          :rules="[v => !!v || 'Fan falta al menys dos respostes']"
          label="Contestaciò"
          prepend-inner-icon="mdi mdi-circle-small"
          placeholder="Si"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-text-field>
      <div v-for="(field, index) in fields" :key="index" class="p-0">

        <v-text-field
            class="mt-1 col-sm-12 p-0 custom-input "
            density="comfortable"
            label="Contestaciò"
            prepend-inner-icon="mdi mdi-circle-small"
            :rules="[v => !!v || 'Fan falta al menys dos respostes']"
            placeholder="No"
            variant="outlined"
            color="var(--dl-color-miostodos-moradoprincipal)"
            v-model="field.value"
            clearable
            @click:clear="removeField(index)"
        ></v-text-field>

      </div>
      <button class="btn d-flex  boton-1" @click="addField">
        Afegir contestaciò
      </button>



      <v-text-field
          v-model="fechaCaducidad"
          class="mt-4 col-sm-12 p-0 custom-input "
          density="comfortable"
          label="Data de finalització"
          placeholder="--/--/--"
          prepend-inner-icon="mdi mdi-calendar-range"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"
      ></v-text-field>
      <button class="btn d-flex col-sm-12 boton" @click="addEncuesta">
        {{params.contenido ? 'Editar enquesta' : 'Crear enquesta'}}
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
import {ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {dateNow} from "@/utils/date";
import {useStore} from "vuex";
import {encuestaAdd, userAdd} from "@/utils/icons";

const router = useRouter()
const store = useStore()
const params = router.currentRoute.value.params;
let pregunta = ref(params.contenido ?? "")
let respuesta = ref()
let fechaCaducidad = ref(params.fecha ?? "")
const fields = ref(  [{ value: '' },{ value: '' }] );
let boxMsg = ref(false)
let loading = ref(false)
let card=ref({
  icono: encuestaAdd,
  titulo:'Enquesta creada!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})
let idEncuesta = ref(params.idEncuesta);
let options=[]
if(params.opciones){
  console.log(params.opciones)
  params.opciones.split(',')
  console.log(params.opciones)
  const a = params.opciones.split(',')
  respuesta.value = a[0]
  a.shift()
  a.forEach((o)=>{
    options.push({value:o})
  })
  fields.value= options
}
const addField = () => {
  fields.value.push({ value: '' });
};
const removeField = (index) => {
  fields.value.splice(index, 1);
};

const addEncuesta= ()=>{

  store.commit("setIdEncuesta", idEncuesta.value);
  const clonedFields = [...fields.value]; // Realiza una copia del array fields.value
  clonedFields.unshift({ value: respuesta.value });

  const respuestas = [];
  clonedFields.forEach((r) => {
    respuestas.push(r.value);
  });

  const encuesta = {
    falla:store.state.falla.idFalla,
    pregunta: pregunta.value,
    opciones: respuestas,
    fechaCreacion: dateNow(),
    fechaCaducidad: fechaCaducidad.value,
  }
  console.log(encuesta)
  if(idEncuesta.value){
    store.dispatch('putEncuesta', encuesta).then((res)=>{
      if (!res.ok){

        card.value={
          icono: encuestaAdd,
          titulo:'Oh oh, algo no ha ixit com esperava!',
          mensage: '',
          type:'',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }
        setTimeout(()=>{boxMsg.value=false},3000)
        setTimeout(()=>{ loading.value = false},3000)
        setTimeout(()=>{ card.value = {
          icono: encuestaAdd,
          titulo:'Enquesta creada!',
          mensage: '',
          type:'success',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }},4000)
      }else {
        boxMsg.value = true
      }
    })
    store.dispatch('getUserData')

  }else{
    store.dispatch('postNewEncuesta', encuesta).then((res)=> {
      if (!res.ok) {
        boxMsg.value = true
        card.value = {
          icono: encuestaAdd,
          titulo: 'Oh oh, algo no ha ixit com esperava!',
          mensage: '',
          type: '',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        }
        setTimeout(() => {
          boxMsg.value = false
        }, 3000)
        setTimeout(() => {
          loading.value = false
        }, 3000)
        setTimeout(() => {
          card.value = {
            icono: encuestaAdd,
            titulo: 'Enquesta creada!',
            mensage: '',
            type: 'success',
            boton: 'Tornar al home',
            boton1: '',
            boton2: ''
          }
        }, 4000)
      } else {
        boxMsg.value = true
      }
      store.dispatch('getUserData')

    })

}}
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
.boton-1{


  font-size: 14px;
  font-weight: 500;
  line-height: 21px;


  width: fit-content;
  height: 36px;
  color: var(--dl-color-miostodos-moradoprincipal);
  background-color: #FFFFFF;
  border: 1px var(--dl-color-miostodos-moradoprincipal) solid;
  align-items: center;
  padding: 10px 16px 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}

</style>
