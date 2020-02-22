import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css'
import echarts from 'echarts'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// 引入mock数据
import '../mockData'

Vue.prototype.$echarts = echarts;
// 引入自组件
import PanelTitle from './components/PanelTitle'
import PanelBody from './components/PanelBody'

Vue.component(PanelTitle.name, PanelTitle);
Vue.component(PanelBody.name, PanelBody);

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(VXETable);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
