<script setup>
import SuperAdminAccions from './components/SuperAdminActions.vue'
import AdminActions from './components/AdminActions.vue'
import AdminManage from './components/AdminManage.vue'
import BoxMessage from './components/BoxMessage.vue'
import AddUser from './components/AddUser.vue'
import UsersFromCSV from "@/components/UsersFromCSV.vue";
import PremiosManage from "@/components/PremiosManage.vue";
import AddFalla from "@/components/AddFalla.vue";
import AddComent from "@/components/AddComent.vue";
import AddEvent from "@/components/AddEvent.vue";
import AddEncuesta from "@/components/AddEncuesta.vue";
import NavMobile from "@/components/NavMobile.vue";
import Crear from "@/components/Crear.vue";
import Falla from "@/components/Falla.vue";
import Event from "@/components/Event.vue";
import Encuesta from "@/components/Encuesta.vue";
import Coment from "@/components/Coment.vue";
import WallFalla from "@/components/WallFalla.vue";
import AddNotice from "@/components/AddNotice.vue";
import AddLlibrets from "@/components/AddLlibrets.vue";
import Login from "@/components/Login.vue";
import {onBeforeMount, onMounted} from "vue";
import {useStore} from "vuex";
let theme= ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red-darken-3', 'indigo-darken-3', 'orange-darken-3'];



</script>

<template >
  <div class="a">
    <v-app class="b">
      <router-view></router-view>
    </v-app>
  </div>

</template>

<style scoped>
.a{
  background-image: url("./playground_assets/Desktop - 6.jpg");
  background-size: cover;
}
@media (min-width: 768px) {
  .b{
    margin: 0 258px 0 258px;
  }
}
</style>
