<template>
	<view class="content">
		<view class="head">
			<u-navbar title="个人中心" :autoBack="true"></u-navbar>
		</view>


		<view class="tabs">
			<u-sticky bgColor="#fff">
				<u-tabs :list="statusList" :scrollable="true" :current="status" @click="changeStatus">
				</u-tabs>
			</u-sticky>
		</view>

		<view class="order-content">
			<view class="page-box">
				<view class="null" v-if="this.orders == null">
					您还没有相关的订单
				</view>
				<view class="orderNo" v-for="(orderNo, indexO) in orders" :key="indexO">
					<view class="order" v-for="(shop, indexS) in orderNo.shopDetails" :key="indexS">
						<view class="shop">
							<u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
							<view class="store">{{shop.shopName}}</view>
							<u-icon name="arrow-right" color="rgb(203,203,203)" :size="15"></u-icon>
						</view>
						<view class="detail" v-for="(pro, indexP) in shop.details" :key="indexP">
							<view class="">
								<view class="top">
									<view class="right">{{ orderStatus(pro) }}</view>
								</view>
								<view class="item" @click="toDetail(pro)">
									<view class="left">
										<u--image :src="pro.img" width="90px" height="100px"></u--image>
									</view>
									<view class="content">
										<view class="pro-name">{{pro.name}}</view>
										<view>
											<uni-text class="orange-text">7天无理由退货</uni-text>
										</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{pro.price}}
										</view>
										<view class="count">
											X{{pro.count}}
										</view>
									</view>
								</view>
								<view class="orderAction">
									<view class="left">
										<u-button v-if="pro.status == 1" type="primary" shape="circle" text="取消订单"
											@click="cancelOrder(pro.orderId)"></u-button>
										<u-button v-if="pro.status == 2 || pro.status == 3 || pro.status == 4"
											type="primary" shape="circle" text="申请退款"
											@click="refundOrder(pro)"></u-button>
									</view>
									<view class="right">
										<u-button type="primary" shape="circle"
											@click="action(pro)">{{orderAction(pro.status)}}</u-button>
									</view>
								</view>
								<view class="" v-if="indexS === orderNo.shopDetails.length - 1">
									<view class="bottom">
										<view v-if="pro.status == 1" class="cancel">
											<span style="color: red;">剩余时间</span>
											<template>
												<u-count-down :time="time(pro)" @finish="finish(pro)"
													format="HH:mm:ss"></u-count-down>
											</template>
										</view>
										<view class="cancelOrder">
											<template>
												<view class="cancel">
													<u-action-sheet round :closeOnClickOverlay="true"
														:title="reason(pro.status)" :show="show" @close="close()">
														<slot>
															<u-button class="confirmCancel" type="primary"
																shape="circle" text="提交"
																@click="cancelORrefund(pro)"></u-button>
															<u--textarea class="reason" v-model="Reason"
																placeholder="请输入理由" count height="200"></u--textarea>
														</slot>
													</u-action-sheet>
													<view class="comment">
														<u-action-sheet round :closeOnClickOverlay="true" title="评价"
															:show="showRate" @close="close()">
															<slot>
																<u-rate count="5" v-model="rate"
																	class="rateIcon"></u-rate>
																<u-button class="confirmComment" type="primary"
																	shape="circle" text="提交"
																	@click="comment(pro)"></u-button>
																<u--textarea class="rate" v-model="content"
																	placeholder="请输入评价" count
																	height="200"></u--textarea>
															</slot>
														</u-action-sheet>
													</view>
												</view>
											</template>
										</view>
									</view>
									<view class="total">
										<text class="total-price">
											合计:￥{{pro.etc.totalPrice}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrder,
		cancelOrder,
		refundOrder
	} from '@/api/modules/order.js'
	import {
		getDetail,
		updateDetail,
		applyRefund
	} from '@/api/modules/order_item.js'
	import {
		getProByIds
	} from '@/api/modules/product.js'
	import {
		add
	} from '@/api/modules/review.js'

	// 自定义比较函数，用于按照 createTime 进行降序排序
	function compareOrders(order1, order2) {
		const createTime1 = new Date(order1.etc.createTime);
		const createTime2 = new Date(order2.etc.createTime);

		if (createTime1 < createTime2) {
			return 1; // 返回正数表示 order1 应排在 order2 之前
		} else if (createTime1 > createTime2) {
			return -1; // 返回负数表示 order1 应排在 order2 之后
		} else {
			return 0; // 保持顺序不变
		}
	}

	export default {
		data() {
			return {
				statusList: [{
					name: '全部'
				}, {
					name: '待付款',
				}, {
					name: '待发货',
				}, {
					name: '待收货'
				}, {
					name: '待评价'
				}, {
					name: '已评价'
				}, {
					name: '已取消'
				}, {
					name: '退款'
				}],
				orders: [],
				status: 0,
				show: false,
				flag: false, //取消or退款
				showRate: false,
				rate: 0,
				content: '',
				Reason: '',
				orderId: 0,
			}
		},
		mounted() {
			// url中获取类别id
			// if (Number(this.$route.query.status)) {
			// 	this.status = Number(this.$route.query.status)
			// 	console.log(this.status)
			// }
			this.getOrderList(this.status)
		},
		methods: {
			// 选择不同状态
			changeStatus(index) {
				console.log('status', index.index)
				this.status = index.index
				this.getOrderList(this.status)
			},
			// 订单状态显示
			orderStatus(item) {
				let title = ['等待买家付款', '买家已付款', '卖家已发货', '交易成功', '交易结束'];
				if (item.status == 6) {
					if (item.etc.cancelReason == "超时自动取消")
						return '超时取消'
					else
						return '交易关闭'
				}
				if (item.status == 7) {
					if (item.refundStatus == 0)
						return '待审核'
					else if (item.refundStatus == 1)
						return '退款成功'
				} else
					return title[item.status - 1]
			},
			// 订单处理
			orderAction(status) {
				let title = ['继续付款', '催发货', '确认收货', '评价', '删除订单']
				return title[status - 1]
			},
			// 自动取消时间
			time(pro) {
				return pro.etc.cancelTime - Date.now()
			},
			// 倒计时结束 
			finish(pro) {
				uni.showToast({
					icon: 'error',
					title: '订单' + pro.etc.no + '超时自动取消'
				})
				this.getOrderList(0)
			},
			close() {
				this.show = false
				this.showRate = false
			},
			// 评价
			comment(pro) {
				console.log(pro)
				console.log("rate", this.rate)
				console.log("orderId", pro.orderId)
				add({
					shopId: pro.shopId,
					comment: this.content,
					rate: this.rate,
					orderItemId: pro.id,
					isPet: pro.isPet == true ? 1 : 0,
					orderId: pro.orderId,
				}).then(res => {
					console.log(res.data)

				})
			},
			reason(status) {
				if (status == 1)
					return '取消理由'
				else if (status == 2 || status == 3 || status == 4)
					return '退款理由'
			},
			// 取消订单
			cancelOrder(orderId) {
				console.log("取消")
				this.show = true
				this.flag = true //取消订单
				this.orderId = orderId
			},
			cancelORrefund(pro) {
				if (this.flag == true) { //取消
					cancelOrder({
						orderId: this.orderId,
						reason: this.Reason
					}).then(res => {
						console.log('取消', res.data)
						uni.showToast({
							title: '取消成功',
						})
						this.show = false
						this.getOrderList(5)
						this.status = 5
					}).catch(err => {
						console.log(err)
					})
				} else { // 退款
					applyRefund({
						orderId: pro.orderId,
						status: pro.status,
						proId: pro.productId,
						isPet: pro.isPet,
						reason: this.Reason
					}).then(res => {
						console.log('退款', res.data)
						uni.showToast({
							title: '申请退款成功'
						})
						this.show = false
						this.getOrderList(7)
						this.status = 7
					})
				}
			},
			// 退款
			refundOrder(pro) {
				this.show = true
				this.flag = false //申请退款
			},
			action(pro) {
				let status = pro.status
				if (status == 4) { //评价
					this.showRate = true
				} else if (status != 2) {
					let self = this
					uni.showModal({
						title: this.orderAction(status),
						content: '是否继续',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// 执行确认后的操作

								updateDetail({
									orderId: pro.orderId,
									productId: pro.productId,
									status: status
								}).then(res1 => {
									console.log(res1.data)
									self.satus = status + 1
									self.getOrderList(status + 1)
								})

							} else if (res.cancel) {
								console.log('用户点击取消');
								// 执行取消后的操作
							}
						}
					})
				}
			},
			// 获取订单
			getOrderList(status) {
				getOrder().then(res => {
					console.log("用户订单", res.data)
					let orderIds = [];
					res.data.data.forEach(i => {
						orderIds.push(i.id)
					})
					getDetail({
						orderIds: orderIds.join(","),
						status: status
					}).then(res1 => {
						let pros = []
						let orderDetails = res1.data.data
						if (orderDetails != null) {
							orderDetails.sort(compareOrders)
						} else {
							this.orders = null
							console.log(this.orders)
							return
						}
						let proIds = []
						let isPet = []
						// 拿出ids和isPet
						orderDetails.forEach(i => {
							proIds.push(i.productId)
							isPet.push(i.isPet == true ? 1 : 0)
						})
						getProByIds({
							ids: proIds.join(","),
							isPet: isPet.join(",")
						}).then(res2 => {
							console.log("产品数组", res2.data)
							let products = res2.data.data
							const mergedArray = orderDetails.map((item1) => {
								const matchingItem2 = products.find((item2) => item2
									.id ===
									item1.productId);
								if (matchingItem2) {
									// 合并 etc 属性，追加而不是覆盖
									return {
										...item1,
										...matchingItem2,
										etc: {
											...item1.etc,
											...matchingItem2.etc,
										}
									};
								} else {
									return item1;
								}
							});

							console.log("合并详情与产品", mergedArray);

							const groupedOrders = {};

							// 遍历订单数组
							mergedArray.forEach(order => {
								const orderNo = order.etc.no; // 获取订单编号
								const shopName = order.etc.shopName; // 获取店铺名称

								// 如果订单编号不存在于结果中，创建一个新的订单组
								if (!groupedOrders[orderNo]) {
									groupedOrders[orderNo] = {
										orderNo: orderNo,
										shopDetails: [] // 创建一个空的店铺详情数组
									};
								}

								// 查找是否存在相同的店铺名称
								const shopIndex = groupedOrders[orderNo].shopDetails
									.findIndex(
										shop => shop.shopName === shopName
									);

								// 如果店铺名称不存在于店铺详情中，创建一个新的店铺详情组
								if (shopIndex === -1) {
									groupedOrders[orderNo].shopDetails.push({
										shopName: shopName,
										details: [] // 创建一个空的产品数组
									});
								}

								// 再次查找新添加的店铺名称的索引
								const newShopIndex = groupedOrders[orderNo].shopDetails
									.findIndex(
										shop => shop.shopName === shopName
									);

								// 将产品添加到对应的店铺详情的产品数组中
								groupedOrders[orderNo].shopDetails[newShopIndex]
									.details
									.push(order);
							});

							// 将结果从对象形式转换为数组形式
							const result = Object.values(groupedOrders).map(orderGroup => {
								return {
									orderNo: orderGroup.orderNo,
									shopDetails: orderGroup.shopDetails
								};
							});

							console.log("最终订单", result)
							this.orders = result
						}).catch(error2 => {
							console.log(error2)
						})
					}).catch(error1 => {
						console.log(error1)
					})
				}).catch(error => {
					console.log(error)
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.head {
		width: 100%;
		display: flex;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;

	}

	.rateIcon {
		position: absolute;
		top: 60rpx;
		left: 35%;
	}

	.tabs {
		margin-top: 82rpx;
		// display: flex;
		margin-bottom: 10px;
		position: fixed;
		// top: 0;
		z-index: 1000;
		// background-color: white;
	}

	.order-content {
		position: absolute !important;
		top: 100px;

		.null {
			margin-left: 100px;
		}


		.orderNo {
			padding-bottom: 40rpx;



			.order {
				width: 690rpx;
				background-color: #ffffff;
				margin: 10rpx 10rpx 65rpx 10rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 0rpx 15rpx 20rpx 15rpx;
				font-size: 28rpx;

				.shop {
					display: flex;

					.store {
						margin: 0 10rpx;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.detail {
					.top {
						display: block;

						.right {
							float: right;
							color: #f29100;
							position: relative;
							bottom: 60rpx;
						}
					}

					.item {
						display: flex;
						margin: 25rpx 0 0;

						.left {
							margin-right: 20rpx;

							image {
								width: 200rpx;
								height: 200rpx;
								border-radius: 10rpx;
							}
						}

						.content {
							width: 60%;

							.orange-text {
								color: #f29100;
								display: inline-block;
								background-color: white;
								padding: 5px;
								border: 2px solid orange;
							}

							.pro-name {
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								max-width: 150px;
							}
						}

						.right {
							left: 110rpx;
							text-align: right;
							position: relative;

							.decimal {
								font-size: 24rpx;
								margin-top: 4rpx;
							}

							.number {
								color: $u-tips-color;
								font-size: 24rpx;
							}
						}
					}

					.orderAction {
						// justify-content: space-between;
						margin-top: 45rpx;

						.left {
							float: left;
						}

						.right {
							float: right;
						}
					}

					.bottom {
						display: block;
						margin-bottom: 30rpx;
						padding: 0 10rpx;
						justify-content: space-between;

						.cancelOrder {

							.cancel {
								display: block;

								.confirmCancel {
									width: 120rpx;
									position: absolute;
									left: 560rpx;
									top: 6rpx;
								}

								.confirmComment {
									width: 120rpx;
									position: absolute;
									left: 560rpx;
									top: 6rpx;
								}

								.reason {
									text-align: left;
								}
							}
						}
					}

					.total {
						right: 60rpx;
						position: relative;
						float: right;
						font-size: 24rpx;

						.total-price {
							font-size: 32rpx;
						}
					}
				}


			}
		}
	}
</style>