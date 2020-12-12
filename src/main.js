import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import api from "./api";
import Ls from './services/ls'
import VueWaypoint from 'vue-waypoint'

Vue.use(BootstrapVue)
Vue.use(VueWaypoint)

Vue.config.productionTip = false
window.axios = require('axios')
window.Ls = Ls

window.axios.interceptors.request.use(function (config) {
  const AUTH_TOKEN = api.key
  if (AUTH_TOKEN) {
    config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
