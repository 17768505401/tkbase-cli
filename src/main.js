// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Select, Form, Input, FormItem, Option, Loading, Message} from 'element-ui';
import api from './api/apis'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
