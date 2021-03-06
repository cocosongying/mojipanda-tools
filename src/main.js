import Vue from 'vue';
import App from './App.vue';
import router from './router';

//import css
import 'vue-beauty/package/style/vue-beauty.min.css'

//import components
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
