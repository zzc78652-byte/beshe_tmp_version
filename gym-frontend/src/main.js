// import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

// import '@/assets/css/global.css';

// Vue.config.productionTip = false
// Vue.use(ElementUI);
// new Vue({
//   router,
//   store,
//   render: h => h(App),

// }).$mount('#app')

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'

// 新增：引入你封装好的 request.js 
import axios from './utils/request'

Vue.prototype.$echarts = echarts;
// 新增：把 axios 挂载到 Vue 原型上，这样刚才的 this.$axios 就能找到了
Vue.prototype.$axios = axios; 

import '@/assets/css/global.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')


