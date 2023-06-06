import  {WallNotice, Login, WallFalla, AddNotice, AddUser, AddLlibrets, AddComent, SuperAdminActions, UsersFromCSV, AdminManage, PremiosManage, AddFalla, Crear, Falla, AdminActions, AddEvent, AddEncuesta } from './components.js'

export const routes=[
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
        component: SuperAdminActions,
        meta:{requiresAuth: true}
    },
    {
        path: "/a-actions",
        name: "Acciones admin",
        component: AdminActions,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-user",
        name: "Nuevo usuario",
        component: AddUser,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-user-csv",
        name: "Usuario desde CSV",
        component: UsersFromCSV,
        meta:{requiresAuth: true}
    },
    {
        path: "/admin-manage",
        name: "Manejar administradores",
        component: AdminManage,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-premi",
        name: "Nuevo premio",
        component: PremiosManage,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-falla/:titulo/:edit",
        name: 'newFalla',
        component: AddFalla,
        meta:{requiresAuth: true}

    },
    {
        path: "/create",
        name: "crear",
        component: Crear,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-llibret",
        name: "Nuevo llibret",
        component: AddLlibrets,
        meta:{requiresAuth: true}

    },
    {
        path: "/new-event/:titulo?/:contenido?/:idEvento?/:pago?/:tienePago?/:fecha?",
        name: "Nuevo evento",
        component: AddEvent,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-coment/:contenido?/:idFalla?/:idComent?",
        name: "Nuevo comentario",
        component: AddComent,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-enquest/:contenido?/:opciones?/:idEncuesta?/:idFalla?/:fecha?",
        name: "Nueva encuesta",
        component: AddEncuesta,
        meta:{requiresAuth: true}
    },
    {
        path: "/new-notice/:titulo?/:contenido?/:idFalla?/:idNoticia?",
        name: "Nueva noticia",
        component: AddNotice,
        meta:{requiresAuth: true}
    },
    {
        path: "/wall-falla",
        name: "Muro falla",
        component: WallFalla,
        meta:{requiresAuth: true}
    },
    {
        path: "/wall-notice",
        name: "Muro noticias",
        component: WallNotice,
        meta:{requiresAuth: true}
    },

];