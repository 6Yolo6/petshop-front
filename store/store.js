import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 在这里定义你的状态
		totalProductNum: 0
	},
	mutations: {
		// 在这里定义你的mutations
		updateTotalProductNum(state, num) {
			state.totalProductNum = num;
		}
	},
	actions: {
		// 在这里定义你的actions
	},
	getters: {
		getTotalProductNum: state => state.totalProductNum
	}
});