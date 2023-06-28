<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar shadow left-icon="left" :title="pet_detail.name" @clickLeft="back" :border="false" />
		</view>、
		<view class="img">
			<image :src="pet_detail.img" mode="heightFix"></image>
		</view>
		<uni-card :title="pet_detail.breed" :isFull="true" :sub-title="pet_detail.health" :extra="pet_detail.price+'￥'">
			<view slot="actions" class="info">
				<uni-tag :text="'年龄:'+pet_detail.age" type="primary" class="tag"></uni-tag>
			</view>
		</uni-card>
		<view class="describle">
			<uni-title type="h2" title="描述" align="center"></uni-title>
			<u--text type="info" :text="pet_detail.description"></u--text>
		</view>
		<view class="video">
			<video :src="pet_detail.etc.video.videoUrl" object-fit="fill" style="width: 100vw;"></video>
		</view>
		<view class="goods-nav">
			<uni-goods-nav @click="onClick" :options="options" :button-group="customButtonGroup"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		getById
	} from '@/api/modules/pet.js'
	import {
		addFavor,
		deleteById,
		findByPetId
	} from '@/api/modules/favor.js'
	import {
		validate
	} from '../../api/modules/user';
	export default {
		data() {
			return {
				favorId: 0,
				pet_detail: {
					id: 0,
					breed: "",
					birthday: "",
					age: "",
					health: "",
					name: "",
					price: 0,
					shop_id: 0,
					videoId: 0,
					description: "",
					etc: {},
				},
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'star',
					text: '收藏',
				}],
				customButtonGroup: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
					color: '#fff'
				}],
			}
		},
		onLoad(option) {
			let id = option.id
			// 获取宠物信息
			this.getDetail(id)

		},
		mounted() {
			// 获取启动参数
			const launchOptions = uni.getLaunchOptionsSync()

			console.log(launchOptions)

			// console.log(id)
		},
		methods: {
			// 添加收藏
			addFavor() {
				addFavor({
					favorId: this.pet_detail.id,
					isPet: true,
				}).then(res => {
					// 图标变化
					this.options[1].icon = 'star-filled'
					// 更新收藏id
					this.favorId = res.data.data
					console.log(res)
				}).catch(err => {

				})
			},
			// 是否收藏
			isFavor() {
				// console.log(this.pet_detail)
				findByPetId({
					favorId: this.pet_detail.id,
					isPet: true
				}).then(res => {
					if (res.data.message == "已收藏") {
						// 图标变化
						this.options[1].icon = 'star-filled'
						// 获取收藏id
						this.favorId = res.data.data
					}
				}).catch(err => {

				})
			},
			// 点击商品导航栏左侧
			onClick(e) {
				validate().then(res => {
					if (res.data.statusCode == "200") {
						if (e.content.text == '收藏') {
							this.changeFavor()
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
			// 取消收藏
			deleteFavor() {
				console.log(this.favorId)
				deleteById({
					id: this.favorId
				}).then(res => {
					this.options[1].icon = 'star'
					console.log(res)
				}).catch(err => {

				})
			},
			changeFavor() {
				// 未收藏
				if (this.options[1].icon == 'star') {
					this.addFavor()
				} else {
					console.log('删除')
					this.deleteFavor()
				}

			},
			// 获取宠物信息
			getDetail(id) {
				getById({
					id: id
				}).then(res => {
					this.pet_detail = res.data.data
					console.log(this.pet_detail)
					// 判断是否收藏
					this.isFavor()
				}).catch(err => {
					console.log(err)
				})
			},
			back() {
				// 返回上一个页面
				uni.navigateBack({
					delta: 1, // 返回的层数，1表示返回上一个页面
				});
			},
			buttonClick(e) {
				validate().then(res => {
					if (res.statusCode == "200") {
						if (e.content.text == "立即购买") {
							uni.navigateTo({
								url: '/pages/myinfo/order/confirm?id=' + this.pet_detail.id
							})
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
		},
	}
</script>

<style scoped>
	.describle {
		margin-left: 33px;
	}

	.img {
		margin: 0 auto;
		text-align: center;
	}

	.tag {
		margin-right: 20rpx;
	}

	.info {
		position: absolute;
		top: 30rpx;
		left: 200rpx;
	}

	.video {
		margin-top: 200rpx;
	}

	.goods-nav {
		/* 固定在页面底部 */
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.describle {
		/* 居中 */
		margin: auto;

		width: 90%;
	}
</style>