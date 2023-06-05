<template>
  <div class="d-flex justify-center">
    <div class=" as">
      <div class="nav-box-admin d-flex align-center">

        <btn v-if="role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN'"
             class="nav-icon " @click="panelActions">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </btn>

        <btn class="nav-icon " href="#">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </btn>

        <btn class="nav-icon "  @click="goWallFalla">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7395 17.125V22.025M6.93954 17.125V22.025C0.139541 17.925 2.33954 12.725 2.33954 12.725L4.83954 12.125C4.83954 12.125 3.33954 11.225 3.03954 10.425C6.43954 4.825 9.53954 2.925 10.9395 2.225C11.4395 1.925 12.1395 1.925 12.6395 2.225C14.0395 2.925 17.0395 4.825 20.4395 10.425C20.1395 11.225 18.6395 12.125 18.6395 12.125L21.1395 12.725C21.1395 12.725 23.3395 17.925 16.5395 22.025V17.125" stroke="#3D4C5E" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></btn>

        <btn class="nav-icon " @click="goFalla">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </btn>

        <btn class="nav-icon  nav-logout" href="#">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3601 6.64C19.6185 7.89879 20.4754 9.50244 20.8224 11.2482C21.1694 12.9939 20.991 14.8034 20.3098 16.4478C19.6285 18.0921 18.4749 19.4976 16.9949 20.4864C15.515 21.4752 13.775 22.0029 11.9951 22.0029C10.2152 22.0029 8.47527 21.4752 6.99529 20.4864C5.51532 19.4976 4.36176 18.0921 3.68049 16.4478C2.99921 14.8034 2.82081 12.9939 3.16784 11.2482C3.51487 9.50244 4.37174 7.89879 5.63012 6.64M12.0001 2V12" stroke="#3D4C5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </btn>

      </div>
    </div>

  </div>

</template>
<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";
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
  console.log(role.value)

  router.push({ path: '/falla' })
}
const goWallFalla= ()=>{
  console.log(role.value)

  router.push({ path: '/wall-falla' })
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
  margin-left:25px
}

.nav-crear path{
  stroke:#3D4C5E;
}
.nav-icon:hover path{
  stroke:#685FD4;
}

.nav-logout {
  margin-right:25px;
}

/* Nav-bar Hovers */

/* Nav-bar Active */


</style>