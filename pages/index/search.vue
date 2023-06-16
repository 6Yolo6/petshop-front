<template>
	<view>
		<view class="header">
			<!-- 导航栏 -->
			<view class="nav">
				<uni-nav-bar shadow left-icon="left" title="搜索页" @clickLeft="back" :border="false" />
			</view>
			<!-- 搜索栏 -->
			<uni-row class="search">
				<uni-col :span="20">
					<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip" @search="search"
						bgColor="linear-gradient(to right, #70e1f5, #ffd194)" :focus="true"
						:showAction="false"></u-search>
				</uni-col>
				<!-- 选择搜索类型 -->
				<uni-col :span="4">
					<uni-data-select v-model="selected_value" @change="change" class="select" :localdata="range"
						:clear="false"></uni-data-select>
				</uni-col>
			</uni-row>
		</view>
		<!-- 搜索结果 -->
		<view class="list">
			<view v-for="(item,index) in result_list" :key="index">
				<!-- 宠物搜索结果 -->
				<view v-if="selected_value==0">
					<uni-card :title="item.name" :isFull="true" :sub-title="item.breed" :extra="''+item.price+'￥'"
						@click="toDetail(item)">
					</uni-card>
				</view>
				<!-- 周边搜索结果 -->
				<view v-else-if="selected_value==1">
					<uni-card :title="item.name" :isFull="true" :sub-title="item.description"
						:extra="''+item.price+'￥'">
					</uni-card>
				</view>
				<!-- 店铺搜索结果 -->
				<view v-else-if="selected_value==2">

				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import { searchByKey } from '@/api/modules/search.js'
	export default {
		data() {
			return {
				selected_value: 0,
				inp_value: '',
				tip: '请输入关键词',
				// 选择器可选项(固定)
				range: [
					{ value: 0, text: "宠物" },
					{ value: 1, text: "周边" },
					{ value: 2, text: "店铺" },
				],
				result_list: [],
			}
		},
		methods: {
			change(value) {
				console.log(value)
			},
			// 返回上一个页面
			back() {
				uni.navigateBack({
					delta: 1, // 返回的层数，1表示返回上一个页面
				});
			},
			// 搜索
			search(value) {
				console.log("查找")
				if (value != "") {
					searchByKey({
						key: value,
						option: this.selected_value + 1,
						pageNum: 1,
						pageSize: 10
					}).then((res) => {
						// console.log(res)
						this.result_list = res.data.data.records
						console.log(this.result_list)
					}).catch((err) => {
						console.log(err)
					})
				} else {
					this.$refs.uToast.show({
						type: "error",
						message: "请输入关键字"
					})
				}
			}
		}
	}
</script>

<style>
	.search {
		width: 100%;
		display: flex;

	}

	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: white;
	}

	// 文本省略
	text {
		/* 使用省略号来表示文本截断部分（适用于Opera浏览器） */
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 使用WebKit引擎的盒子布局模型 */
		display: -webkit-box;
		/* 设置显示的行数为3行 */
		-webkit-line-clamp: 3;
		/* 设置显示的行数为3行 */
		line-clamp: 3;
		/* 设置盒子内文本垂直排列 */
		-webkit-box-orient: vertical;
	}
</style>