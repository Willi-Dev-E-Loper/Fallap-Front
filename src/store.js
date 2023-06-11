import {createStore} from 'vuex'
import axios from 'axios'
import * as jwt_decode from 'jwt-decode'
import jwtDecode from "jwt-decode";
import {da} from "vuetify/locale";

export const store = createStore({
    state () {
        return {
            id:null,
            name:null,
            surname:null,
            role:null,
            email:null,
            description:null,
            phone:null,
            isAdmin:false,
            falla:null,
            fallas2select:null,
            idComent:null,
            idEncuesta:null,
            idEvent:null,
            editComent:null,
            accessCtrl:true,
            token:null,
            expiration:null,
            isLoged: false,
            idFalla:null,
            idNoticia:null,
            noticias:null

        }
    },
    mutations: {
        setId(state, payload){
            state.id= payload
        },
        setName(state, payload){
            state.name= payload
        },
        setSurname(state, payload){
            state.surname= payload
        },
        setRole(state, payload){
            state.role= payload.toString()
        },
        setEmail(state, payload){
            state.email= payload
        },
        setDescripcion(state, payload){
            state.description= payload
        },
        setPhone(state, payload){
            state.phone= payload
        },
        setIsAdmin(state, payload){
            state.isAdmin= payload
        },
        setFalla(state, payload){
            state.falla= payload
        },
        setFallas2Select(state, payload){
            state.fallas2select = payload
        },
        setIdComent(state, payload){
            state.idComent= payload
        },
        setIdEncuesta(state, payload){
            state.idEncuesta= payload
        },
        setIdEvent(state, payload){
            state.idEvent= payload
        },
        setEditComent(state, payload){
            state.editComent= payload
        },
        setAccesCtrl(state, payload){
            state.accessCtrl= payload
        },
        setToken(state, payload){
            state.token= payload
        },
        setExpiration(state, payload){
            state.expiration = new Date(payload * 1000)
        },
        setIsLoged(state, payload){
            state.isLoged = payload
        },
        setIdFalla(state, payload){
            state.idFalla = payload
        },
        setIdNoticia(state, payload){
            state.idNoticia = payload
        },
        setNoticias(state, payload){
            state.noticias = payload
        }

    },
    actions: {
        getUserData({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:8000/api/user/'+ state.email,
                    {
                        headers: {
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    })
                    .then((res) => {
                        let userData = res.data.user;
                        commit('setName', userData.nombre);
                        commit('setSurname', userData.apellidos);
                        commit('setEmail', userData.email);
                        commit('setRole', userData.roles[0]);
                        commit('setDescripcion', userData.descripcion);
                        commit('setPhone', userData.telefono);
                        commit('setFalla', userData.falla);
                        commit('setId', userData.id);
                        commit('setIdFalla', userData.falla.idFalla);

                        resolve(); // Resuelve la promesa sin ningún valor adicional
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err); // Rechaza la promesa con el error recibido
                    });
            });
        },
        async login({commit, state}, data ){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/login_check',
                    data,
                )
                const jwt = jwtDecode(response.data.token)
                const { token } = await response.data;
                commit('setEmail',jwt.username)
                commit('setIsLoged', true)
                commit('setToken',token)
                commit('setExpiration', jwt.exp)
                sessionStorage.setItem("token", token);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }

        },
        getFallasToSelect({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:8000/api/falla/select',
                    {
                        headers: {
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    })
                    .then((res) => {
                        let fallas = res.data;
                        commit('setFallas2Select', fallas);
                        resolve(); // Resuelve la promesa sin ningún valor adicional
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err); // Rechaza la promesa con el error recibido
                    });
            });
        },
        getNoticias({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:8000/api/falla/noticias',
                    {
                        headers: {
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    })
                    .then((res) => {
                        let fallas = res.data;
                        commit('setNoticias', fallas);
                        resolve(); // Resuelve la promesa sin ningún valor adicional
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err); // Rechaza la promesa con el error recibido
                    });
            });
        },
       async postNewUser({commit, state}, data){

           try {
               const response = await axios.post(
                   'http://localhost:8000/api/user/new',
                   data,
                   {
                       headers: {
                           Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                       },
                   }
               );

               return response.data;
           } catch (error) {
               console.log(error);
               throw error;
           }
           },
        async postNewEvent({commit, state}, data){
                    try {
                        const response = await axios.post(
                            'http://localhost:8000/api/evento/new',
                            data,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                                },
                            }
                        );

                        return response.data;
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
        },
        async putEvent({commit, state}, data){
                    try {
                        const response = await axios.post(
                            'http://localhost:8000/api/evento/' + state.idEvent,
                            data,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                                },
                            }
                        );

                        return response.data;
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
        },
        async deleteEvent({commit, state}, data){
            await axios.delete('http://localhost:8000/api/evento/' + state.idEvent,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async reactEvent({commit, state}, data){
            await axios.put('http://localhost:8000/api/evento/setParticipante/'+ data.idEvento, data.idUsuario,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async setPagador({commit, state}, data){
            await axios.put('http://localhost:8000/api/evento/setPagador/'+ data.idEvento, data.idUsuario,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async postNewFalla({commit, state}, data){

                    try {
                        const response = await axios.post(
                            'http://localhost:8000/api/falla/new',
                            data,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                                },
                            }
                        );

                        return response.data;
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
        },
        async putFalla({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/falla/' + state.idFalla,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async setLlibret({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/falla/llibret',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async setPremio({commit, state}, data){
            await axios.post('http://localhost:8000/api/falla/premio', data, {
                headers: {
                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                }})
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async unsetPremio({commit, state}, data){
            await axios.post('http://localhost:8000/api/falla/delete-premio', data, {
                headers: {
                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                }})
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async postNewComent({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/comentario/new',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async putComent({commit, state}, data){

                    try {
                        const response = await axios.post(
                            'http://localhost:8000/api/comentario/'+ state.idComent,
                            data,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                                },
                            }
                        );

                        return response.data;
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
        },
        async deleteComent({commit, state}, data){
            await axios.delete('http://localhost:8000/api/comentario/' + state.idComent,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async postNewNotice({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/noticia/new',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async putNotice({commit, state}, data){

            try {
                const response = await axios.post(
                    'http://localhost:8000/api/noticia/'+ state.idNoticia,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async postNewEncuesta({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/encuesta/new',
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async putEncuesta({commit, state}, data){
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/encuesta/'+ state.idEncuesta,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async deleteEncuesta({commit, state}, data){
            await axios.delete('http://localhost:8000/api/encuesta/' + state.idEncuesta,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async reactEncuesta({commit, state}, data){
            await axios.put('http://localhost:8000/api/encuesta/react', data,
                {
                    headers: {
                        Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                    },
                })
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },
        async postNewCsv({commit, state}, data){

            try {
                const response = await axios.post(
                    'http://localhost:8000/api/user/importCsv',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async postRole({commit, state}, data){
            await axios.post('http://localhost:8000/api/user/setRoles', data, {
                headers: {
                    Authorization: `Bearer ${state.token  || sessionStorage.getItem('token')}`,
                }})
                .then(()=>
                    {}
                )
                .catch((err)=>{
                    console.log(err)
                })
        },

    },
    getters: {
        admins: state => {
            const usuariosConRoleAdmin = state.falla.falleros.filter(usuario => {
                return usuario.role.includes("ROLE_ADMIN");
            });

            return usuariosConRoleAdmin.map(usuario => {
                const apellido = usuario.apellidos !== null ? usuario.apellidos : "";
                return `${usuario.nombre} ${apellido}`.trim();
            });
        },
        isAuthenticated: (state) => {
            return state.expiration > Date.now();
        }
    }


})