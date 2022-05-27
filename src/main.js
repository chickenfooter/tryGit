import Vue from 'vue'
// import './plugins/axios.js'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导出表格
import JsonExcel from 'vue-json-excel'


Vue.component('downloadExcel', JsonExcel)
Vue.use(ViewUI);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false

// 将导入的接口文件全局挂载在vue全局上
// Vue.prototype.$api = api
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://175.178.222.176:9199'
// axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8/x-www-form-urlencoded';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
