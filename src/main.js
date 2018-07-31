import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

Vue.config.productionTip = false

Vue.use(VueKeyCloak, {
  config: "http://localhost:8080/keycloak.json",
  onReady: (keycloak) => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }   
});
