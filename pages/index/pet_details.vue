<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar shadow left-icon="left" title="宠物名" @clickLeft="back" :border="false" />
		</view>、
		<u-swiper :list="list1"></u-swiper>
		<uni-card :title="pet_detail.breed" :isFull="true" :sub-title="pet_detail.name" :extra="pet_detail.price+'￥'">
		</uni-card>
		<view class="describle">
			<text>{{pet_detail.description}}</text>
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
		addFavor
	} from '@/api/modules/favor.js'
	export default {
		data() {
			return {
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
					icon: 'cart',
					text: '购物车',
					info: 2
				}, {
					icon: 'star',
					text: '收藏',
					info: 2
				}],
				customButtonGroup: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
					color: '#fff'
				}],
			}
		},
		mounted() {
			let id = this.$route.query.id
			this.getByDetail(id)
			console.log(id)
		},
		methods: {
			handleLongTap() {
				console.log('长安')
			},
			onClick(e) {
				if (e.content.text == '收藏') {
					this.changeFavor()
				}
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			changeFavor() {
				if (this.options[2].icon == 'star') {
					addFavor({
						favorId: this.pet_detail.id,
						isPet: true,
					}).then(res => {
						this.options[2].icon = 'star-filled'
						console.log(res)
					}).catch(err => {

					})
				}

			},
			// 获取宠物详情
			getByDetail(id) {
				getById({ id: id }).then(res => {
					this.pet_detail = res.data.data
					console.log(res.data.data)
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
				if (e.content.text == "立即购买") {
					uni.navigateTo({
						url: '/pages/order/confirm?id=' + this.pet_detail.id
					})
				}
			}
		},
	}
</script>

<style scoped>
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