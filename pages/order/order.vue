<template>
	<view class="content">
		<view class="head">
			<u-navbar title="个人中心" :autoBack="true"></u-navbar>
		</view>

		<view class="tabs">
			<u-tabs :list="statusList" :current="status" @click="changeStatus">
			</u-tabs>
		</view>

		<view class="order-content">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="scrolltolower">
				<view class="page-box">
					<view class="order" v-for="(item,index) in orderList">
						<view class="top">
							<view class="no">
								<view class="index">订单编号: {{item.no}}</view>
							</view>
							<view class="topHead">
								<view class="left">
									<u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
									<view class="store">{{item.shopName}}</view>
									<u-icon name="arrow-right" color="rgb(203,203,203)" :size="15"></u-icon>
								</view>
								<view class="right">{{ orderStatus(item) }}</view>
							</view>
						</view>
						<view class="item" @click="toDetail(132)">
							<view class="left">
								<u--image :src="item.src" width="90px" height="100px"></u--image>
							</view>
							<view class="content">
								<view class="title u-line-2">{{item.title}}</view>
								<view class="delivery-time">下单时间：{{item.time}}</view>
							</view>
							<view class="right">
								<view class="price">
									￥{{item.price}}
									<text class="decimal">.{{item.decimal}}</text>
								</view>
								<view class="number">x{{item.number}}</view>
							</view>
						</view>
						<view class="bottom">
							<view v-if="item.status == 1" class="cancel">
								剩余时间
							</view>
							<view class="total">
								共{{item.total}}件商品 合计:
								<text class="total-price">
									￥{{item.price}}.
									<text class="decimal">{{item.decimal}}</text>
								</text>
							</view>
						</view>
						<view class="orderAction">
							<view class="left">
								<u-button v-if="item.status == 1 || item.status == 2" type="primary" shape="circle"
									text="取消订单"></u-button>
							</view>
							<view class="right">
								<u-button type="primary" shape="circle">{{orderAction(item.status)}}</u-button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getOrder
	} from '@/api/modules/order.js'
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
					name: '已取消'
				}],
				orderList: [{
						shopName: "小王的店",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						src: require('@/static/img/video.png'),
						no: 'sdjansda215315',
						status: "1"
					},
					{
						shopName: "小王的店",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						status: "2",
						src: '',
						no: "sdksajkj2313"
					},
					{
						shopName: "小王的店",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						status: "3",
						src: '',
						no: "sdasjhio34234"
					},
				],
				status: 0,

			}
		},
		mounted() {
			// url中获取类别id
			this.status = this.$route.query.status

		},
		methods: {
			// 选择不同状态
			changeStatus(index) {
				console.log('status', index)
				this.status = index
				this.getOrderList(this.status)
			},
			// 订单状态显示
			orderStatus(item) {
				let title = ['等待买家付款', '买家已付款', '卖家已发货', '交易成功'];
				if (item.status == 5) {
					if (item.etc.cancelReason == "超时自动取消")
						return '超时取消'
					else
						return '交易关闭'
				} else
					return title[item.status - 1];
			},
			// 订单处理
			orderAction(status) {
				let title = ['继续付款', '催发货', '确认收货', '评价'];
				return title[status - 1];
			},
			scrolltolower() {
				let self = this;
				//在1s后执行一次该函数
				setTimeout(() => {

					self.getOrderList(self.status)

				}, 1000)
			},
			getOrderList(status) {

				getOrder().then((res) => {
					console.log(res.data)
					this.orderList = res.data.data
				}).catch((error) => {
					console.log(error)
				})
			}
		}
	};
</script>

<style lang="scss">
	.head {
		width: 100%;
		display: flex;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;

	}

	.tabs {
		margin-top: 85rpx;
	}

	.order {
		width: 690rpx;
		background-color: #ffffff;
		margin: 10rpx 10rpx 65rpx 10rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 0rpx 15rpx 20rpx 15rpx;
		font-size: 28rpx;

		.top {
			display: block;
			justify-content: space-between;

			.no {
				margin-bottom: 10rpx;

				.index {}
			}

			.topHead {
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.store {
						margin: 0 10rpx;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.right {
					color: #f29100;
				}
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

				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

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



		.bottom {
			display: block;
			margin-bottom: 30rpx;
			padding: 0 10rpx;
			justify-content: space-between;

			.cancel {
				float: left;
			}

			.total {
				bottom: 15rpx;
				position: relative;
				float: right;
				font-size: 24rpx;

				.total-price {
					font-size: 32rpx;
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
	}
</style>





<!-- 

<template>
	<view>
		<view class="wrap">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<view class="order" v-for="(item,index) in pro">
							<view class="top">
								<view class="left">
									<u-icon name="home" :size="20" color="rgb(94,94,94)"></u-icon>
									<view class="store">{{item.store}}</view>
									<u-icon name="arrow-right" color="rgb(203,203,203)" :size="15"></u-icon>
								</view>
								<view class="right">{{item.right}}</view>
							</view>
							<view class="item" @click="jump_detail(132)">
								<view class="left">
									<u--image :src="item.src" width="90px" height="100px"></u--image>
								</view>
								<view class="content">
									<view class="title u-line-2">{{item.title}}</view>
									<view class="delivery-time">下单时间：{{item.time}}</view>
								</view>
								<view class="right">
									<view class="price">
										￥{{item.price}}
										<text class="decimal">.{{item.decimal}}</text>
									</view>
									<view class="number">x{{item.number}}</view>
								</view>
							</view>
							<view class="total">
								共{{item.total}}件商品 合计:
								<text class="total-price">
									￥{{item.price}}.
									<text class="decimal">{{item.decimal}}</text>
								</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pro: [{
						store: "小王的店",
						right: "未支付",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						src: '',
					},
					{
						store: "小王的店",
						right: "未支付",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						src: '',
					},
					{
						store: "小王的店",
						right: "未支付",
						title: "荣耀30 Pro 50倍远摄麒麟990 5G 4000万超感光...",
						time: "2021-12-10",
						price: "3999",
						decimal: "00",
						number: "1",
						total: "1",
						src: '',
					},
				],
				dataList: [],


			};
		},
	}
</script> -->

<!-- <style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style> -->

<!-- <style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: #f29100;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

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

				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

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

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: #f29100;
			}

			.evaluate {
				color: #f29100;
				border-color: #f29100;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
		height: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
 -->