<template>
  <div v-if="falla" class="container-fluid p-0 d-flex">
    <nav-desktop v-if="isWideScreen"></nav-desktop>
    <div class="panel-super-admin  row w-100">

      <div v-if="!isWideScreen" class="logo-falla p-0 mb-3">
        <img :src="falla.logo ? 'http://localhost:8000/uploads/brochures/' + falla.logo : 'http://localhost:8000/uploads/brochures/perfil-base.jpg'" alt="logo falla" class="logo">
      </div>
      <div class="mt-6 p-0">
      <p class="p-0 m-0">Falla</p>
        <h1 class="p-0 m-0 falla">{{ falla.nombre }}</h1>
      </div>

      <div class="titulo p-0 ">

        <button
            v-for="(boton,index) in botones"

            :key="index"
            @click="handleClick(boton.accion)"
            class="btn d-flex col-sm-12 boton w-100">
          <div class="feo" v-html="boton.icono">
          </div>

          <span class="mx-4">{{boton.texto}}</span>
          <div class="feo">

          </div>

        </button>
      </div>


    </div>

  </div>
  <nav-mobile v-if="!isWideScreen"></nav-mobile>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import AddUser from "@/components/AddUser.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {addUsericon,addNotice,addPremio,addAdmin,addFalla,addUserCsv, updateFalla} from "@/utils/icons";
import NavDesktop from "@/components/NavDesktop.vue";

const router = useRouter()
const store = useStore()
const falla = computed( () => {

  return store.state.falla;

});

const botones= ref([
  {
    icono:addUsericon
    ,
    texto: 'Afegir usuari',
    accion: 1
  },
  {
    icono:addUserCsv,
    texto: 'Importar usuaris CSV',
    accion: 2
  },
  {
    icono: addAdmin,
    texto: 'Afegir administrador',
    accion: 3
  },
  {
    icono: addPremio,
    texto: 'Actualizar premis',
    accion: 4
  },
  {
    icono: addFalla
    ,
    texto: 'Crear falla',
    accion: 5
  },
  {
    icono: updateFalla ,
    texto: 'Editar falla',
    accion: 6
  },
  {
    icono:addNotice
    ,
    texto: 'Crear noticia',
    accion: 7
  },
])
function handleClick(accion) {
  switch (accion) {
    case 1:
      addUser();
      break;
    case 2:
      addUserFromCsv();
      break;
    case 3:
      setAdmin()
      break;
    case 4:
      setPremios();
      break;
    case 5:
      createFalla()
      break;
    case 6:
      editFalla()
      break;
    case 7:
      createNew()
      break;
  }
}
const addUser= ()=>{
  router.push({ path: '/new-user' })
}
const addUserFromCsv= ()=>{
  router.push({ path: '/new-user-csv' })
}
const setAdmin= ()=>{
  router.push({ path: '/admin-manage' })
}
const setPremios= ()=>{
  router.push({ path: '/new-premi' })
}
const createFalla= ()=>{
  router.push({ name: 'newFalla',
                params: {titulo: 'Crear falla', edit: false}
  })
}
const editFalla= ()=>{
  router.push({ name: 'newFalla',
    params: {titulo: 'Editar falla', edit: true}
  })
}
const createNew= ()=>{
  router.push({ path: '/new-notice'})
}
const isWideScreen = ref(window.innerWidth >= 1300);

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1300;
};
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.container-flex{
  font-family:'Inter', sans-serif;
  padding: 10px;
}
.panel-super-admin{
  margin: 48px 24px 127px 24px;

}
.logo-falla img{
  width: 100px;
  border-radius:50%;
}
.titulo{

 font-weight: 600;
  font-size: 28px;
  line-height: 36px;
  margin-top: 32px;
}
.falla{

  font-weight: 500;
  font-size: 42px;
  line-height: 51px;
  margin-top: 32px;
}
path {
 stroke: red;
}
.boton{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  height: 60px;
  color: #3D4C5E;
  border: 1px #EBEEF2 solid;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}
.boton:hover{
  background-color: #F0F3F6;
}
.boton:active{
  background-color: #EBEEF2;
  border: 1px #EBEEF2 solid;

}
</style>
