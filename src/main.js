// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import {Message} from 'element-ui';
import qs from 'qs';
/*导入全局样式表*/
import './assets/css/global.css'

Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$qs = qs
/*配置请求根路径*/
axios.defaults.baseURL='http://localhost:8890/'
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h =>h(App)
}).$mount('#app')
