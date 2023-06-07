<template>

  <div v-if="falla!==null" class="container-fluid p-0">
    <div class="pantalla">

      <div class="caja">
        <div class="box">
          <img :src="'http://localhost:8000/uploads/brochures/' + falla.imagenPortada">
        </div>
      </div>
      <div class="logo-falla">
        <img :src="'http://localhost:8000/uploads/brochures/' + falla.logo" alt="" class="logo">
      </div>

      <div class="caja-principal">
        <h1 class="falla" >Falla</h1>
        <h2 class="nombre-falla">{{falla.nombre}}</h2>
        <div class="chips d-flex flex-column align-start">
          <v-chip
              class="mt-3"
              prepend-icon="mdi-account-circle-outline"
              color="grey"
          >
            {{falla.falleros.length}} Fallers/es
          </v-chip>
        </div>
        <div class="descripcion mt-4">
          <p>{{falla.descripcion}}</p>
        </div>
        <h1 class="falla mt-8">Càrregs oficials 2023</h1>
        <div class="cargos d-flex flex-column align-start">
          <v-chip
              class="mt-3"
              color="orange"
              label
          >
            <v-icon start icon="mdi mdi-crown"></v-icon>
            {{falla.cargos[0]}}
          </v-chip>
          <v-chip
              class="mt-2"
              color="indigo"
              label
          >
            <v-icon start icon="mdi mdi-crown"></v-icon>
            {{falla.cargos[1]}}
          </v-chip>
          <v-chip
              class="mt-2"
              color="cyan"
              label
          >
            <v-icon start icon="mdi mdi-shield"></v-icon>
            {{falla.cargos[2]}}
          </v-chip>
        </div>

        <v-tabs
            bg-color="#F0F3F6"
            color="#F0F3F6"
            class="mt-8"
            selected-class="a"
            align-tabs="center"
            v-model="tab"
            grow
            center-active
            rouded
            hide-slider
        >
          <v-tab size="x-large"  value="one" >Premis</v-tab>
          <v-tab size="x-large" value="two">Llibrets</v-tab>
          <v-tab size="x-large" value="three">Contacte</v-tab>
        </v-tabs>
        <v-card-text  class="p-0">
          <v-window v-model="tab">
            <v-window-item value="one" >
              <div class="actions d-flex flex-column">
                <div v-if="falla.premios.length === 0"  class="pb-10 pt-10 badway text-center d-flex flex-column">
                  <div v-html="badWay" ></div>
                  Encara no hi han premis que mostrar
                </div>
                <button
                    v-for="(premio,index) in falla.premios"
                    :key="index"
                    @click="ejecutar(index)"

                    class="btn d-flex col-sm-12 boton disabled ">
                  <div class="feo" v-html="logoPremio">
                  </div>


                  <div class="d-flex flex-column align-start ml-7 mt-4 w-75">
                    <h4 class="m-0 titulo-premio">{{premio[3]}} {{premio[2]}}</h4>
                    <p class="subtitulo-premio">{{premio[0]}}</p>
                  </div>
                </button>
              </div>
            </v-window-item>

            <v-window-item value="two">
              <div class="actions d-flex flex-column">
                <div v-if="falla.llibrets.length === 0"  class="pb-10 pt-10 badway text-center d-flex flex-column">
                  <div v-html="badWay"></div>
                  Encara no hi han llibrets que mostrar
                </div>
                <button
                    v-for="(llibret,index) in falla.llibrets"
                    :key="index"
                    @click="ejecutar(llibret[2])"
                    class="btn d-flex col-sm-12 boton ">
                  <div class="feo" v-html="logoLlibret">
                  </div>


                  <div class="d-flex flex-column align-start ml-7 mt-4 w-75">
                    <h4 class="m-0 titulo-premio">{{llibret[0]}}</h4>
                    <p class="subtitulo-premio">{{llibret[1]}}</p>
                  </div>
                  <div v-if="isLibrets" v-html="logoRight"  ></div>

                </button>
              </div>
            </v-window-item>

            <v-window-item value="three">
              <div class="actions d-flex flex-column m-0">
               <div class="admin mt-4 ">
                 <p class="textosM contacto m-0">Responsable/s</p>
                 <p class="parrafosReg contacto-datos m-0" >{{ admins ? admins : 'Sense assignar' }}</p>
               </div>
                <div class="admin mt-4 ">
                  <p class="textosM contacto m-0">Telèfon</p>
                  <p class="parrafosReg contacto-datos m-0" >{{ falla.telefono ? falla.telefono : 'Sense assignar'}}</p>
                </div>
                <div class="admin mt-4 ">
                  <p class="textosM contacto m-0">Email</p>
                  <p class="parrafosReg contacto-datos m-0" >{{ falla.email ? falla.email : 'Sense assignar' }}</p>
                </div>
                <div class="phone mt-4 ">
                  <p class="textosM contacto m-0">Direcció</p>
                  <p class="parrafosReg contacto-datos m-0" >{{ falla.direccion ? falla.direccion : 'Sense assignar' }}</p>
                </div>
                <div class="web mt-4 ">
                  <p class="textosM contacto m-0">Lloc web</p>
                  <p class="parrafosReg contacto-datos m-0" >{{ falla.web ? falla.web : 'Sense assignar'}}</p>
                </div>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>

      </div>
      <nav-mobile></nav-mobile>

    </div>
  </div>
