<template>
  <v-container>
    <div class="d-flex flex-column align-center">
      <div v-for="(evento, index) in eventos" :key="index" class="d-flex flex-column align-start justify-center p-4 mb-4 box-evento">
        <div class="d-flex justify-space-between align-center p-0 w-100">
          <p class="p-evento m-0" >Noticia</p>
          <div class="d-flex justify-space-around {{isAcciones ? 'w-25': ''}}">
            <button v-if="isAcciones" @click="a" class="acciones-evento " href="#"><i class="mdi mdi-dots-vertical" ></i></button>
            <button v-if="!isAcciones" @click="" class="acciones-evento " href="#"><i class="mdi mdi-pencil-outline" ></i></button>
            <button v-if="!isAcciones" @click="" class="acciones-evento  ml-3" href="#"><i class="mdi mdi-trash-can-outline" ></i></button>

          </div>
        </div>
        <div class="w-100">
          <p class="fecha-evento">{{formatearFecha(evento.fechaEvento)}}</p>
        </div>
        <div class="info-evento d-flex flex-column p-0 mt-1 ">
          <p class="TituloS m-0">{{evento.contenido}}</p>
        </div>
        <div class="d-flex align-start mt-3 textosS">
          <p class="m-0">{{formatDateFooter(evento.fechaCreacion)}}</p>
        </div>

      </div>
    </div>

  </v-container>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {formatDateFooter} from "@/utils/date";

const store = useStore()
let isAcciones = ref(true)
const eventos = computed(() => {
  if (store.state.falla) {
    return store.state.falla.eventos;
  } else {
    return [];
  }
});
const formatearFecha= (fechaOriginal)=> {
  console.log(fechaOriginal)
  const [dia, mes, anio] = fechaOriginal.split('-');
  return `${dia}/${mes}`;


}
const a = ()=>{
  isAcciones.value = !isAcciones.value
}
</script>

<style scoped>
*{
  font-family: 'Inter', sans-serif;
}
.box-evento {
  width: 80vw;

  box-shadow: 0 4px 6px -2px rgba(216, 226, 248, 0.3);
  background: #FFFFFF;
  border: 1px solid #EBEEF2;
  border-radius: 8px;
  cursor: pointer;
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