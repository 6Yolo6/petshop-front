<template>
	<view>
		<view class="header">
			<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip" class="search"
				bgColor="linear-gradient(to right, #70e1f5, #ffd194)"></u-search>
			<uni-icons type="location" size="30" class="location"></uni-icons>
		</view>
		<view>
			<u-subsection :list="list" :current="1"></u-subsection>
		</view>
	</view>
</template>

<script>
	import { getAllCate } from '@/api/modeules/pet_category.js'
	export default {
		data() {
			return {
				list: ['未付款', '待评价', '已付款'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 1
			}
		},
		mouted() {

		},
		methods: {

		}
	}
</script>

<style>
	.header {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;
	}
</style>