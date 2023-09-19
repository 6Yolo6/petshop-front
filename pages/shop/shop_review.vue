<template>
	<view>
		<view class="header">
			<u-navbar title="评价" @rightClick="rightClick" :autoBack="true">
			</u-navbar>
		</view>
		<view class="shop">
			<u-cell-group>
				<u-cell value="内容">
					<view slot="title" class="u-slot-title">
						<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="80px"
							height="80px" shape="square" radius="5" class="shop-info"></u--image>
						<text class="shop-info" style="position: absolute;top: 40%;left: 30%;">{{shopName}}</text>

					</view>
					<view slot="value">
						<text class="shop-name">{{reviewType}}评分:{{shopRate}}</text>
						<u-rate count="5" v-model="shopRate" :allowHalf="true" :readonly="true"></u-rate>
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<u-line dashed length="90%" margin="20rpx 20rpx 20rpx 20rpx" color="red"></u-line>
		<u-toast ref="uToast"></u-toast>
		<view v-if="isEmpty" class="empty">
			评价空空如也
		</view>
		<view v-else class="review">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in reviewList" :key="index" height="60px">
					<u-cell>
						<view slot="title">
							<u--text type="info" :text="item.etc.username" class="commentator-info"></u--text>
							<u--text type="success" :text="'（已购）'+item.etc.productName+'×'+item.etc.count"
								class="commentator-info"
								@click="toProduct({productId:item.orderItemId,isPet:item.isPet})"></u--text>
							<u--text :lines="2" :text="item.comment" class="commentator-info"></u--text>
						</view>
						<u-avatar slot="icon" shape="square" size="50" :src="item.etc.avatar"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						<view slot="value">
							<u-rate count="5" :value="item.rate" :allowHalf="true" :readonly="true"></u-rate>
							<u--text v-if="item.isMe" type="warning" text="删除" style="position: absolute;left: 85%;"
								@click="deleteReview(item.id)"></u--text>
						</view>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		getByShopId
	} from '@/api/modules/review.js'
	import {
		getById
	} from '@/api/modules/shop.js'
	import {
		getId
	} from '@/api/modules/user.js'
	import {
		checkStock
	} from '@/api/modules/product.js'
	export default {
		data() {
			return {
				reviewType: '店铺',
				isEmpty: true,
				shopRate: 0,
				value: 2.0,
				reviewList: [],
				shopName: '',
				productId: 0,
			}
		},
		onLoad(event) {
			if (event.shopId) {
				if (event.id) {
					this.productId = event.id
					this.reviewType = "商品"
				}
				this.getShop(event.shopId)
				this.getReview(event.shopId)

			}
		},
		methods: {
			//跳转到商品详情
			toProduct(params) {
				console.log("product", params.productId)
				if (params.isPet == 1) {
					// uni.navigateTo({
					// 	url: '/pages/index/pet_details?id=' + params.productId
					// })
					this.$refs.uToast.show({
						type: 'error',
						title: '失败主题',
						message: "商品消失了",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				} else {
					checkStock({ productId: params.productId }).then(res => {
						console.log(res.data.message)
						if (res.data.message == "库存充足") {
							uni.navigateTo({
								url: '/pages/shop/product_detail?id=' + params.productId
							})
						} else {
							this.$refs.uToast.show({
								type: 'error',
								title: '失败主题',
								message: "商品消失了",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
							})
						}
					})
				}
			},
			//获取商店评论
			getReview(shopId) {
				getByShopId({ shopId: shopId, productId: this.productId }).then(res => {
					this.reviewList = res.data.data
					let myId = 0
					getId().then(res => {
						myId = res.data.data
						if (this.reviewList.length > 0) {
							this.isEmpty = false
							let sum = 0
							for (let i in this.reviewList) {
								// 自己的评论可以删除
								if (myId == this.reviewList[i].userId) {
									this.reviewList[i].isMe = true
								} else {
									this.reviewList[i].isMe = false
								}
								sum += this.reviewList[i].rate
							}
							//保留一位小数
							this.shopRate = (sum / this.reviewList.length).toFixed(1)
						}
						console.log("reviewList", this.reviewList)
					})
				})
			},
			//获取商店信息
			getShop(id) {
				getById({ id: id }).then(res => {
					this.shopName = res.data.data.name
					// console.log()

				}).catch(err => {
					console.log(err)
				})
			},
			//删除评论
			deleteReview() {

			},
		}
	}
</script>

<style scoped>
	.shop-info {
		display: inline-block;
		width: 50%;
		/* 使两个元素平分容器的宽度 */
		/* text-align: center; */
		justify-content: space-between;
		/* 文字居中 */
		align-items: center;
	}

	.header {
		position: flex;
		top: 88px;
	}

	.shop {
		margin-top: 88rpx;
	}

	.shop-name {
		margin-right: 40rpx;
	}

	.commentator-info {
		display: block;
	}

	.empty {
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

	}

	.review {}
</style>