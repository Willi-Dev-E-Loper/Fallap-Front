<template>
  <div class="container-flex p-0 fondo">
    <button class="logo-back ml-6 mt-10" @click="goBack">
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="panel-super-admin  row mt-16">
      <div class="d-flex justify-center mt-10 " v-html="logoFallap"></div>

      <div class="custom-card  mt-8 ">
        <div class="p-0 ">
          <h1 class="TituloL">Benvigut/da de nou al teu portal faller!</h1>
        </div>
        <v-text-field
            class="mt-3 col-sm-12 p-0 custom-input w-100 "
            density="comfortable"
            label="Correu"
            v-model="email"
            variant="outlined"
            color="var(--dl-color-miostodos-moradoprincipal)"

        ></v-text-field>
        <v-text-field
            class="mt-1 col-sm-12 p-0 custom-input w-100 "
            variant="outlined"
            v-model="password"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Contrassenya"
            hint="At least 8 characters"
            counter
            color="var(--dl-color-miostodos-moradoprincipal)"
            @click:append-inner="show = !show"
        ></v-text-field>
        <button class="btn d-flex col-sm-12 boton w-100" @click="doLogin">
          Iniciar sessió
        </button>
        <v-progress-linear
            v-if="loading"
            indeterminate
            rounded
            color="var(--dl-color-miostodos-moradoprincipal)"
        ></v-progress-linear>
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
import {computed, ref} from "vue";
import NavMobile from "@/components/NavMobile.vue";
import BoxMessage from "@/components/BoxMessage.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {logoFallap} from "@/utils/icons";

const router = useRouter();
const store = useStore();
let password = ref()
let email = ref()
let show = ref(false)
let loading= ref(false)
let rules= ref({
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
})
const doLogin = () => {
  loading.value = true
  const user = {
    username: email.value,
    password: password.value
  }
  store.dispatch('login', user).then((res)=>{
    console.log(res)
    store.dispatch('getUserData')
    store.dispatch('getFallasToSelect')
    router.push({path:'/falla'})
    loading.value= false
  })
}

</script>

<style scoped>
.fondo{
  background-image: url("../playground_assets/Rectangle 14.jpg");
  background-size: cover;

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
