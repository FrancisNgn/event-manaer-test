import Vue from 'vue'
import moment from 'moment';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.filter('formatDateTime', value => value ? moment(String(value)).locale("fr").format('YYYY-MM-DD à hh\\h:mm') : null);
Vue.filter('formatDate', value => value ? moment(String(value)).locale("fr").format('DD MMMM YYYY'): null);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#event-app');
