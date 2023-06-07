import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './router/routes.js'
import {store} from "@/store";
import jwtDecode from "jwt-decode";
import {
    AddComent, AddEncuesta,
    AddEvent,
    AddFalla, AddLlibrets, AddNotice,
    AddUser,
    AdminActions,
    AdminManage, Crear,
    Falla,
    Login,
    PremiosManage,
    SuperAdminActions,
    UsersFromCSV, WallFalla
} from "@/router/components";



let theme='light';
const vuetify = createVuetify({
    ssr:true,
    theme: { defaultTheme: theme },
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

function checkTokenExpiration(token) {
    let isTokenExpired = false;

    if (token) {
        const expirationDate = jwtDecode(token).exp * 1000;
        if (expirationDate <= Date.now()) {
            isTokenExpired = true;
        }
    }

    return isTokenExpired;
}

// Función para comprobar el token cada minuto
function checkToken() {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const isTokenExpired = checkTokenExpiration(token);

    if (token && !isTokenExpired) {
        setTimeout(checkToken, 60000 * 60 * 7.5); // Llamamos a la función de nuevo dentro de un minuto
    } else {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        router.push('/login');
        //toast.show('error', 'Invalid token', 'La sesión ha caducado, introduzca sus credenciales.');
    }
}

// Llamamos a la función para comprobar el token cada minuto
setTimeout(checkToken, 60000);

const router= createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log(store.state.falla)
    if (to.meta.requiresAuth) {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const isTokenExpired = checkTokenExpiration(token);
        const jwt = jwtDecode(token).roles[0]

        if (token && !isTokenExpired) {

            if(to.path==='/sa-actions' && jwt !== 'ROLE_SUPER_ADMIN' ){
                console.log(jwt)
                next('/');//PONER PAGINA ACCES DENIED
            }
            if((to.path==='/sa-actions' || to.path==='/a-actions') && jwt === 'ROLE_USER' ){
                console.log(jwt)
                next('/');//PONER PAGINA ACCESS DENIED
            }
            next();
        } else {
            next('/');
            //toast.show('error', 'Invalid token', 'El token de acceso no existe o ha expirado', 3);
        }
    } else {
        next();
    }
});
const savedState = sessionStorage.getItem('myAppStore');
if (savedState) {
    store.replaceState(JSON.parse(savedState));
}

// Guardar el estado en el almacenamiento local cuando se produzca un cambio
store.subscribe((mutation, state) => {
    sessionStorage.setItem('myAppStore', JSON.stringify(state));
});

createApp(App).use(vuetify).use(router).use(store).mount('#app')