</template>
<script setup>
import NavMobile from "@/components/NavMobile.vue";
import {logoRight, logoPremio, logoLlibret, badWay} from "@/utils/icons";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
let isLibrets= ref(true)
let tab =ref()
const falla = computed( () => {

    return store.state.falla;

});
const admins = computed( () => {

  const usuarios= store.getters.admins;
  const usuariosFiltrados = usuarios.filter(usuario => usuario.trim() !== "");
  return usuariosFiltrados.join(", ");

});
const goCreate = () => {
  isLibrets.value = !isLibrets.value
}
const ejecutar= (llibret)=>{
  const pdf = 'http://localhost:8000/uploads/brochures/' + llibret
  window.open(pdf)
}
onMounted(()=>{
  store.dispatch('getUserData')
})

</script>
<style scoped>
.contacto{
  color: #909DAD;
}
.contacto-datos{
  color:#3D4C5E;
}
.disabled{
  pointer-events: none;
  cursor: not-allowed;
  opacity: 1;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
.caja{
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background: #333944;
}
.box{
  width: 100%;
  height: 258px;
  background: #CCC;
  overflow: hidden;
}

.box img{
  width: 100%;
  height: auto;
}
@supports(object-fit: cover){
  .box img{
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}
.caja-principal{
  margin: 80px 24px 127px 24px;
}
.falla{
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0;
  text-align: left;
  margin:0;
  color: #1D242D;

}
.nombre-falla{
  font-size: 42px;
  font-weight: 500;
  line-height: 51px;
  letter-spacing: 0;
  text-align: left;
  margin:0;
  color: #1D242D;

}
.descripcion{
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  text-align: left;

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
.boton{
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  height: 75px;
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
.boton:hover{
  background-color: #F0F3F6;
}
.boton:active{
  background-color: #EBEEF2;
  border: 1px #EBEEF2 solid;

}
.titulo-premio{
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color:#3D4C5E;

}
.subtitulo-premio{

  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color:#909DAD;


}

.a{
  background-color:#3D4C5E;
  border-radius:8px;
}
.cover {
  position: relative;
  width: 100%;
  height: 258px;
  overflow: hidden;
  background-color: black;
}

.cover > img {
  position: center;
  height:100%;
  z-index: 1;
}

.logo-falla {
  position: absolute;
  top: 258px;
  left: 100px;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.logo-falla .logo {
  width: 150px;
  border-radius:50%;
  /* Ajusta el tamaño del logo de perfil según tus necesidades */
}

.pantalla {
  position:relative;
  margin-right: 258px;
  margin-left: 258px;
}

@media (max-width: 920px) {
  .pantalla {
    margin-right: 158px;
    margin-left: 158px;
  }
}

@media (max-width: 780px) {
  .pantalla {
    margin-right: 0px;
    margin-left: 0px;
  }
}

</style>
