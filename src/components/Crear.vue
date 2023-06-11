<template>
  <div class="container-flex p-0 d-flex">
    <nav-desktop v-if="isWideScreen"></nav-desktop>
    <div class="mt-8">
      <button class="logo-back ml-6 mt-10 " @click="goBack">
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="panel-super-admin  row mt-11">


        <div class="titulo p-0">
          <h1>Crear</h1>
        </div>
        <button
            v-for="(boton,index) in botones"
            :key="index"
            @click="ejecutar(boton.accion)"
            class="btn d-flex col-sm-12 boton">
          <div  v-html="boton.icono">
          </div>

          <span class="mx-4">{{boton.texto}}</span>
        </button>

      </div>
    </div>


  </div>
  <nav-mobile v-if="!isWideScreen"></nav-mobile>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import {useRouter} from "vue-router";
import NavDesktop from "@/components/NavDesktop.vue";


const router = useRouter()
const botones= ref([
  {
    icono:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
          +'<path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
          +'<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        +'</svg>'
    ,
    texto: 'Esdeveniment',
    accion: 1
  },
  {
    icono:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
        +'<path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        +'</svg>',
    texto: 'Comentari',
    accion: 2
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
        +'<path d="M3 12H17M3 6H21M3 18H21" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        +'</svg>',
    texto: 'Equesta',
    accion: 3
  },


])
const ejecutar= (accion)=>{
  switch (accion) {
    case 1:
      goEvent();
      break;
    case 2:
      goComent();
      break;
    case 3:
      goEnquest();
      break;

  }
}
const goEnquest= ()=>{
  router.push({ name: 'Nueva encuesta'}
  )
}
const goEvent= ()=>{
  router.push({ path: '/new-event' })
}
const goComent= ()=>{
  router.push({ name: 'Nuevo comentario'
  })
}
const isWideScreen = ref(window.innerWidth >= 768);

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 768;
};
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
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

.logo-back:active path {
  stroke: var(--dl-color-miostodos-moradoprincipal);
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
