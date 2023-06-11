<template>
  <div class="d-flex justify-center">
    <div class=" as">
      <div class="nav-box-admin d-flex align-center">

        <btn v-if="role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN'"
             class="nav-icon " @click="panelActions">
          <div v-html="plusNav" ></div>
        </btn>

        <btn class="nav-icon " @click="goWallNotice" >
          <div v-html="noticeNav" ></div>
        </btn>

        <btn class="nav-icon "  @click="goWallFalla">
          <div v-html="wallNav" ></div>

        </btn>

        <btn class="nav-icon " @click="goFalla">
          <div v-html="peinetaNav" ></div>
        </btn>

        <btn class="nav-icon  nav-logout" @click="logOut" >
          <div v-html="exitNav" ></div>

        </btn>

      </div>
    </div>

  </div>

</template>
<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";
import {plusNav,wallNav,exitNav, noticeNav, peinetaNav} from "@/utils/icons";

const store = useStore()
let role= computed(() => {
  return store.state.role
});
const router = useRouter()
const panelActions= ()=>{
  if(role.value==='ROLE_ADMIN'){
    router.push({ path: '/a-actions' })
  }
  if(role.value ==='ROLE_SUPER_ADMIN'){
    router.push({ path: '/sa-actions' })
  }
}
const goFalla= ()=>{

  router.push({ path: '/falla' })
}
const goWallFalla= ()=>{

  router.push({ path: '/wall-falla' })
}
const goWallNotice= ()=>{

  router.push({ path: '/wall-notice' })
}
const logOut = ()=>{
  sessionStorage.clear()
  router.push({ path: '/' })
}
const goNotice = ()=>{

  router.push({ path: '/wall-notice' })
}

</script>
<style scoped>
.as{
  position:fixed;
  bottom:10px;


}
.nav-box-admin {
  width: fit-content;
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0 0 2px rgba(231, 213, 255, 0.6), 0 4px 40px -2px rgba(219, 217, 241, 0.6);
  border-radius: 65px;
  margin-bottom:32px;




}
.nav-icon{
  stroke:#3D4C5E;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin:0 20px 0 20px;
}

.nav-crear path{
  stroke:#3D4C5E;
}
.nav-icon:hover path{
  stroke:#685FD4;
}

.nav-logout {
}

/* Nav-bar Hovers */

/* Nav-bar Active */


</style>