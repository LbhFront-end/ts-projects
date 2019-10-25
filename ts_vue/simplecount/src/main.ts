import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Component from 'vue-class-component'
import Mock from 'mockjs'
import AntVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(AntVue)

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line: no-var-requires
  require('../mock')
}

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
