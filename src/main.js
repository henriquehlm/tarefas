import Vue from 'vue'
import App from './App.vue'

//import material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueRouter from 'vue-router'

import Login from './components/Login.vue';
import Tarefas from './components/Tarefas.vue';
import SigIn from './components/SigIn.vue';


Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/tarefas',
      component: Tarefas
    },    
    {
      path: '/',
      name: "Login",
      component: Login
    },
    {
      path: '/sigin',
      name: "SigIn",
      component: SigIn
    },

  ]
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
