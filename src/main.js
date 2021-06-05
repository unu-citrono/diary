import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { quillEditor } from 'vue-quill-editor'
import '@/assets/fonts/style.css'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
// Vue.prototype.$ajax = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
