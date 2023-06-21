// 导入需要的模块
import Vue from 'vue'
import App from './App.vue'
import uView from '@/uni_modules/uview-ui'
import './static/assets/iconfont.css'
import store from '@/store/store.js';

// 注册uView插件
Vue.use(uView)
// Vue.prototype.$store = store
// 关闭生产提示
// Vue.config.productionTip = false

Vue.config.productionTip = false




// 判断当前环境，选择不同的渲染方式
// #ifndef VUE3
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app;
	}
}
// #endif