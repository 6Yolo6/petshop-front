<template>
	<view>
		<view class="header">
			<u-navbar title="购物车" :autoBack="true">
			</u-navbar>
		</view>
		<view>
			<view class="shopCart" v-for="(shop, indexS) in carts" :key="indexS">
				<view class="shop">
					<view class="">
						{{shop.shopName}}
					</view>
				</view>
				<view class="carts-detail" v-for="(product,indexP) in shop.products" :key="indexP">
					<view class="detail-left">
						<view class="goods-left">
							<checkbox-group @change="selected(product)">
								<label>
									<checkbox class="selected" color="#555555" :checked="product.checked" />
									<text></text>
								</label>
							</checkbox-group>
							<image :src="product.productImg" style="width: 150rpx;height: 140rpx;"></image>
						</view>
						<view class="size">
							<text style="font-size: 25rpx;">商品名：{{product.productName}}</text>
							<!-- <text style="font-size: 25rpx;">商店名：{{product.shopName}}</text> -->
							<text class="goods-price">￥{{product.productPrice}}/件</text>
							<text class="del" @click="del(product,indexP)">删除</text>
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
			<view class="end-right">
				结算({{totalNum}})
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: 4,
				allchecked: false,
				carts: [],
			}
		},
		onLoad: function() {
			this.allchecked = this.Allchecked()
			uni.request({
				url: 'http://localhost:8899/petshop/cart/getAll?' + 'userId=' + this.userId,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.carts = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			selected(product) {
				product.checked = !product.checked
				uni.request({
					url: 'http://localhost:8899/petshop/cart/update',
					method: 'POST',
					data: {
						"id": product.id,
						"userId": product.userId,
						"checked": product.checked
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
				if (product.checked == false) {
					this.allchecked = false

				} else {
					this.allchecked = this.Allchecked()
				}
			},
			selectcarts() {
				this.allchecked = !this.allchecked
				if (this.allchecked) {
					this.carts.map(shopCart => {
						let products = shopCart.products;
						products.map(product => {
							product.checked = true;
							uni.request({
								url: 'http://localhost:8899/petshop/cart/update',
								method: 'POST',
								data: {
									"id": product.id,
									"userId": product.userId,
									"checked": product.checked
								},
								success: res => {
									console.log(res);
									this.carts = res.data.data;
								},
								fail: () => {},
								complete: () => {}
							});
						});
					});
				} else {
					this.checked = false;
					this.carts.map(shopCart => {
						let products = shopCart.products;
						products.map(product => {
							product.checked = false;
							uni.request({
								url: 'http://localhost:8899/petshop/cart/update',
								method: 'POST',
								data: {
									"id": product.id,
									"userId": product.userId,
									"checked": product.checked
								},
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						});
					});
				}
			},
			del(product, index) {
				this.carts.splice(index, 1)
				uni.request({
					url: 'http://localhost:8899/petshop/cart/delete?' + 'id=' + product.id,
					method: 'POST',
					data: {},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			reduce(product) {
				let count = product.count
				if (count > 1) {
					count -= 1
				} else if (count = 1) {
					uni.showToast({
						title: "该宝贝不能减少了哟~"
					})
				}
				product.count = count
				uni.request({
					url: 'http://localhost:8899/petshop/cart/update',
					method: 'POST',
					data: {
						"id": product.id,
						"userId": product.userId,
						"count": product.count
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			Allchecked() {
				const a = this.carts.forEach((product) => {
					if (product.checked == false) {
						return false;
					}
					return true;
				})
			},
			add(product) {
				let count = product.count
				product.count = count + 1
				uni.request({
					url: 'http://localhost:8899/petshop/cart/update',
					method: 'POST',
					data: {
						"id": product.id,
						"userId": product.userId,
						"count": product.count
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		computed: {
			totalNum() {
				let totalNum = 0;
				this.carts.map(product => {
					product.checked ? totalNum += product.count : totalNum += 0
				})
				return totalNum
			},

			totalPrice() {
				let totalPrice = 0;
				this.carts.map(product => {
					product.checked ? totalPrice += product.count * product.productPrice : totalPrice += 0
				})
				return totalPrice
			}
		}
	}
</script>

<style lang="scss">
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
		margin-top: 90rpx;
	}

	.shop {
		margin-left: 30rpx;
	}

	.carts {
		line-height: 80rpx;
		background-color: #FFFFFF;

		&-detail {

			display: flex;
			padding: 30rpx 15rpx 30rpx 30rpx;
			background-color: #efffff;
			justify-content: space-between;
			border-bottom: 5rpx solid #F1F1F1;
			align-items: center;

			.detail-left {
				display: flex;

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
					line-height: 50rpx;
					text-align: center;
					display: inline-block;
					background-color: #F7F7F7;
					margin-right: 10rpx;
				}

				.add {
					color: #FA4305;
					border-radius: 10rpx 30rpx 30rpx 10rpx;
					margin-right: 20rpx;
				}

				.subtract {
					border-radius: 30rpx 10rpx 10rpx 30rpx;
				}
			}
		}
	}

	.del {
		margin-left: 100px;
		background-color: red;
		color: #FFFFFF;
		border-radius: 3px;
		padding: 0 5px;
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