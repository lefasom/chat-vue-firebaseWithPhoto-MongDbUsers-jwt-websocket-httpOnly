import { createStore } from 'vuex'
import { db } from '../firebase/firebase'
import { getDocs, collection, doc, deleteDoc, addDoc, updateDoc, getDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import Axios from 'axios'
Axios.defaults.baseURL = "https://chat-153n.onrender.com"
// Axios.defaults.baseURL = "http://localhost:3001"


const store = createStore({
  state() {
    return {
      modoNocturno: false,
      mensajes: [],
      usuario: {
        userName: '',
        password: '',
        email: '',
        photo: '',
        connection: false,
        _id: '',
      },
      id: null,
      usuarios: [],
      conexion: false
    };
  },
  mutations: {

    // modoNocturno

    SET_MODO_NOCTURNO(state) {
      state.modoNocturno = !state.modoNocturno
    },

    // chat

    SET_MENSAJE(state, msj) {
      state.mensajes = msj
    },

    // usuarios

    SET_USER(state, value) {
      state.usuario.userName = value.userName
      state.usuario.password = value.password
      state.usuario.email = value.email
      state.usuario.photo = value.photo
      state.usuario.connection = true
      state.usuario._id = value._id
    },

    SET_USERS(state, us) {
      state.usuarios = us
    },

    SET_CONNECTION(state, val) {
      state.conexion = val.conexion
    },

  },
  actions: {

    // modoNocturno

    modificoModoNocturno({ commit }) {
      commit('SET_MODO_NOCTURNO')
    },

    // chat

    async fetchMensajes({ commit }) {
      const mensajesRef = collection(db, 'mensajes');
      const orderedQuery = query(mensajesRef, orderBy('fecha'));
      onSnapshot(orderedQuery, (snapshot) => {
        const msj = snapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.data()
        }));
        commit('SET_MENSAJE', msj)
      });
    },

    async crearMensaje({ commit }, value) {
      const collectionRef = collection(db, 'mensajes');
      const docRef = await addDoc(collectionRef, value);
    },

    async borrarMensaje({ commit }, id) {
      await deleteDoc(doc(db, 'mensajes', id))
    },

    // usuarios

    conexionOff({ commit }) {
      commit('SET_CONNECTION', { conexion: false })

    },

    async createUsuario({ commit }, value) {
      const resp = await Axios.post('/postUser', value)
      const err = {
        error: resp.data.error,
        message: resp.data.message
      }
      return err
    },

    async getUsuarios({ commit }) {
      const resp = await Axios.get('/getUsers')
      const us = resp.data
      commit('SET_USERS', us)
    },

    async updateUsuario({ commit }, value) {// Muestro si los usuarios estan conectados en el servidor
      const resp = await Axios.put('/updateUser', value, {
        withCredentials: true, // Habilita el envío de cookies
      })
    },

    async perfilConfig({ commit }, value) {// Muestro si los usuarios estan conectados en el servidor
      const resp = await Axios.put('/perfilConfig', value, {
        withCredentials: true, // Habilita el envío de cookies
      })
      return resp
    },

    async setUsuario({ commit }, value) {
      try {
        const resp = await Axios.post('/getUser', {
          userName: value.userName,
          password: value.password,
        }, {
          withCredentials: true, // Habilita el envío de cookies
        })
        if (resp.data.message == 'Usuario autenticado') {
          const val = resp.data.user
          // Muestro si los usuarios estan conectados en el servidor => {
          const value = {
            userName: val.userName,
            password: val.password,
            email: val.email,
            photo: val.photo,
            connection: val.connection,
            _id: val._id
          }
          // } <= Muestro si los usuarios estan conectados en el servidor
          commit('SET_USER', value)
        }
        return resp
      } catch (error) {
        console.log(error)
      }
    },

    async getLogin({ commit }) {
      try {
        const resp = await Axios.get('/getLogin', {
          withCredentials: true, // Habilita el envío de cookies
        })

        if (resp.data.message === 'Usuario autenticado') {
          const val = resp.data.user
          // Muestro si los usuarios estan conectados en el servidor => {
          const value = {
            userName: val.userName,
            password: val.password,
            email: val.email,
            photo: val.photo,
            connection: !val.connection,
            _id: val._id
          }
          // } <= Muestro si los usuarios estan conectados en el servidor

          commit('SET_USER', value)
          commit('SET_CONNECTION', { conexion: true })
          console.log('refresh session')
        } else {
          console.log(resp.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async setDatosUsuario({ commit }, value) {
      commit('SET_USER', value)
    },

    async destruirEstado({ commit }) {
      const value =
      {
        _id: '',
        userName: '',
        password: '',
        email: '',
        photo: '',
        connection: false
      }
      console.log('Logout')
      commit('SET_USER', value)
    },

    async borrarCook({ commit }) {
      await Axios.get('borrarCookie', {
        withCredentials: true, // Habilita el envío de cookies
      })
    }

  }
})

export default store