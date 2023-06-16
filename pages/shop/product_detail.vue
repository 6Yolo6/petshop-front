<template>
	<view>
		<view class="head">
			<u-navbar :title="product.name" :autoBack="true"></u-navbar>
		</view>
		<view class="detail">
			<view class="top">
				<view class="image">
					<img class="img" :src="product.img" alt="">
				</view>
				<view class="favor">
					<uni-fav :checked="product.etc.isFavor" class="favBtn" :circle="true" bg-color="#dd524d"
						bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff"
						@click="favor(product.id)" />
				</view>
			</view>
			<view class="content">
				<uni-card :title="product.name" :sub-title="product.etc.shopName" :extra="product.etc.cateName"
					:thumbnail="product.price">
					<text class="uni-body">{{product.description}}</text>
				</uni-card>
			</view>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		getById
	} from '@/api/modules/product.js'
	import {
		add
	} from '@/api/modules/cart.js'
	export default {
		data() {
			return {
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}, {
					icon: 'cart',
					text: '收藏',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				product: {},


			}
		},
		mounted() {
			this.getById(Number(this.$route.query.id))
		},
		methods: {
			// 根据id获取周边详情
			getById(id) {
				getById({
					id: id
				}).then(res => {
					console.log(res.data)
					this.product = res.data.data
				}).catch(error => {
					console.log(error)
				})
			},
			// 收藏
			favor(id) {
				console.log("product_id", id)
				this.etc.isFavor = !this.etc.isFavor
				this.$forceUpdate()
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				// console.log(e)
				if (e.content.text == "加入购物车")
					this.options[2].info++
				else
					this.options[3].info++
			}
		}
	}
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

	.detail {
		margin-top: 70rpx;

		.top {
			height: 200px;
			text-align: center;
			margin: 20rpx;

			.image {
				.img {
					height: 180px;
					width: 180px;
				}
			}

			.favor {
				float: right;
				position: relative;
				bottom: 20px;
			}
		}

	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>