import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Custom Css
import "@/assets/scss/main.scss"

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

// Filter
// Capitilazes the first chars in words
Vue.filter("capitalize", (val) => {
  if(!val) {
    return "";
  }
  return val.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
})

// Capitilazes the first chars in words
Vue.filter("prefix", (val) => {
  if(!val) {
    return "";
  }
  return `Mr. ${val}`;
})

// Parse date into local string
Vue.filter("parseDate", (val) => {
  if(!val) {
    return "";
  }
  return val.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
})

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.prototype.$getRandomNumber = getRandomNumber;

Vue.filter('priceFormat', (val) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MMK', 
    minimumFractionDigits: 2,
  });
  return formatter.format(val);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
