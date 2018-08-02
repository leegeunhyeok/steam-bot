import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* 디버깅용 */
Vue.config.devtools = true

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
