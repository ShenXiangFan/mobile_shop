import Vue from 'vue'
import App from './App.vue'
import router from '@/routes/index'
//引入全局css文件
import 'reset-css';
import 'vant/lib/index.css';
// 引入全局组件vant
import '@/plugin/vant'
//动态设置 REM 基准值
import 'amfe-flexible'
Vue.config.productionTip = false
//导入全局样式表
import '@/styles/common.css'
// 引入vuex
import store from '@/store/index'
//获取全部api
import * as API from '@/api/index'
//引入全局组件
import Production from '@/components/Production/'
//添加全局过滤器
import '@/styles/index.less'
import Tips from '@/components/Tips/'
import MyGoodsAction from '@/components/MyGoodsAction/'
import { _ } from "lodash";
Vue.filter('filterMoney', function (val) {
  if(!val)  return ''
  return '￥' + val.toFixed(2) + '元'
})
Vue.component(Production.name, Production)
Vue.component(Tips.name, Tips)
Vue.component(MyGoodsAction.name, MyGoodsAction)
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$API = API
    Vue.prototype.$bus = this
    Vue.prototype._ = _;
  },
}).$mount('#app')
