<template>
	<view class="cart">
		<view v-for="(shop, index) in carts" :key="index">
			<!-- 商店名称 -->
			<view class="shop-name">{{ shop.shopName }}</view>
			<!-- 商品列表 -->
			<view v-for="(product, pIndex) in shop.products" :key="pIndex" class="product-item">
				<image :src="product.productImg" class="product-img"></image>
				<view class="product-info">
					<view class="product-name">{{ product.productName }}</view>
					<view class="product-price">￥{{ product.productPrice.toFixed(2) }}</view>
					<view class="product-count">数量: {{ product.count }}</view>
					<view class="product-actions">
						<view class="action-btn" @click="decreaseProductCount(shop, product)">-</view>
						<view class="action-btn" @click="increaseProductCount(shop, product)">+</view>
					</view>
				</view>
			</view>
			<!-- 总的商品小计 -->
		</view>
		<view class="shop-total">总小计: {{ calculateTotal().toFixed(2) }}</view>
	</view>
</template>

<script>
	import {
		add,
		sub,
		getAll,
	} from '@/api/modules/cart.js'
	export default {
		data() {
			return {
				carts: [],
			}
		},
		mounted() {
			this.allchecked = this.Allchecked()
			this.getAll()
		},
		methods: {
			decreaseProductCount(shop, product) {
				if (product.count > 1) {
					product.count--;
				}
			},
			increaseProductCount(shop, product) {
				product.count++;
			},
			removeProduct(shop, product) {
				const index = shop.products.indexOf(product);
				if (index !== -1) {
					shop.products.splice(index, 1);
				}
			},
			calculateTotal() {
				return this.carts.reduce((total, shop) => {
					return total + this.calculateShopTotal(shop);
				}, 0);
			},
			calculateShopTotal(shop) {
				return shop.products.reduce((total, product) => {
					return total + product.productPrice * product.count;
				}, 0);
			}
		}
	};
</script>

<style>
	.cart {
		padding: 20rpx;
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

	.shop-total {
		font-size: 28rpx;
		font-weight: bold;
		margin-top: 20rpx;
		text-align: right;
	}
</style>