<template>
  <div class="container-flex p-0 fondo">

    <div class="panel-super-admin d-flex justify-content-center row">
      <div class="d-flex justify-center " :class="isWideScreen ? 'desktop' : 'movil' " v-html="logoLogin"></div>

      <div class="custom-card mt-8 ">
        <div class="p-0 ">
          <h1 class="TituloL" >Benvigut/da de nou al teu portal faller!</h1>
        </div>
        <v-form   @submit.prevent="doLogin" ref="form" class=" p-0 w-100"  :class="isWideScreen ? 'mt-8' : '' ">
        <v-text-field
            class=" m-0 p-0 custom-input w-100  "
            :class="!isWideScreen ? 'mt-8' : '' "
            density="comfortable"
            label="Correu"
            v-model="email"
            :rules="[rules.emailReq]"
            variant="outlined"
            color="var(--dl-color-miostodos-moradoprincipal)"


        ></v-text-field>
        <v-text-field
            class=" custom-input  w-100 mt-4 "
            variant="outlined"
            density="comfortable"
            v-model="password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Contrassenya"
            color="var(--dl-color-miostodos-moradoprincipal)"
            @click:append-inner="show = !show"
        ></v-text-field>
        <v-progress-linear
            v-if="loading"
            indeterminate
            rounded
            color="var(--dl-color-miostodos-moradoprincipal)"
            class="mb-2"
        ></v-progress-linear>
        <button class="btn d-flex boton w-100 mt-6" >
          Iniciar sessió
        </button>
        </v-form>
      </div>

    </div>

  </div>

  <v-fade-transition>
    <div v-if="boxMsg" class="box-message-wrapper">
      <box-message :card="card"></box-message>
    </div>
  </v-fade-transition>

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
let password = ref()
let email = ref()
let show = ref(false)
let loading= ref(false)
let rules= ref({
  required: value => !!value || 'Introdueix la contrasenya',
  emailReq: value => !!value || 'Introdueix el teu email',

  emailMatch: () => (`The email and password you entered don't match`),
})
let boxMsg = ref(false)
let card=ref({
  icono: badWay,
  titulo: 'Oh oh, les teues crencials son incorrectes!',
  mensage: '',
  type: '',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})

const doLogin = () => {
  const handleError = () => {
    boxMsg.value = true;

    setTimeout(() => {
      boxMsg.value = false;
    }, 3000);
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  };
  if(email.value && password.value){
    loading.value = true
    const user = {
      username: email.value,
      password: password.value
    }
    store.dispatch('login', user).then((res)=>{
      store.dispatch('getUserData').then(()=>{
        router.push({path:'/falla'})
        loading.value= false
      })
      store.dispatch('getFallasToSelect')
      store.dispatch('getNoticias')
    }).catch((err)=>{
      boxMsg.value = true
      loading.value = false
      handleError()
    })
  }

}
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
  height:426px;
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
