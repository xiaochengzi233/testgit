import VueRouter from 'vue-router'
import Vue from 'vue'

import login from 'views/login'
import homepage from 'views/homepage'
import home from 'public/content/home'
import device_list from 'public/content/device/device_list'
import device_detail from 'public/content/device/device_detail'
import device_add from 'public/content/device/device_add'
import device_edit from 'public/content/device/device_edit'
import history_detail from 'public/content/device/history_detail'
import history_detail_homepage from 'public/content/device/history_detail_homepage'
import history_detail_select from 'public/content/device/history_detail_select'

import user_list from 'public/content/user/user_list'
import user_info from 'public/content/user/user_info'
import user_add from 'public/content/user/user_add'
import user_info_edit from 'public/content/user/user_info_edit'
import user_auth from 'public/content/user/user_auth'

import warning_list from 'public/content/warning/warning_list'
import warning_detail from 'public/content/warning/warning_detail'
import warning_handle from 'public/content/warning/warning_handle'
import warning_processing from 'public/content/warning/warning_processing'
import warning_history from 'public/content/warning/warning_history'
import warning_check from 'public/content/warning/warning_check'

import sensor_manage from 'public/content/sensor/sensor_manage'
import sensor_list from 'public/content/sensor/sensor_list'
import sensor_add from 'public/content/sensor/sensor_add'
import sensor_delete from 'public/content/sensor/sensor_delete'
import sensor_detail from 'public/content/sensor/sensor_detail'

// 通过Vue.use()使用插件
Vue.use(VueRouter);

// 创建VueRouter对象，配置组件路由
const routes = [
  {
    path: '',
    redirect: '/login',
    name: 'login',
  },
  {
    path: '/login',
    component: login,
    name: 'login',
  },
  {
    path: '/homepage',
    component: homepage,
    // redirect:'device_managesys',
    children:[
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: home
      },
      {
        path:'device_list', // /:device_id
        component: device_list
      },
      {
        path:'device_detail', // /:device_id
        name: 'device_detail',
        component: device_detail
      },
      {
        path:'device_add',
        component: device_add
      },
      {
        path:'device_edit', // /:device_id
        name: 'device_edit',
        component: device_edit
      },
      {
        path: 'history_detail',
        component: history_detail,
        children: [
          {
            path: '',
            redirect: 'detail'
          },
          {
            path: 'detail',
            name: 'detail',
            component: history_detail_homepage
          },
          {
            path:'history_detail_select',
            component:history_detail_select,
          },
        ]
      },
      {
        path:'user_auth',
        component: user_auth
      },
      {
        path:'user_info',
        component: user_info
      },
      {
        path:'user_info_edit',
        component: user_info_edit
      },
      {
        path:'user_list',
        component: user_list
      },
      {
        path:'user_add',
        component: user_add
      },
      {
        path:'warning_list',
        component: warning_list,
        name:'warning_list'
      },
      {
        path:'warning_processing',
        component:warning_processing,
        name:'warning_processing'
      },
      {
        path:'warning_history',
        component: warning_history,
        name:'warning_history'
      },
      {
        path:'warning_detail', // /:report_id
        component: warning_detail,
        name:'warning_detail'
      },
      {
        path:'warning_handle',
        component: warning_handle,
        name:'warning_handle'
      },
      {
        path:'warning_check',
        component:warning_check,
        name:'warning_check'
      },
      {
        path: 'sensor_manage',
        component: sensor_manage,
        children: [
          {
            path: '',
            redirect: 'sensor_list'
          },
          {
            path:'sensor_list',
            component:sensor_list,
          },
          {
            path: 'sensor_add',
            component: sensor_add
          },
          {
            path:'sensor_delete',
            component:sensor_delete,
          },
          {
            path:'sensor_detail',
            component:sensor_detail,
          },
        ]
      },
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass: 'active'
})

// 将router对象传入到Vue实例
export default router;