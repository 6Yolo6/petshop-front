<template>
	<view>
		<view class="header">
			<u-navbar title="购物车" :autoBack="true" bgColor="lightyellow">
			</u-navbar>
		</view>
		<view style="background-color:aliceblue;">
			<view  v-for="(shop, indexS) in carts" :key="indexS" style="margin-bottom: 1px; background-color: #FFFFFF; margin-top: 90rpx;">
				<view >
					
					<view style="display: flex;line-height: 28upx;align-items: center;background-color: bisque;" @click="toShop(shop.products[0].shopId)">					
				<image src="../../static/tabbar/cart.png" mode="scaleToFill" style="vertical-align: middle; width: 20px; height: 20px;"></image>
									{{shop.shopName}} >
					</view>
				</view>
				<view class="carts-detail" v-for="(product,indexP) in shop.products" :key="indexP" >
					<view class="detail-left">
						<view class="goods-left">
							<checkbox-group @change="selected(product)">
								<label>
									<checkbox shape="circle"  class="selected" color="#555555" :checked="product.checked" />

								</label>
							</checkbox-group>
							<u--image :src="product.productImg" @click="toDetail(product.productId)" width="80px"
								height="80px"></u--image>
						</view>
						<view class="size" @click.top="toDetail(product.productId)">
							<text style="font-size: 35rpx;">{{product.productName}}</text>
							<text class="del" @click.stop="del(product,indexP)"><uni-icons type="trash"/></text>
							<text class="goods-price">￥{{product.productPrice}}/件</text>
	
						</view>
					</view>
					<view class="detail-right">
						<text class="subtract" @click="reduce(product)">-</text>
						<text class="num">{{product.count}}</text>
						<text @click="add(product)" class="add">+</text>
					</view>
				</view>
			</view>
		</view>
		<view class="end">
			<view class="end-left">
				<checkbox-group @change="selectcarts()">
					<label>
						<checkbox :checked="allchecked" />全选
					</label>
				</checkbox-group>
				<view>
					总计：<text style="color: #f00;font-weight: bold;">￥ {{totalPrice}}</text>
				</view>
			</view>
			<view class="end-right" @click="toConfirm()">
				结算({{totalNum}})
			</view>
		</view>
	</view>
</template>

<script>
	import {
		add,
		sub,
		getAllCart,
		update,
		updateAll,
		deleteByIds
	} from '@/api/modules/cart.js'
	import {
		validate
	} from '../../api/modules/user';
	export default {
		data() {
			return {
				allchecked: false,
				carts: [],
				totalProductNum: 0,
				isActive: false,
			}
		},
		onShow() {
			this.isActive = true;
			if (this.isActive)
				this.validate()
		},
		onHide() {
			this.isActive = false
		},
		mounted() {

		},
		methods: {
			validate() {
				validate().then(res => {
					if (res.data.statusCode == "200") {
						this.allchecked = this.Allchecked()
						this.getAll()
					} else {
						uni.showToast({
							icon: 'error',
							title: "请先登录"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getAll() {
				getAllCart().then(res => {
					console.log(res.data)
					this.carts = res.data.data
					this.Allchecked()
					this.totalProductNum = this.carts.reduce((total, shopCart) =>
						total + shopCart.productNum, 0);
					this.$store.commit('updateTotalProductNum', this.totalProductNum);
					console.log("总数", this.totalProductNum);
				}).catch(error => {
					console.log(error)
				})
			},
			selected(product) {
				product.checked = !product.checked
				update({
					productId: product.productId
				}).then(res => {
					console.log(res.data)
					this.getAll()
					this.Allchecked()
				}).catch(error => {
					console.log(error)
				})

			},
			selectcarts() {
				this.allchecked = !this.allchecked
				let ids = []
				this.carts.forEach(shopCart => {
					shopCart.products.forEach(product => {
						const productId = product.productId.toString();
						ids.push(productId);
					});
				});
				updateAll({
					ids: ids.join(',')
				}).then(res => {
					this.getAll()
				}).catch(error => {

				})

			},
			del(product) {
				// this.carts.splice(index, 1)
				deleteByIds({
					ids: product.productId
				}).then(res => {
					console.log(res.data)
					this.getAll()
					uni.showToast({
						title: "删除成功"
					})
				}).catch(error => {
					console.log(error)
				})
			},
			reduce(product) {
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
			Allchecked() {
				// 将多层嵌套的 carts 数组展开，并筛选出未勾选的产品 flatMap可以嵌套多次
				const uncheckedProducts = this.carts.flatMap(shopCart =>
					shopCart.products).filter(p =>
					!p.checked);
				this.allchecked = uncheckedProducts.length == 0; // 更新全选按钮状态
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
			toConfirm() {
				// console.log(this.totalPrice)
				let price = this.totalPrice
				if (price == 0) {
					uni.showToast({
						icon: 'error',
						title: "请先选择商品"
					})
				} else {
					uni.navigateTo({
						url: '/pages/myinfo/order/confirm'
					})
				}
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/shop/product_detail?id=' + id
				});
			},
			toShop(id){
				uni.navigateTo({
					url: '/pages/shop/shop_detail?id=' + id
				});
			},
		},
		computed: {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;
	}

	.shopCart {
		margin-top: 120rpx;
	}

	.shop {
		margin-left: 10rpx;
	}

	.carts {
		line-height: 60rpx;
		background-color: #FFFFFF;
		

		&-detail {

			display: flex;
			padding: 20rpx 15rpx 20rpx 10rpx;
			background-color: lightblue;
			justify-content: space-between;
			border-bottom: 5rpx solid #F1F1F1;
			align-items: center;

			.detail-left {
				display: flex;
				border-radius: 11px;

				.goods-left {
					display: flex;
					align-items: center;
				}
			}

			.size {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				margin-left: 30rpx;

				.goods-price {
					font-size: 25rpx;
					color: #F44545;

				}
			}

			.detail-right {
				text {
					width: 50rpx;
					line-height: 45rpx;
					text-align: center;
					display: inline-block;
					background-color: #F7F7F7;
					margin-right: 10rpx;
					margin-top: 50px;
					
				}

				.add {
					border-radius: 10rpx 30rpx 30rpx 10rpx;
				}

				.subtract {
					border-radius: 30rpx 10rpx 10rpx 30rpx;
				}
			}
		}
	}

	.del {
		// display: flex;
		// margin-left: 100px;
		// margin-top: 10px;
		// background-color: red;
		// color: #FFFFFF;
		// border-radius: 11px;
		// padding: 0 7px;
			display: flex; 
		    position: relative;
		    bottom: 40px;
		    left: 100px;
		    z-index: 100;
		    margin-left: 100px;
		    margin-top: 10px;
		    background-color: red;
		    color: #FFFFFF;
		    border-radius: 11px;
		    padding: 0 7px;
	}

	.empty {

		position: relative;
		top: 220rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;

		&-text {
			color: #808080;
			margin-bottom: 50rpx;
		}

		&-button {
			width: 300rpx;
			height: 90rpx;
			color: orange;
			border: 1rpx solid orange;
			text-align: center;
			line-height: 90rpx;
			border-radius: 48rpx;
		}
	}

	.end {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		display: flex;
		align-items: center;

		&-left {
			width: 70%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;

			.end-flex {
				display: flex;
				align-items: center;
			}
		}

		&-right {
			width: 30%;
			line-height: 90rpx;
			background-color: #F44545;
			text-align: center;
			color: #fff;
		}
	}
</style>