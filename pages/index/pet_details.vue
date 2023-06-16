<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar shadow left-icon="left" title="宠物名" @clickLeft="back" :border="false" />
		</view>、
		<u-swiper :list="list1"></u-swiper>
		<uni-card title="宠物名" :isFull="true" sub-title="品类" extra="价格">
		</uni-card>
		<view class="describle">
			<text>这是一个通栏卡片 ，通栏没有外边距，左右会贴合父元素。</text>
		</view>
		<view class="goods-nav">
			<uni-goods-nav @click="onClick" :options="options" :button-group="customButtonGroup" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				}],
				customButtonGroup: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
					color: '#fff'
				}],
			}
		},
		methods: {
			back() {
				// 返回上一个页面
				uni.navigateBack({
					delta: 1, // 返回的层数，1表示返回上一个页面
				});
			}
		}
	}
</script>

<style>
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