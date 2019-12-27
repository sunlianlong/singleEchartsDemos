import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//引入基本模板
// let echarts = require('echarts/lib/echarts')
let echarts = require('echarts')
// 引入折线图等组件
// require('echarts/lib/chart/line')
// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例翻译滚动

Vue.prototype.$echarts = echarts
new Vue({
  render: h => h(App),
}).$mount('#app')
