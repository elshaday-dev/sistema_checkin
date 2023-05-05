import { createApp } from 'vue'
import App from './App.vue'
import CadastroHome from './components/CadastroHome.vue'
import HomeCadastro from './components/HomeCadastro.vue'
import CheckIn from './components/CheckIn.vue'
import CheckFinal from './components/CheckFinal.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VuePusher } from 'vue-pusher';
import Pusher from 'pusher-js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Pusher.logToConsole = true;

const routes = [
  {
    path: '/',
    name: 'CadastroHome',
    component: CadastroHome
  },
  {
    path: '/cadastro',
    name: 'HomeCadastro',
    component: HomeCadastro
  },
  {
    path: '/check-in',
    name: 'CheckIn',
    component: CheckIn
  },
  {
    path: '/check-final',
    name: 'CheckFinal',
    component: CheckFinal
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.provide('apiUrl', process.env.VUE_APP_API_URL);

app.use(router).use(VueToast).use(VuePusher, {
  api_key: 'b9fd36fe72d986cec08f',
  options: {
    cluster: 'us2',
    forceTLS: true,
    authTransport: 'jsonp'
  }
})

app.mount('#app')