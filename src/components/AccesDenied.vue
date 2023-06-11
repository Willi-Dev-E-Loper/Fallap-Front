<template>


    <div class="container-flex p-0 fondo">

      <div class="panel-super-admin d-flex justify-content-center row">
        <div class="d-flex justify-center " :class="isWideScreen ? 'desktop' : 'movil' " v-html="logoLogin"></div>
        <v-fade-transition>
        <div class="custom-card mt-8 ">

          <div class="icon mdi mdi-cancel"></div>
          <h2 class="mt-1 textosXl">Accés denegat</h2>
          <p >No tens permis per estar ací!</p>
          <button class="btn d-flex boton" :class="isWideScreen ? 'w-75' : '' " @click="goHome">
            Tornar al login
          </button>

        </div>
        </v-fade-transition>

      </div>

    </div>
</template>

<script setup>
  import {computed, onMounted, onUnmounted, ref} from "vue";
  import NavMobile from "@/components/NavMobile.vue";
  import BoxMessage from "@/components/BoxMessage.vue";
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  import {badWay, comentAdd, logoFallap, logoLogin, userAdd} from "@/utils/icons";

  const router = useRouter();
  const store = useStore();

  const goHome = ()=>{router.push('/login')}
  const isWideScreen = ref(window.innerWidth >= 950);

  const handleResize = () => {
    isWideScreen.value = window.innerWidth >= 950;
  };
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    sessionStorage.clear()
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

</script>

<style scoped>
  .fondo{
    background-image: url("../playground_assets/img_1.png");
    background-size: cover;
    background-attachment: fixed; /* Agregamos esta línea */

  }
  .movil{
    margin-top:150px;
  }
  .desktop{
    margin-top:200px;
  }
  .custom-card{
    width:344px;

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

  .hei{
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
  }
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
    height: 100%;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
    border-radius: 8px;

  }

</style>
