<template class="color">
  <div class="container-flex p-0 w-25 color">
    <div class="panel-super-admin  row ">
      <div class="logo-falla p-0 mb-3 ">
        <img :src="falla.logo ? 'http://localhost:8000/uploads/brochures/' + falla.logo : 'http://localhost:8000/uploads/brochures/perfil-base.jpg'" alt="logo-falla" class="logo">
      </div>



      <div class="d-flex flex-column mt-14 p-0 ">
        <button
            v-for="(boton,index) in botones"
            :key="index"
            @click="handleClick(boton.accion)"
            class="btn d-flex  boton text-left">
          <div class="feo" v-html="boton.icono">
          </div>

          <span class="ml-4">{{boton.texto}}</span>
          <div class="feo">

          </div>

        </button>
      </div>
      <div class="nav-foot p-0">
        <div v-html="logoFallapNav"></div>
        <div class=" mt-6">
          <p class="m-0 foot">Bugs</p>
          <p class="m-0 mt-2 foot">Contacte</p>
        </div>
        <button class="btn d-flex mt-6 btn-logout" @click="logOut">
          Tacar sessió
        </button>
      </div>
    </div>


  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {
  create, logoFallapNav,
  noticeNav, peinetaNav, wallNav
} from "@/utils/icons";

const router = useRouter()
const store = useStore()

let role= computed(() => {
  return store.state.role
});
const falla = computed( () => {

  return store.state.falla;

});


const botones= ref([
  {
    icono: noticeNav,
    texto: 'Noticies',
    accion: 2
  },
  {
    icono: wallNav,
    texto: 'Mur de la falla',
    accion: 3
  },
  {
    icono: peinetaNav,
    texto: 'Falla',
    accion: 4
  },

])

function handleClick(accion) {
  switch (accion) {
    case 1:
      panelActions();
      break;
    case 2:
      goWallNotice();
      break;
    case 3:
      goWallFalla();
      break;
    case 4:
      goFalla();
      break;
  }
}
const goCreate= ()=>{

  router.push({ path: '/create' })

}

const panelActions= ()=>{
  if(role.value==='ROLE_ADMIN'){
    router.push({ path: '/a-actions' })
  }
  if(role.value ==='ROLE_SUPER_ADMIN'){
    router.push({ path: '/sa-actions' })
  }
}
const goFalla= ()=>{

  router.push({ path: '/falla' })
}
const goWallFalla= ()=>{

  router.push({ path: '/wall-falla' })
}
const goWallNotice= ()=>{

  router.push({ path: '/wall-notice' })
}
const logOut = ()=>{
  sessionStorage.clear()
  router.push({ path: '/' })
}

onMounted(()=>{
  if(role.value === 'ROLE_ADMIN' || role.value === 'ROLE_SUPER_ADMIN'){
    botones.value= [
      {
        icono:create,
        texto: 'Crear',
        accion: 1
      },
      {
        icono: noticeNav,
        texto: 'Noticies',
        accion: 2
      },
      {
        icono: wallNav,
        texto: 'Mur de la falla',
        accion: 3
      },
      {
        icono: peinetaNav,
        texto: 'Falla',
        accion: 4
      },

    ]
  }
})
</script>

<style scoped>
.container-flex{
  position:sticky;
  top:0;
  font-family:'Inter', sans-serif;
  padding: 10px;
  min-width:334px;
  height:100vh;
}
.foot{
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  /* identical to box height, or 18px */


  /* Mios todos/Gris General */

  color: #3D4C5E;

}
.panel-super-admin{
  margin: 48px 64px 127px 64px;

}
.logo-falla img{
  width: 100px;
  border-radius:50%;
}
.color{
  border:1px solid #EBEEF2;
}
.nav-foot{
  margin-top: 235px;
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
  box-shadow: 0 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}
.btn-logout{

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;

  width: 196px;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #847AF4;
  box-shadow: 0 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;

  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #847AF4;

}
.boton:hover{
  background-color: #F0F3F6;
}
.boton:active{
  background-color: #EBEEF2;
  border: 1px #EBEEF2 solid;

}
</style>
