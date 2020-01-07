import Vue from 'vue';
import ElementUI from 'element-ui';

import 'assets/css/theme/index.css'
import 'assets/css/cssreset.css'
import router from 'router/index';
import store from './store'
import test_model from 'views/test_model'
import app from 'views/app'

window.echarts = require('echarts');
Vue.use(ElementUI);
//
Vue.config.productionTip = false;

new Vue({
  render: h => h(app),
  router,
  store
}).$mount('#app');
