<template>
  <div class="container-fluid p-0">
    <div class="panel-super-admin  row">

      <div class="logo-fallap p-0">
        <img src="../playground_assets/Logo%20Falla.svg" alt="logo-fallap">
      </div>

      <p class="p-0 m-0">Falla</p>
      <h1 class="p-0 m-0 falla">Beniopa</h1>
    <notice class="p-0"></notice>
    </div>

  </div>
  <nav-mobile></nav-mobile>
</template>

<script setup>
import {ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import AddUser from "@/components/AddUser.vue";
import {useRouter} from "vue-router";
import Event from "@/components/Event.vue";
import Encuesta from "@/components/Encuesta.vue";
import Coment from "@/components/Coment.vue";
import Notice from "@/components/Notice.vue";
import {useStore} from "vuex";
const router = useRouter()
const store = useStore()
let tab =ref()


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
.a{
  background-color:#3D4C5E;
  border-radius:8px;
}
boton:hover{
  background-color: #F0F3F6;
}
.boton:active{
  background-color: #EBEEF2;
  border: 1px #EBEEF2 solid;

}
</style>
