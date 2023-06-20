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
			<view v-if="this.isPet == 1">
				<view class="order-page" v-if="isPet == 1">
					<view class="pet-image-wrapper">
						<image class="pet-image" :src="pet.img"></image>
					</view>
					<view class="pet-info">
						<view class="pet-name">{{ pet.name }}</view>
						<view class="pet-description">{{ pet.description }}</view>
						<view class="pet-details">
							<view>品种：{{ pet.breed }}</view>
							<view>年龄：{{ pet.age }}</view>
							<view>健康状况：{{ pet.health }}</view>
						</view>
						<view class="delivery-info">
							<view class="delivery-title">配送方式</view>
							<view>快递配送</view>
							<view>预计3-5个工作日送达</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-else-if="this.isPet == 0">
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
		getAllCart,
		deleteByIds
	} from '@/api/modules/cart.js'
	import {
		getAddress,
		updateDefaultById,
		getDefault
	} from '@/api/modules/user_address.js'
	import {
		addOrder
	} from '@/api/modules/order.js'
	import {
		addItem,
		getByOrderIds
	} from '@/api/modules/order_item.js'
	import {
		getById
	} from '@/api/modules/pet.js'
	import {
		getShopIds
	} from '@/api/modules/product.js'
	export default {
		data() {
			return {
				carts: [],
				item: {},
				isPet: 0,
				pet: {}
			}
		},
		onLoad() {
			// console.log("是否宠物", this.isPet)

		},
		mounted() {

			// 获取当前页面栈
			const pages = getCurrentPages();

			// 获取上一个页面的实例对象
			const prevPage = pages[pages.length - 2];

			// 可以通过prevPage访问上一个页面的数据和方法
			console.log("上一个页面", prevPage.route);

			if (prevPage.route == "pages/cart/cart")
				this.isPet = 0
			else if (prevPage.route == "pages/index/pet_details")
				this.isPet = 1
			console.log("isPet", this.isPet)

			this.petId = Number(this.$route.query.id)
			console.log("petId", this.petId)
			// 刷新数据
			uni.$on('refreshData', () => {
				if (this.isPet == 1) {
					this.getPet(this.petId)
				} else if (this.isPet == 0) {
					this.getAll()
				}
				this.getDefault()
			})

			if (this.isPet == 1) { // 宠物订单
				this.getPet(this.petId)
			} else if (this.isPet == 0) { //周边购物车订单
				this.getAll()
			}
			this.getDefault()

		},
		methods: {
			// 获取宠物信息
			getPet(id) {
				getById({
					id: id
				}).then(res => {
					console.log("宠物", res.data)
					this.pet = res.data.data
				}).catch(error => {
					console.log(error)
				})
			},
			// 获取周边购物车信息
			getAll() {
				getAllCart().then(res => {
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
				if (this.isPet == 1)
					return 1
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
				if (this.isPet == 1)
					return this.pet.price
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
				const countIds = []
				const productIds = []
				const shopIds = []
				// 遍历 this.carts 数组，提取 count 和 productId 属性并存入相应数组
				this.carts.forEach(shop => {
					shop.products.forEach(product => {
						countIds.push(product.count);
						productIds.push(product.productId);
						shopIds.push(product.shopId)
					});
				});
				// 打印结果
				console.log("count", countIds); // 输出 count 数组
				console.log("productId", productIds); // 输出 productId 数组
				uni.showModal({
					title: '订单结算',
					content: '是否付款',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							// 付款
							addOrder({
								sumPrice: this.totalPrice(),
								isPay: 1,
								addressId: this.item.id
							}).then(res1 => {
								console.log("订单", res1.data)
								addItem({
									orderId: res1.data.data.id,
									status: 2,
									ids: productIds.join(","),
									nums: countIds.join(","),
									isPet: this.isPet,
									shopIds: shopIds.join(",")
								}).then(res2 => {
									console.log("订单详情", res2.data)
									deleteByIds({
										ids: productIds.join(",")
									}).then(res3 => {
										console.log("清空购物车", res3.data)
										uni.navigateTo({
											// url: '/pages/order/order?status=2'
											url: '/pages/myinfo/myinfo'
										})
									}).catch(error3 => {
										console.log(error3)
									})
								}).catch(error2 => {
									console.log(error2)
								})
							}).catch(error1 => {
								console.log(error1)
							})
						} else if (res.cancel) {
							// 不付款
							addOrder({
								sumPrice: this.totalPrice(),
								isPay: 0,
								addressId: this.item.id
							}).then(res1 => {
								console.log("订单", res1.data)
								addItem({
									orderId: res1.data.data.id,
									status: 1,
									ids: productIds.join(","),
									nums: countIds.join(","),
									isPet: this.isPet,
									shopIds: shopIds.join(",")
								}).then(res2 => {
									console.log("订单详情", res2.data)
									deleteByIds({
										ids: productIds.join(",")
									}).then(res3 => {
										console.log("清空购物车", res3.data)
										uni.navigateTo({
											// url: '/pages/order/order?status=1'
											url: '/pages/myinfo/myinfo'
										})
									}).catch(error3 => {
										console.log(error3)
									})
								}).catch(error2 => {
									console.log(error2)
								})
							}).catch(error1 => {
								console.log(error1)
							})
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



	.order-page {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pet-image-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.pet-image {
		width: 300px;
		height: 150px;
		border-radius: 10px;
	}

	.pet-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}

	.pet-name {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.pet-description {
		font-size: 16px;
		color: #999;
		margin-bottom: 20px;
	}

	.pet-details {
		font-size: 16px;
		color: #666;
		margin-bottom: 10px;
	}

	.delivery-info {
		margin-top: 20px;
	}

	.delivery-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
</style>