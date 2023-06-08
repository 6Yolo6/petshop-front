<template>
	<view>
		<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip"></u-search>
		<u-swiper :list="list1" @click="swiperClick" previousMargin="30" nextMargin="30" circular radius="5"
			bgColor="#ffffff"></u-swiper>
		<u-scroll-list>
			<view v-for="(item, index) in list" :key="index" class="categories">
				<image :src="item.thumb" class="category" @click="clickCategory(index)"></image>
				<h3 class="category-name">{{index}}</h3>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				inp_value: "",
				tip: "请输入关键字",
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				list: [{
					thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/2.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/3.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/4.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/5.jpg"
				}]
			};
		},
		methods: {
			clickSwiper() {
				console.log("click")
			},
			clickCategory(index) {
				console.log(index)
			}
		}
	}
</script>

<style lang="scss">
	.categories {
		// display: flex;
		min-height: 100%;
		min-width: 25%;
	}

	uni-image {
		max-height: 150px;
	}


	.category-name {
		text-align: center;
	}

	.category {
		border-radius: 50%;
		// margin-right: 10px;
		// padding-left: 10px;
		width: 100%;
		// margin-left: 10px;
		// flex: 0 0 50%;
		// width: 80%;
		// width: auto;
		// height: auto;

	}
</style>