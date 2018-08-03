import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import axios from 'axios'

Vue.config.productionTip = false

function tokenInterceptor () {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}

Vue.use(VueKeyCloak, {
  config: "http://localhost:8080/keycloak.json",
  onReady: () => {

    tokenInterceptor()

    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }   
});
