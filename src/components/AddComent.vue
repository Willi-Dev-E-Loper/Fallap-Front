<template>
  <div class="container-fluid p-0 d-flex">
    <nav-desktop v-if="isWideScreen"></nav-desktop>
    <div class="w-100" >
      <button class="logo-back ml-6 mt-10" @click="goBack">
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 13.5L1.5 7.5L7.5 1.5" stroke="#1D242D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="panel-super-admin  row" :class="isWideScreen ? 'mt-16' : '' ">


        <div class="titulo p-0">
          <h1>          {{params.contenido ? 'Editar comentari' : 'Postejar'}}
          </h1>
        </div>
        <v-form   @submit.prevent="addComent" ref="form" class="p-0" :class="isWideScreen ? 'mt-8' : '' ">
          <v-file-input

              v-model="imagenComentario"
              class="mt-4  p-0 custom-select "
              clearable
              chips
              accept="image/png, image/jpeg, image/bmp"
              base-color="var(--dl-color-miostodos-moradoprincipal)"
              label="Selecciona imatge del comentari"
              variant="outlined"
              prepend-icon=""
              prepend-inner-icon="mdi mdi-panorama-variant-outline"
              density="comfortable"
          ></v-file-input>

          <v-textarea
              v-model.lazy="descripcionComentario"
              label="Descripciò de l'event"
              placeholder="Introdueix  ací la informaciò del comentari"
              auto-grow
              counter
              :rules="[v => !!v || 'El comentari no pot estar buit']"
              variant="outlined"
              rows="3"
              row-height="25"
              class="mt-1 col-sm-12 p-0 custom-input"
              color="var(--dl-color-miostodos-moradoprincipal)"

              shaped
          >
          </v-textarea>
          <v-progress-linear
              v-if="loading"
              indeterminate
              rounded
              color="var(--dl-color-miostodos-moradoprincipal)"
              class="mb-2"
          ></v-progress-linear>
          <button type="submit" class="btn d-flex col-sm-12 boton w-100" >
            {{params.contenido ? 'Editar comentari' : 'Postejar'}}
          </button>

        </v-form>

      </div>
    </div>


  </div>
  <nav-mobile v-if="!isWideScreen"></nav-mobile>
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
import {dateNow} from "@/utils/date";
import {comentAdd} from "@/utils/icons";
import NavDesktop from "@/components/NavDesktop.vue";

const router = useRouter();
const store = useStore();
const params = router.currentRoute.value.params;
const form = ref(null)
let imagenComentario = ref();
let descripcionComentario = ref(params.contenido ?? "");
let idComent = ref(params.idComent);
let boxMsg = ref(false)
let loading = ref(false)
let card=ref({
  icono: comentAdd,
  titulo:'Comentari postejat!',
  mensage: '',
  type:'success',
  boton: 'Tornar al home',
  boton1: '',
  boton2: ''
})
const addComent = () => {

    if (descripcionComentario.value){
      loading.value= true
      store.commit("setIdComent", idComent.value);
      const coment = new FormData();
      if (imagenComentario.value) {
        coment.append("file", imagenComentario.value[0]);
      }
      coment.append("descripcionComentario", descripcionComentario.value);
      coment.append("fechaCreacion", dateNow());

      const handleError = () => {
        boxMsg.value = true;
        card.value = {
          icono: comentAdd,
          titulo: 'Oh oh, algo no ha ixit com esperava!',
          mensage: '',
          type: '',
          boton: 'Tornar al home',
          boton1: '',
          boton2: ''
        };
        setTimeout(() => {
          boxMsg.value = false;
        }, 3000);
        setTimeout(() => {
          loading.value = false;
        }, 3000);
        setTimeout(() => {
          card.value = {
            icono: comentAdd,
            titulo: 'Comentari postejat!!',
            mensage: '',
            type: 'success',
            boton: 'Tornar al home',
            boton1: '',
            boton2: ''
          };
        }, 4000);
      };

      if (idComent.value) {
        store.dispatch("putComent", coment).then((res) => {
          loading.value=false
          if (!res.ok) {
            handleError();
          } else {
            boxMsg.value = true;
          }
        });
        store.dispatch('getUserData');
      } else {
        coment.append("idFalla", store.state.falla.idFalla ?? params.idFalla);

        store.dispatch("postNewComent", coment).then((res) => {
          loading.value=false
          if (!res.ok) {
            handleError();
          } else {
            boxMsg.value = true;
          }
        });
        store.dispatch('getUserData');
      }
    }




};
async function validate () {
  const { valid } = await form.value.validate()

  if (valid) alert('Form is valid')
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
function goBack(){router.back()}


</script>

<style scoped>
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
