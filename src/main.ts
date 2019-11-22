import Vue from 'vue';
import App from './App.vue';
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';

Vue.use(TextBoxPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
