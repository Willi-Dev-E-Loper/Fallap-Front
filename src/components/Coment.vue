<template>
  <v-container class="p-0">
    <div class="d-flex flex-column align-center mt-5">
        <div v-if="sortedComentarios.length === 0"  class="pb-10 pt-10 badway text-center d-flex flex-column">
          <div v-html="badWay"></div>
          Encara no hi han comentaris que mostrar
        </div>
      <div v-for="(coment, index) in sortedComentarios" :key="index" class="d-flex flex-column align-start justify-center p-4 mb-4 box-evento" >
        <div class="d-flex justify-space-between align-center p-0 w-100">
          <p class="p-evento m-0 textosM">Comentari</p>
          <div v-if="store.state.role!=='ROLE_USER'" class="d-flex justify-space-around {{showActions[index] ? 'w-25': ''}}">
            <button v-if="showActions[index]" @click="toggleShowImg(index)" class="acciones-evento " href="#"><i class="mdi mdi-dots-vertical" ></i></button>
            <button v-if="!showActions[index]" @click="editComent(coment.idComentario, coment.contenido)" class="acciones-evento " href="#"><i class="mdi mdi-pencil-outline" ></i></button>
            <button v-if="!showActions[index]" @click="deleteComent(coment.idComentario)" class="acciones-evento  ml-3" href="#"><i class="mdi mdi-trash-can-outline" ></i></button>
          </div>
        </div>
        <div v-if="coment.imagen" class="mt-2 w-100">
          <img class="" :src="'http://localhost:8000/uploads/brochures/' + coment.imagen" alt="imagen-comentario">
        </div>
        <div class="info-evento d-flex flex-column p-0 mt-4">
          <p class="textosReg m-0">{{ coment.contenido }}</p>
        </div>
        <div class="d-flex align-start mt-3 textosS">
          <p class="m-0">{{ formatDateFooter(coment.fechaComentario) }}</p>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script setup>
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {formatDateFooter, parseFechaComentario} from "@/utils/date";
import {useRouter} from "vue-router";
import {badWay} from "@/utils/icons";
import NavDesktop from "@/components/NavDesktop.vue";

const router = useRouter()
const store = useStore()
let showActions = ref([])
const comentarios = computed(() => {
  if (store.state.falla) {
    showActions.value = Array(store.state.falla.comentarios.length).fill(true);

    return store.state.falla.comentarios;
  } else {
    return [];
  }
});
const sortedComentarios = computed(() => {
  return comentarios.value.slice().sort((a, b) => {
    const dateA = parseFechaComentario(a.fechaComentario);
    const dateB = parseFechaComentario(b.fechaComentario);
    return dateB - dateA;
  });
});


const toggleShowImg = (index) => {
  showActions.value[index] = !showActions.value[index];
};
const editComent = (index, coment) => {
  router.push({ name: 'Nuevo comentario',
    params: { contenido:coment,
              idFalla: store.state.falla.idFalla,
              idComent: index}
        ,
        replace:true,
  }
  )
}
const deleteComent = (idComent)=>{
  store.commit('setIdComent', idComent)
  store.dispatch('deleteComent').then(()=>{
    store.dispatch('getUserData')
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
</script>

<style scoped>
*{
  font-family: 'Inter', sans-serif;
}
.box-evento {
  width: 100%;

  box-shadow: 0 4px 6px -2px rgba(216, 226, 248, 0.3);
  background: #FFFFFF;
  border: 1px solid #EBEEF2;
  border-radius: 8px;

}
img{
  width:99%;
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