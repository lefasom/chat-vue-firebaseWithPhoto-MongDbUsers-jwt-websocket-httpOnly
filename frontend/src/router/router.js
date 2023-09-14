import { createRouter, createWebHistory } from 'vue-router'
import PerfilConfig from '../views/PerfilConfig.vue'
import ImgConfig from '../views/ImgConfig.vue'
import CreateChat from '../views/CreateChat.vue'
import Descubre from '../views/Descubre.vue'
import Amigos from '../views/Amigos.vue'
import Login from '../views/Login.vue'
import CreateUser from '../views/CreateUser.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Descubre',
    component: Descubre
  },
  {
    path: '/Chat/:id',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/CreateChat',
    name: 'CreateChat',
    component: CreateChat
  },
  {
    path: '/CreateUser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/PerfilConfig',
    name: 'PerfilConfig',
    component: PerfilConfig
  }, {
    path: '/ImgConfig',
    name: 'ImgConfig',
    component: ImgConfig
  },
  {
    path: '/Amigos',
    name: 'Amigos',
    component: Amigos
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
