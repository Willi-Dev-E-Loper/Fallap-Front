<template>
  <div class="container-flex p-0">
    <button class="logo-back ml-6 mt-10" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row">


      <div class="titulo p-0">
        <h1>Crear noticia</h1>
      </div>
      <v-file-input
          v-model="imagenNoticia"
          class="mt-4  p-0 custom-select "
          clearable
          chips
          base-color="var(--dl-color-miostodos-moradoprincipal)"
          label="Selecciona imatge de la noticia"
          variant="outlined"
          prepend-icon=""
          prepend-inner-icon="mdi mdi-panorama-variant-outline"
          density="comfortable"
      ></v-file-input>
      <v-text-field
          v-model="tituloNoticia"
          class="mt-1 col-sm-12 p-0 custom-input"
          label="Titol de la noticia"
          density="comfortable"
          variant="outlined"
          color="var(--dl-color-miostodos-moradoprincipal)"

      ></v-text-field>
      <v-textarea
          v-model="descripcionNoticia"
          label="Descripciò de la noticia"
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
      <button class="btn d-flex col-sm-12 boton" @click="addComent">
        Postejar
      </button>
    </div>

  </div>
  <nav-mobile></nav-mobile>

</template>

<script setup>
import {ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {dateNow} from "@/utils/date";

const router = useRouter()
const store = useStore()
let imagenNoticia = ref()
let descripcionNoticia = ref()
let tituloNoticia = ref()

const addComent= ()=>{
  const notice = new FormData()
  notice.append('file', imagenNoticia.value[0])
  notice.append('descripcionNoticia', descripcionNoticia.value)
  notice.append('fechaCreacion', dateNow())
  //coment.append('idFalla', store.state.falla.idFalla)

  store.dispatch('postNewNotice', coment)

}
function goBack(){router.back()}


</script>

<style scoped>
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
.custom-select{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #3D4C5E;
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
