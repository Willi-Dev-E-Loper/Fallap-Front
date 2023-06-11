<template>
  <div class="container-fluid d-flex justify-center align-center color h-100">
    <div class="panel-super-admin " :class="isWideScreen ? 'w-50' : '' ">

      <div class="custom-card text-center ">
        <div class="icon" v-html="card.icono"></div>
        <h2 class="mt-1 textosXl">{{card.titulo}}</h2>
        <p >{{card.mensage ?? ''}}</p>
        <button v-if="card.type==='success'" class="btn d-flex boton" :class="isWideScreen ? 'w-75' : '' " @click="goHome">
          {{ card.boton }}
        </button>
        <div v-if="card.type==='warn'" class="botones-warn d-flex flex-row w-100 justify-content-around ">
          <button  class="btn d-flex botones" :class="isWideScreen ? 'mx-4' : '' " @click="() => $emit('cancelar')">
            {{ card.boton1 }}
          </button>
          <button class="btn d-flex  botones" :class="isWideScreen ? 'mx-4' : '' " @click="() => $emit('avanzar')"  >
            {{ card.boton2 }}
          </button>
        </div>
      </div>

    </div>

  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
const props = defineProps(['card'])
const emits = defineEmits(['avanzar', 'cancelar']);
const router = useRouter()
const store = useStore()
const goHome = ()=>{router.back()}

const isWideScreen = ref(window.innerWidth >= 1200);

const handleResize = () => {
  isWideScreen.value = window.innerWidth >= 1200;
};
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.container-fluid{
  font-family:'Inter', sans-serif;
  border: 1px solid blue;
  height: 100vh;
}
.panel-super-admin{
  width: 90vw;

}
.color{
  background-color: rgba(255, 255, 255, 0.82);
}
.custom-card{
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border: none;
  background: #FFFFFF;

  /* General BIG Shadow */

  box-shadow: 0px 0px 2px rgba(231, 213, 255, 0.6), 0px 4px 40px -2px rgba(219, 217, 241, 0.6);
  border-radius: 16px;
}

.logo-back:active path {
  stroke: var(--dl-color-miostodos-moradoprincipal);
}


.boton{
  font-weight: 500;
  width: 75vw;
  font-size: 18px;
  line-height: 25px;
  height: 60px;
  color: #EBEEF2;
  background-color: var(--dl-color-miostodos-moradoprincipal);
  border: 1px #EBEEF2 solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}.botones{
   font-weight: 500;
   width: 33vw;
   font-size: 18px;
   line-height: 25px;
   height: 60px;
   color: #EBEEF2;
   background-color: var(--dl-color-miostodos-moradoprincipal);
   border: 1px #EBEEF2 solid;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding: 10px 16px;
   box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
   border-radius: 8px;

 }

</style>
