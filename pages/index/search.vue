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
						@focus="getUserSearchHistory()" :showAction="false"></u-search>
				</uni-col>
				<!-- 选择搜索类型 -->
				<uni-col :span="4">
					<uni-data-select v-model="selected_value" @change="change" class="select" :localdata="range"
						:clear="false"></uni-data-select>
				</uni-col>
			</uni-row>
		</view>
		<!-- 搜索记录 -->
		<view>
			<u-popup :show="show" mode="left" @close="close" :round="10" :safeAreaInsetTop="true">
				<view>
					<u-list class="search-history" style="max-width: 35vh;">
						<u-list-item v-for="(item, index) in history_list" :key="index">
							<u-cell>
								<view slot="title">
									<u--text type="info" :text="item" @click="autoAssign(item)" :lines="2"></u--text>
								</view>
								<view slot="value">
									<u-button type="error" shape="circle" plain size="mini" icon="close"
										@click="deleteHistory(item)"></u-button>
								</view>
							</u-cell>
						</u-list-item>
					</u-list>
				</view>
				<view class="clear">
					<u-button v-if="isShowClearHistory" type="primary" text="清空历史" shape="circle"
						@click="showConform=true"></u-button>
				</view>
			</u-popup>
		</view>
		<!-- <u-toast ref="uToast"></u-toast> -->
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
					<uni-card :title="item.name" :isFull="true" :sub-title="item.description" :extra="''+item.price+'￥'"
						@click="toDetail(item)">
					</uni-card>
				</view>
				<!-- 店铺搜索结果 -->
				<view v-else-if="selected_value==2">
					<uni-card :title="item.name" :isFull="true" :sub-title="item.description" :extra="''+item.price+'￥'"
						@click="toDetail(item)">
					</uni-card>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showConform" :closeOnClickOverlay="true" :content="confirmContent" :showCancelButton="true"
			@confirm='confirmYes()' @cancel="confirmNo" @close="clickOverlay"></u-modal>
	</view>
</template>

<script>
	import {
		searchByKey,
		getUserSearchHistory,
		deleteUserSearchHistory,
		clearUserSearchHistory
	} from '@/api/modules/search.js'
	export default {
		data() {
			return {
				isShowClearHistory: true,
				showConform: false,
				confirmContent: "您确定要清空历史记录吗？",
				history_list: [],
				// 显示历史记录弹出层
				show: false,
				selected_value: 0,
				inp_value: '',
				tip: '请输入关键词',
				// 选择器可选项(固定)
				range: [{
						value: 0,
						text: "宠物"
					},
					{
						value: 1,
						text: "周边"
					},
					{
						value: 2,
						text: "店铺"
					},
				],
				result_list: [],
			}
		},
		mounted() {
			this.getUserSearchHistory()
		},
		methods: {
			// 清空历史记录
			confirmYes() {
				this.clearHistory()
				this.showConform = false
			},
			clickOverlay() {
				this.showConform = false
			},
			confirmNo() {
				this.showConform = false
			},
			// 清空用户历史记录
			clearHistory() {
				clearUserSearchHistory().then(res => {
					console.log(res)
					this.getUserSearchHistory()
				})
			},
			// 删除单个历史记录
			deleteHistory(key) {
				deleteUserSearchHistory({ key: key }).then(res => {
					console.log(res)
					// this.$refs.uToast.show({
					// 	type: 'success',
					// 	title: '失败主题',
					// 	message: "删除成功",
					// 	iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					// })
					this.getUserSearchHistory()
				})
			},
			// 自动填充关键词
			autoAssign(value) {
				this.inp_value = value
				this.search(value)
				console.log(value)
			},
			// 关闭遮罩层
			close() {
				this.show = false
				// console.log('close');
			},
			change(value) {
				this.inp_value = ''
				this.result_list = []
				console.log(value)
			},
			// 返回上一个页面
			back() {
				uni.navigateBack({
					delta: 1, // 返回的层数，1表示返回上一个页面
				});
			},
			//获取搜索记录
			getUserSearchHistory() {
				getUserSearchHistory().then(res => {
					this.history_list = res.data.data
					if (this.history_list.length == 0) {
						this.isShowClearHistory = false
						this.show = false
					} else {
						this.isShowClearHistory = true
						this.show = true
					}
					console.log(this.history_list)
				})
			},
			// 搜索
			search(value) {
				console.log("查找")
				this.show = false
				if (value != "") {
					searchByKey({
						key: value,
						option: this.selected_value + 1,
						pageNum: 1,
						pageSize: 10
					}).then((res) => {
						this.result_list = res.data.data.records
					}).catch((err) => {
						console.log(err)
					})
				} else {
					this.$refs.uToast.show({
						type: "error",
						message: "请输入关键字"
					})
				}
			},
			toDetail(item) {
				console.log("详情", item)
				if (this.selected_value == 0) {
					uni.navigateTo({
						url: '/pages/index/pet_details?id=' + item.id
					});
				} else if (this.selected_value == 1) {
					uni.navigateTo({
						url: '/pages/shop/product_detail?id=' + item.id
					});
				}
				  else{
					uni.navigateTo({
						url: '/pages/shop/shop_detail?id=' + item.id
					});
				}
			}
		}
	}
</script>

<style scoped>
	.clear {
		text-align: center;
		width: 90%;
		position: absolute;
		bottom: 250rpx;
	}

	.search-history {
		/* position: absolute; */
		margin-top: 40%;
		height: 200rpx;
		min-width: 400rpx;
	}

	.search {
		width: 100%;
		display: flex;
		margin-top: 88rpx;
		z-index: 90077;
		background: #ffffff;
	}

	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: white;
		z-index: 90077;
		background: #ffffff;
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