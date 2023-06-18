<template>
	<view class="confirm">
		<view class="head">
			<u-navbar title="确定订单" :autoBack="true">
			</u-navbar>
		</view>
		<view class="address-list" @click="handleUpdate()">
			<view class="address-item">
				<view class="contacts">
					<text class="name">{{ item.name }}</text>
					<text class="phone">{{ item.phoneNumber }}</text>
				</view>
				<view class="address">
					<text class="region">{{ item.area }}</text>
					<text class="detail">{{ item.detail }}</text>
					<u-tag :text="item.tag" class="tag" bg-color="#f93737"></u-tag>
				</view>
			</view>
		</view>
		<view class="detail">

			<view v-for="(shop, index) in carts" :key="index">
				<!-- 商店名称 -->
				<view class="shop-name">{{ shop.shopName }}</view>
				<!-- 商品列表 -->
				<view v-for="(product, pIndex) in shop.products" :key="pIndex" class="product-item">
					<image :src="product.productImg" class="product-img"></image>
					<view class="product-info">
						<view class="product-name">{{ product.productName }}</view>
						<view class="product-price">￥{{ product.productPrice.toFixed(2) }}</view>

						<view class="product-actions">
							<view class="action-btn" @click="sub(product)">-</view>
							<view class="product-count">{{ product.count }}</view>
							<view class="action-btn" @click="add(product)">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="shop-total">共{{ totalNum() }}件 合计: ¥{{ totalPrice() }}</view>
			<view class="submit">
				<u-button type="primary" shape="circle" text="" @click="submit()">提交订单</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		add,
		sub,
		getAll,
	} from '@/api/modules/cart.js'
	import {
		getAddress,
		updateDefaultById,
		getDefault
	} from '@/api/modules/user_address.js'
	export default {
		data() {
			return {
				carts: [],
				item: {}
			}
		},
		onLoad() {
			this.getAll()
			this.getDefault()
			uni.$on('refreshData', () => {
				this.getAll()
				this.getDefault()
			})
		},
		mounted() {
			// this.getAll()
			// this.getDefault()
		},
		methods: {
			getAll() {
				getAll().then(res => {
					console.log(res.data)
					// 使用 filter 方法筛选出 checked 为 true 的对象
					const checkedProducts = res.data.data.reduce((acc, shop) => {
						const checked = shop.products.filter(product => product.checked);
						if (checked.length > 0) {
							acc.push({
								...shop,
								products: checked
							});
						}
						return acc;
					}, []);

					this.carts = checkedProducts;
					console.log(this.carts)
					// this.carts = res.data.data
					this.totalProductNum = this.carts.reduce((total, shopCart) =>
						total + shopCart.productNum, 0);
					this.$store.commit('updateTotalProductNum', this.totalProductNum);
					console.log("总数", this.totalProductNum);
				}).catch(error => {
					console.log(error)
				})
			},
			getDefault() {
				getDefault().then(res => {
					console.log("默认地址", res.data)
					if (res.data.statusCode == "200")
						this.item = res.data.data
					else if (res.data.statusCode == "400") {
						this.item = {
							tag: null,
							detail: res.data.data,
							area: null,
							phoneNumber: null,
							name: null
						};
					}
				}).catch(error => {

				})
			},
			sub(product) {
				let count = product.count
				if (count == 1) {
					uni.showToast({
						title: "该宝贝不能减少了哟~"
					})
				} else {
					sub({
						productId: product.productId
					}).then(res => {
						console.log(res.data)
						this.getAll()
					}).catch(error => {
						console.log(error)
					})
				}
			},
			add(product) {
				// let count = product.count
				// product.count = count + 1
				add({
					productId: product.productId
				}).then(res => {
					console.log(res.data)
					// product.count = res.data.count
					this.getAll()
				}).catch(error => {
					console.log(error)
				})
			},
			totalNum() {
				let totalNum = 0;
				this.carts.map(shopCart => {
					let products = shopCart.products;
					products.map(product => {
						product.checked ? totalNum += product.count : totalNum += 0
					});
				});
				return totalNum
			},
			totalPrice() {
				let totalPrice = 0;
				this.carts.map(shopCart => {
					let products = shopCart.products;
					products.map(product => {
						product.checked ? totalPrice += product.count * product.productPrice :
							totalPrice += 0
					});
				});
				return totalPrice
			},
			handleUpdate() {
				uni.navigateTo({
					url: '/pages/myinfo/address/addresslist',
				});
			},
			// 提交订单
			submit() {
				const countIds = [];
				const productIds = [];
				// 遍历 this.carts 数组，提取 count 和 productId 属性并存入相应数组
				this.carts.forEach(shop => {
					shop.products.forEach(product => {
						countIds.push(product.count);
						productIds.push(product.productId);
					});
				});
				// 打印结果
				console.log("count", countIds); // 输出 count 数组
				console.log("id", productIds); // 输出 productId 数组
				uni.showModal({
					title: '订单结算',
					content: '是否付款',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							// 付款
							console.log('用户点击了确定');
						} else if (res.cancel) {
							// 不付款
							console.log('用户点击了取消');
						}
					}
				});
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

	.tag {
		margin-left: auto;
	}

	.address-list {
		border-radius: 50%;
		padding-top: 20rpx;
		margin: 20rpx;
		// padding-bottom: 120rpx;
	}

	// 项目内容
	.address-item {
		margin: 20rpx auto 20rpx auto;
		padding: 30rpx 40rpx;
		width: 94%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: linear-gradient(to right, #FFD2D2, #ff8c8c);
	}

	.contacts {
		font-size: 30rpx;
		margin-bottom: 16rpx;

		.name {
			margin-right: 16rpx;
		}
	}

	.address {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;

		.region {
			margin-right: 10rpx;
		}
	}

	.confirm {
		padding: 20rpx;
	}

	.detail {
		margin-top: 80upx;
	}

	.shop-name {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}

	.product-item {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.product-img {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}

	.product-info {
		flex: 1;
	}

	.product-name {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}

	.product-price {
		font-size: 26rpx;
		color: #f00;
	}

	.product-count {
		font-size: 26rpx;
	}

	.product-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 10rpx;
	}

	.action-btn {
		font-size: 26rpx;
		padding: 5rpx 10rpx;
		border: 1rpx solid #999;
		margin-left: 10rpx;
		cursor: pointer;
	}

	.bottom {
		position: fixed;
		display: inline-flex;
		bottom: 40rpx;
		right: 40rpx;

		.shop-total {
			font-size: 28rpx;
			font-weight: bold;
			margin-top: 20rpx;
		}

		.submit {}
	}
</style>