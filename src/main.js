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
/*const routes=[
    { path: "/", redirect: "/login" },
    {
        path: "/login",
        name: "Login",
        component: Login,

    },
    {
        path: "/falla",
        name: "Home",
        component: Falla,
        meta:{requiresAuth: true}


    },
    {
        path: "/sa-actions",
        name: "Acciones super-admin",
        component: SuperAdminActions
    },
    {
        path: "/a-actions",
        name: "Acciones admin",
        component: AdminActions
    },
    {
        path: "/new-user",
        name: "Nuevo usuario",
        component: AddUser
    },
    {
        path: "/new-user-csv",
        name: "Usuario desde CSV",
        component: UsersFromCSV
    },
    {
        path: "/admin-manage",
        name: "Manejar administradores",
        component: AdminManage
    },
    {
        path: "/new-premi",
        name: "Nuevo premio",
        component: PremiosManage
    },
    {
        path: "/new-falla/:titulo",
        name: 'newFalla',
        component: AddFalla,

    },
    {
        path: "/create",
        name: "crear",
        component: Crear
    },
    {
        path: "/new-llibret",
        name: "Nuevo llibret",
        component: AddLlibrets

    },
    {
        path: "/new-event/:titulo?/:contenido?/:idEvento?/:pago?/:tienePago?/:fecha?",
        name: "Nuevo evento",
        component: AddEvent
    },
    {
        path: "/new-coment/:titulo/:contenido?/:idFalla?/:idComent?",
        name: "Nuevo comentario",
        component: AddComent
    },
    {
        path: "/new-enquest/:contenido?/:opciones?/:idEncuesta?/:idFalla?/:fecha?",
        name: "Nueva encuesta",
        component: AddEncuesta
    },
    {
        path: "/new-notice",
        name: "Nueva noticia",
        component: AddNotice
    },
    {
        path: "/wall-falla",
        name: "Muro falla",
        component: WallFalla
    }

]*/
const router= createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log(to.meta.requiresAuth)
    if (to.meta.requiresAuth) {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const isTokenExpired = checkTokenExpiration(token);

        if (token && !isTokenExpired) {
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