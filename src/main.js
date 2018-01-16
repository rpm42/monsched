// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'mdi/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css'
// import 'tachyons'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
