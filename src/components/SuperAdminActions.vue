<template>
  <div class="container-fluid p-0">
    <div class="panel-super-admin  row">

      <div class="logo-fallap p-0">
        <img src="../playground_assets/Logo%20Falla.svg" alt="logo-fallap">
      </div>

      <p class="p-0 m-0">Falla</p>
      <h1 class="p-0 m-0 falla">Beniopa</h1>

      <div class="titulo p-0">
        <h1>Accions</h1>
      </div>
      <button
          v-for="(boton,index) in botones"

          :key="index"
          @click="ejecutar(boton.accion)"
          class="btn d-flex col-sm-12 boton">
        <div class="feo" v-html="boton.icono">
        </div>

        <span class="mx-4">{{boton.texto}}</span>
        <div class="feo">

        </div>

      </button>

    </div>

  </div>
  <nav-mobile></nav-mobile>
</template>

<script setup>
import {ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import AddUser from "@/components/AddUser.vue";
import {useRouter} from "vue-router";
const router = useRouter()
const botones= ref([
  {
    icono:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'+
    '<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 8V14M23 11H17M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
     '</svg>',
    texto: 'Afegir usuari',
    accion: 'addUser()'
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'+
        '<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 8V14M23 11H17M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
        '</svg>',
    texto: 'Importar usuaris CSV',
    accion: 'addUserFromCsv()'
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'+
        '<path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 8V14M23 11H17M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
        '</svg>',
    texto: 'Afegir administrador',
    accion: 'setAdmin()'
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88M19 8C19 11.866 15.866 15 12 15C8.13401 15 5 11.866 5 8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    +'</svg>',
    texto: 'Actualizar premis',
    accion: 'setPremios()'
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M11.7395 17.125V22.025M6.93954 17.125V22.025C0.139541 17.925 2.33954 12.725 2.33954 12.725L4.83954 12.125C4.83954 12.125 3.33954 11.225 3.03954 10.425C6.43954 4.825 9.53954 2.925 10.9395 2.225C11.4395 1.925 12.1395 1.925 12.6395 2.225C14.0395 2.925 17.0395 4.825 20.4395 10.425C20.1395 11.225 18.6395 12.125 18.6395 12.125L21.1395 12.725C21.1395 12.725 23.3395 17.925 16.5395 22.025V17.125" stroke="#3D4C5E" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>'
    +'</svg>'
    ,
    texto: 'Crear falla',
    accion: 'createFalla()'
  },
  {
    icono:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
        +'<path d="M11.7395 17.125V22.025M6.93954 17.125V22.025C0.139541 17.925 2.33954 12.725 2.33954 12.725L4.83954 12.125C4.83954 12.125 3.33954 11.225 3.03954 10.425C6.43954 4.825 9.53954 2.925 10.9395 2.225C11.4395 1.925 12.1395 1.925 12.6395 2.225C14.0395 2.925 17.0395 4.825 20.4395 10.425C20.1395 11.225 18.6395 12.125 18.6395 12.125L21.1395 12.725C21.1395 12.725 23.3395 17.925 16.5395 22.025V17.125" stroke="#3D4C5E" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>'
        +'</svg>',
    texto: 'Editar falla',
    accion: 'editFalla()'
  },
  {
    icono: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
      +'<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    +'</svg>'
    ,
    texto: 'Crear noticia',
    accion: 'createNew()'
  },
])
const ejecutar= (accion)=>{
  eval(accion)
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

</script>

<style scoped>
.container-flex{
  font-family:'Inter', sans-serif;
  padding: 10px;
}
.panel-super-admin{
  margin: 48px 24px 127px 24px;

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
boton:hover{
  background-color: #F0F3F6;
}
.boton:active{
  background-color: #EBEEF2;
  border: 1px #EBEEF2 solid;

}
</style>
