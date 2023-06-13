<template>
	<view>
		<view class="header">
			<uni-data-select v-model="selected_value" @change="change"></uni-data-select>
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
					<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0"
						cover="https://cdn.uviewui.com/uview/swiper/swiper1.png" class="card">
						<text
							class="uni-body uni-mt-5 ">卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。</text>
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
				selected_value: '',
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
			this.getAllCate()
		},
		methods: {
			clickSwiper() {
				console.log("click")
			},
			clickCategory(index) {
				console.log(index)
				uni.navigateTo({
					url: '/pages/index/pet_category?index=' + index
				});
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

<style lang="scss" scoped>
	.uni-select input-text {
		width: 20px;
	}


	.header {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}


	// 文本省略
	text {
		/* 使用省略号来表示文本截断部分（适用于Opera浏览器） */
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 使用WebKit引擎的盒子布局模型 */
		display: -webkit-box;
		/* 设置显示的行数为3行 */
		-webkit-line-clamp: 3;
		/* 设置显示的行数为3行 */
		line-clamp: 3;
		/* 设置盒子内文本垂直排列 */
		-webkit-box-orient: vertical;
	}

	.swiper {
		margin-top: 32px;
		margin-bottom: 15px;
	}

	.categories {
		height: 100%;
		min-width: 20%;
		margin: 10px;
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