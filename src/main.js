import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
/* import VueTableDynamic from 'vue-table-dynamic' */

/* import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' */
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import i18n from './lang/i18n.js'

import 'reset-css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false
Vue.prototype.$moment = moment

localStorage.clear()

Vue.use(ElementUI, { locale })
Vue.use(VueMaterial)

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
