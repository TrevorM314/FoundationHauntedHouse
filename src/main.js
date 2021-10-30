import Vue from 'vue'
import App from './App.vue'
import store from "./plugins/store.js";
import router from "./router";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store: store
}).$mount('#app')
