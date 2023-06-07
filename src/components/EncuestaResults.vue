<template>
  <v-container class="p-0">
    <div class="d-flex flex-column align-center mt-5">
      <div v-if="sortedEncuestas.length === 0"  class="pb-10 pt-10 badway text-center d-flex flex-column">
        <div v-html="badWay"></div>
        Encara no hi han enquestes que mostrar
      </div>
      <div v-for="(encuesta, index) in sortedEncuestas" :key="index" class="d-flex flex-column align-start justify-center p-4 mb-4 box-evento">
        <div class="d-flex justify-space-between align-center p-0 w-100">
          <p class="p-evento m-0">Enquesta</p>
          <div v-if="store.state.role!=='ROLE_USER'" class="d-flex justify-space-around {{showActions[index] ? 'w-25': ''}}">
            <button v-if="showActions[index]" @click="toggleShowImg(index)" class="acciones-evento " href="#"><i class="mdi mdi-dots-vertical" ></i></button>
            <button v-if="!showActions[index]" @click="editEncuesta(encuesta.idEncuesta, encuesta.titulo, encuesta.opciones, encuesta.fechaCaducidad)" class="acciones-evento " href="#"><i class="mdi mdi-pencil-outline" ></i></button>
            <button v-if="!showActions[index]" @click="deleteEncuesta(encuesta.idEncuesta)" class="acciones-evento  ml-3" href="#"><i class="mdi mdi-trash-can-outline" ></i></button>
          </div>

        </div>
        <div class="info-evento d-flex flex-column p-0 mt-1 ">
          <p class="tituloS m-0">{{encuesta.titulo}}</p>
        </div>
        <div class="d flex mt-3">
          <div v-for="(respuesta, respIndex) in encuesta.opciones" :key="respIndex" class="mb-3 d-flex">
            <v-chip
                class="custom-chip"
                color="grey"
            >
              <p class="m-0 ">{{contarRepeticiones(encuesta.respuestas)[respIndex]?? '0%'}}</p>
            </v-chip>
            <p class=" ml-2 w-50" >
              {{respuesta}}
            </p>
          </div>
        </div>





        <div class="d-flex align-center varios-chips mt-2">
          <p class="chip">{{encuesta.contador}} Votants</p>
        </div>

        <div class="d-flex align-start mt-3 textosS">
          <p class="m-0">{{formatDateFooter(encuesta.fechaCreacion)}}</p>
        </div>
      </div>
    </div>

  </v-container>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {formatDateFooter, parseFechaComentario} from "@/utils/date";
import {useRouter} from "vue-router";
import { badWay} from "@/utils/icons";

let respuestaSeleccionada = ref({})
let g = ref()
const store = useStore()
const router = useRouter()
let showActions = ref([])
let showLoader = ref([])
let loading = ref(false)
const encuestas = computed(() => {
  if (store.state.falla) {
    showActions.value = Array(store.state.falla.encuestas.length).fill(true);

    return store.state.falla.encuestas;
  } else {
    return [];
  }
});
const sortedEncuestas = computed(() => {
  return encuestas.value.slice().sort((a, b) => {
    const dateA = parseFechaComentario(a.fechaCreacion);
    const dateB = parseFechaComentario(b.fechaCreacion);
    return dateB - dateA;
  });
});

function contarRepeticiones(array) {
  const conteo = {};
  const total = array.length;

  for (let i = 0; i < total; i++) {
    const elemento = array[i];
    if (conteo[elemento]) {
      conteo[elemento] += 1;
    } else {
      conteo[elemento] = 1;
    }
  }

  const porcentajes = [];

  for (const elemento in conteo) {
    const cantidad = conteo[elemento];
    const porcentaje = Math.round((cantidad / total) * 100);
    porcentajes.push(`${porcentaje}%`) ;
  }

  return porcentajes;
}
const editEncuesta = (index, coment,opciones,fecha) => {
  const opcionesParametro = opciones.join(",");

  router.push({ name: 'Nueva encuesta',
        params: {
          contenido:coment,
          opciones: opcionesParametro,
          idEncuesta: index,
          idFalla: store.state.falla.idFalla,
          fecha:fecha},
        replace:true,
      }
  )
}
const deleteEncuesta = (idEncuesta)=>{
  store.commit('setIdEncuesta', idEncuesta)
  store.dispatch('deleteEncuesta').then(()=>{
    store.dispatch('getUserData')
  })

}
const toggleShowImg = (index) => {
  showActions.value[index] = !showActions.value[index];
};

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
  cursor: pointer;
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
.custom-checkbox {
  /* Estilos personalizados para el checkbox */
  /* Por ejemplo, puedes ajustar el tamaño, el color, el fondo, los bordes, etc. */
  width: 20px;
  height: 20px;
  border: 2px solid #EBEEF2;
  background-color: #fff;
  border-radius: 5px;
}

.custom-checkbox:checked {
  /* Estilos para el checkbox cuando está marcado */
  /* Por ejemplo, puedes cambiar el color de fondo o el estilo del borde */
  background-color: var(--dl-color-miostodos-moradoprincipal);
  box-shadow: 0px 4px 6px -2px rgba(216, 226, 248, 0.3);
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