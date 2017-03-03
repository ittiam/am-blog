import Vue from 'vue';

import Element from 'element-ui';
Vue.use(Element);

import App from './App';

const app = new Vue({
  ...App
});

app.$mount('#app');
