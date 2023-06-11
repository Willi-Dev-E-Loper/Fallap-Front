<template>
<v-container class="p-0">
  <div class="d-flex flex-column align-center mt-5">
    <div v-if="!eventos"  class="pb-10 pt-10 badway text-center d-flex flex-column">
      <div v-html="badWay"></div>
      Encara no hi han events que mostrar
    </div>
    <div v-for="(evento, index) in sortedEventos" :key="index" class="d-flex flex-column align-start justify-center p-4 mb-4 box-evento">
      <div class="d-flex justify-space-between align-center p-0 w-100">
        <p class="p-evento m-0" >Event</p>
        <div v-if="store.state.role!=='ROLE_USER'" class="d-flex justify-space-around {{showActions[index] ? 'w-25': ''}}">
          <button v-if="showActions[index]" @click="toggleShowImg(index)" class="acciones-evento " href="#"><i class="mdi mdi-dots-vertical" ></i></button>
          <button v-if="!showActions[index]" @click="editEvent(evento.idEvento, evento.titulo, evento.contenido, evento.pagos, evento.tienePago, evento.fechaEvento)" class="acciones-evento " href="#"><i class="mdi mdi-pencil-outline" ></i></button>
          <button v-if="!showActions[index]" @click="deleteEvent(evento.idEvento)" class="acciones-evento  ml-3" href="#"><i class="mdi mdi-trash-can-outline" ></i></button>
        </div>

      </div>
      <div class="w-100  mt-8">
        <p class="fecha-evento">{{formatearFecha(evento.fechaEvento)}}</p>
      </div>
      <div class="info-evento d-flex flex-column p-0 mt-2 ">
        <p class="tituloS m-0">{{evento.titulo}}</p>
        <p v-if="evento.contenido" class="parrafosReg m-0 mt-2 color">{{evento.contenido}}</p>
      </div>

      <div class="d-flex align-center varios-chips mt-4">
        <p class="chip">{{evento.contador ?? '0'}} Asistentes</p>
        <p v-if="evento.tienePago " class="chip">{{ evento.pagos}}€</p>
        <p v-if="evento.tienePago  && evento.pagadores.includes(store.state.id)" class="chip-pago">Pagat</p>
        <p v-if=" evento.tienePago && !evento.pagadores.includes(store.state.id)" class="chip-pago" style="background-color: #FFF4F7; border: 2px solid #F0426C; color: #F0426C; ">No Pagat</p>
      </div>
      <div class="d-flex align-start mt-4 textosS">
        <p class="m-0">{{formatDateFooter(evento.fechaCreacion)}}</p>
      </div>
      <button v-if="!evento.tienePago" class="btn d-flex col-sm-12 boton" @click="asistir(index, evento.idEvento)">
       {{evento.tienePago ? 'Pagar i assistir' : 'Assistir'}}
        <v-progress-circular
            v-if="loading && showLoader[index]"
            indeterminate
            color=" var(--dl-color-miostodos-moradoprincipal)"
            :width="2"
            :size="15"
            class="ml-3"
        ></v-progress-circular>
      </button>
      <button v-if="evento.tienePago" class="btn d-flex col-sm-12 boton" @click="pagar(index, evento.idEvento)">
        {{evento.tienePago ? 'Pagar i assistir' : 'Assistir'}}
        <v-progress-circular
            v-if="loading && showLoader[index]"
            indeterminate
            color=" var(--dl-color-miostodos-moradoprincipal)"
            :width="2"
            :size="15"
            class="ml-3"
        ></v-progress-circular>
      </button>
    </div>
  </div>

</v-container>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {badWay} from "@/utils/icons";
import {formatDateFooter, parseFechaComentario, formatearFecha} from "@/utils/date";
import {useRouter} from "vue-router";
import NavDesktop from "@/components/NavDesktop.vue";

const store = useStore()
const router = useRouter()
let showActions = ref([])
let showLoader = ref([])
let loading = ref(false)
const eventos = computed(() => {
  if (store.state.falla) {
    if(store.state.falla.eventos){
      showActions.value = Array(store.state.falla.eventos.length).fill(true);
    }
    return store.state.falla.eventos;
  } else {
    return [];
  }
});
const sortedEventos = computed(() => {
  if(eventos.value){
    return eventos.value.slice().sort((a, b) => {
      const dateA = parseFechaComentario(a.fechaCreacion);
      const dateB = parseFechaComentario(b.fechaCreacion);
      return dateB - dateA;
    });
  }

});
const editEvent = (index, titulo,contenido,pago,tienePago, fecha) => {


  router.push({ name: 'Nuevo evento',
        params: {
          titulo:titulo,
          contenido: contenido,
          idEvento: index,
          pago:pago,
          tienePago: tienePago,
          fecha: fecha
        },

      }
  )
}
const deleteEvent = (idEvento)=>{
  store.commit('setIdEvent', idEvento)
  store.dispatch('deleteEvent').then(()=>{
    store.dispatch('getUserData')
  })

}
const asistir = (index, idEvento)=>{
  showLoader.value[index] = !showLoader.value[index];
  loading.value= true
  const id = store.state.id
  const react = {
    idEvento: idEvento,
    idUsuario: id,
  }
  store.dispatch('reactEvent', react).then(()=>{
    store.dispatch('getUserData').then(()=>{loading.value= false})
  })
}
const pagar = (index, idEvento)=>{
  showLoader.value[index] = !showLoader.value[index];
  loading.value= true
  const id = store.state.id
  const react = {
    idEvento: idEvento,
    idUsuario: id,
  }
  store.dispatch('setPagador', react).then(()=>{
    store.dispatch('getUserData').then(()=>{loading.value= false})
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
const toggleShowImg = (index) => {
  showActions.value[index] = !showActions.value[index];
};
</script>

<style scoped>
*{
  font-family: 'Inter', sans-serif;
}
.box-evento {
  width:100%;
  box-shadow: 0 4px 6px -2px rgba(216, 226, 248, 0.3);
  background: #FFFFFF;
  border: 1px solid #EBEEF2;
  border-radius: 8px;

}
.boton{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  width: 100%;
  height: 36px;
  color: var(--dl-color-miostodos-moradoprincipal);
  background-color: #FFFFFF;
  border: 1px  var(--dl-color-miostodos-moradoprincipal) solid;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
  border-radius: 8px;

}
.color{
  color:#909DAD;
}
.badway{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;

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

.acciones-evento{

  color: #909DAD;
}

.p-evento {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 0;
  color: #909DAD;
}

.fecha-evento {
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 0;
  color: #3D4C5E;

}

.info-evento {
  padding: 5px;
  width:90%;
  word-break: break-word;
  color: #3D4C5E;

}



.chip {
  margin: 0;
  background-color: #F0F3F6;
  width: fit-content;
  padding: 16px;
  border-radius: 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 0;
  color: #3D4C5E;
}

.chip-pago {
  margin: 0;
  background-color: #F5FFF4;
  width: fit-content;
  padding: 14px;
  border-radius: 24px;
  border: 2px solid #94C98F;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 0;
  color: #94C98F;
}

.varios-chips{
  gap: 8px;
}

/* Hovers & Active */

.acciones-evento:hover{
  color: #685FD4;
}

.acciones-evento:active {
  color: #847AF4;
}
</style>