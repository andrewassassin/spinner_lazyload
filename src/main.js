import Vue from 'vue'
import App from './App.vue'


//具有bootstrap js的功能
import 'bootstrap/dist/js/bootstrap.min'
//引用bootstrap css的功能
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(BootstrapVue)
new Vue({
  el: '#app',
  render: h => h(App)
})
