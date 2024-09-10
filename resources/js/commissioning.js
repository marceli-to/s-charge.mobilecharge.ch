/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('@/bootstrap');

// Require Vue
window.Vue = require('vue');

// VueAxios
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

// Store
import store from '@/global/store-commissioning';

// Routes
import routes from '@/global/routes';

// VueRouter
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Filters
require('@/global/filters');

// Set up VueRouter
const router = new VueRouter(
  { 
    mode: 'history',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  }
);

// Mount App
import CommissioningForm from '@/global/components/CommissioningForm.vue';

if (document.getElementById('app-form')) {
  const app = new Vue({
    components: { CommissioningForm },
    router,
    store
  }).$mount('#app-form');
}

