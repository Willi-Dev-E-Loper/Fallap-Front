import  {Login, WallFalla, AddNotice, AddUser, AddLlibrets, AddComent, SuperAdminActions, UsersFromCSV, AdminManage, PremiosManage, AddFalla, Crear, Falla, AdminActions, AddEvent, AddEncuesta } from './components.js'

export const routes=[
    { path: "/", redirect: "/login" },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requiresAuth: true // Define requiresAuth como true para requerir autenticación
        }
    },
    {
        path: "/falla",
        name: "Home",
        component: Falla,
        meta: {
            requiresAuth: true // Define requiresAuth como true para requerir autenticación
        }

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
    },

];