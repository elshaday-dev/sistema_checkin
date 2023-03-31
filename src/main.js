import { createApp } from 'vue'
import App from './App.vue'
import CadastroHome from './components/CadastroHome.vue'
import HomeCadastro from './components/HomeCadastro.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')