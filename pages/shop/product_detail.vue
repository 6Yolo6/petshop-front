<template>
	<view>
		<view class="head">
			<u-navbar :title="product.name" :autoBack="true"></u-navbar>
		</view>
		<view class="detail">
			<view class="top">
				<view class="image">
					<img class="img" :src="product.img" mode="basic" alt="">
				</view>
				<view class="favor">
					<uni-fav :checked="isFavor" class="favBtn" :circle="true" bg-color="#dd524d"
						bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff"
						@click="favor(product.id)" />
				</view>
			</view>
			<view class="content">
				<uni-card :title="product.name" :sub-title="product.etc.shopName" :extra="product.etc.cateName"
					:thumbnail="toString(product.price)">
					<view slot="actions" class="info">
						<uni-tag :text="'库存:'+product.stock" type="primary" class="tag"></uni-tag>
					</view>
				</uni-card>
			</view>
			<view class="describle">
				<uni-title type="h2" title="描述" align="center"></uni-title>
				<u--text type="info" :text="product.description"></u--text>
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
	import {
		validate
	} from '../../api/modules/user';
	import { addFavor, findByPetId, deleteById } from '@/api/modules/favor.js'
	export default {
		data() {
			return {
				favorId: 0,
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: this.totalProductNum
				}, {
					icon: 'cart',
					text: '收藏',
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
				userId: 4,
				totalProductNum: 0,
				isFavor: false

			}
		},
		mounted() {
			this.getById(Number(this.$route.query.id))
		},
		computed: {
			// totalProductNum() {
			// 	let total = this.carts.reduce((total, shopCart) =>
			// 		total + shopCart.productNum, 0);
			// 	this.totalProductNum = total
			// 	return total
			// }
		},
		methods: {
			// 根据id获取周边详情
			getById(id) {
				getById({
					id: id
				}).then(res => {
					this.product = res.data.data
					this.judgeFavor(this.product.id)
					console.log(res.data.data)
				}).catch(error => {
					console.log(error)
				})
			},
			// 判断是否收藏
			judgeFavor(id) {
				findByPetId({
					favorId: id,
					isPet: false
				}).then(res => {
					if (res.data.message == "已收藏") {
						this.isFavor = true
						this.favorId = res.data.data
						// console.log(this.favorId)
					}
				}).catch(err => {

				})
			},
			// 点击收藏
			favor(id) {
				validate().then(res => {
					if (res.data.statusCode == "200") {
						// 如果已收藏
						if (this.isFavor) {
							deleteById({ id: this.favorId }).then(res => {
								this.isFavor = false
								this.favorId = res.data.data
								console.log(res)
							}).catch(err => {

							})
						} else {
							addFavor({ favorId: id, isPet: false }).then(res => {
								console.log(res)
								this.isFavor = true
								this.favorId = res.data.data
							}).catch(err => {

							})
						}
						this.$forceUpdate()
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
			// 点击左下角商品导航
			onClick(e) {
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// })
				validate().then(res => {
					if (res.data.statusCode == "200") {
						if (e.content.text == "购物车") {
							uni.switchTab({
								url: '/pages/cart/cart'
							})
						} else if (e.content.text == "收藏") {
							uni.navigateTo({
								url: '/pages/myinfo/favor/favor'
							});
						}
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
			// 加入购物车
			buttonClick(e) {
				// console.log(e)
				validate().then(res => {
					if (res.data.statusCode == "200") {
						if (e.content.text == "加入购物车") {
							add({
								// userId: this.userId,
								// count: 1,
								productId: this.product.id
							}).then(res => {
								console.log(res.data)
								uni.showToast({
									title: '加购成功'
								})
								this.totalProductNum = this.carts.reduce((total, shopCart) =>
									total + shopCart.productNum, 0);
								this.$store.commit('updateTotalProductNum', this.totalProductNum);
								this.$forceUpdate()
							}).catch(error => {
								console.log(error)
							})
						} else {
							this.options[2].info++
						}
					} else {
						uni.showToast({
							icon: 'error',
							title: "请先登录"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		position: absolute;
		bottom: 40rpx;
		right: 10rpx;
	}

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