<template>
	<view>
		<view class="header">
			<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip" class="search"
				bgColor="linear-gradient(to right, #70e1f5, #ffd194)"></u-search>
			<uni-icons type="location" size="30" class="location"></uni-icons>
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper :list="list1" @click="swiperClick" previousMargin="30" nextMargin="30" circular radius="5"
				bgColor="#ffffff"></u-swiper>
		</view>
		<!-- 类别显示 -->
		<u-scroll-list>
			<view v-for="(item, index) in category_list" :key="index" class="categories">
				<image :src="item.img" class="category" @click="clickCategory(index)"></image>
				<h3 class="category-name">{{item.name}}</h3>
			</view>
		</u-scroll-list>
		<!-- 主页宠物推荐 -->
		<uni-row class="demo-uni-row">
			<uni-col :span="12" v-for="(item, index) in 4" :index="index" :key="index">
				<view class="demo-uni-col dark">
					<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0">
						<image style="width: 100%;" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
						<text
							class="uni-body uni-mt-5">卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。</text>
					</uni-card>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import { getAllCate } from '@/api/modeules/pet_category.js'
	export default {
		components: {},
		data() {
			return {
				category_list: [],
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
		mounted() {
			// getAllCate()
			getAllCate().then((res) => {
				// console.log(res)
				this.category_list = res.data.data
				console.log(this.category_list)
				console.log(this.category_list[1].name)
			}).catch((err) => {
				console.log('错误')
			})
		},
		methods: {
			clickSwiper() {
				console.log("click")
			},
			clickCategory(index) {
				console.log(index)
			},
			getAllCate() {
				getAllCate().then((res) => {
					// console.log(res)
					this.category_list = res.data.data
					console.log(this.category_list)
					console.log(this.category_list[1].name)
				}).catch((err) => {
					console.log('错误')
				})
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

	.swiper {
		margin-top: 32px;
		margin-bottom: 15px;
	}

	.categories {
		height: 100%;
		min-width: 20%;
	}

	uni-image {
		max-height: 80px;
	}

	.category-name {
		text-align: center;
	}

	.category {
		border-radius: 50%;
		width: 100%;
	}

	.search {
		width: 90%;
	}

	.location {
		border-radius: 50%;
		// border-style: solid;
	}
</style>