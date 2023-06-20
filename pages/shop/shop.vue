<template>
	<view>
		<view class="header">
			<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip" class="search"
				bgColor="linear-gradient(to right, #70e1f5, #ffd194)" @focus="handleFocus"
				:showAction="false"></u-search>
			<uni-icons type="location" size="30" class="location" @click="toLocation"></uni-icons>
		</view>
		<view class="swiper">
			<u-swiper :list="swapperList" @click="swiperClick" previousMargin="30" nextMargin="30" circular radius="5"
				bgColor="#ffffff"></u-swiper>
		</view>
		<view class="category">
			<u-scroll-list>
				<view class="scroll" v-for="(item, index) in categoryList" @click="toCategory(index)" :key="index">
					<image class="image" :src="item.img"></image>
					<text class="scroll_text">{{item.name}}</text>
				</view>
			</u-scroll-list>
		</view>
		<view class="content">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" v-for="(item, index) in 4" :index="index" :key="index">
					<view class="demo-uni-col dark">
						<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0"
							cover="https://cbu01.alicdn.com/img/ibank/2019/352/573/10885375253_109569990.jpg"
							class="card">
							<text class="uni-body uni-mt-5 ">
								卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。
							</text>
						</uni-card>
					</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import {
		getAllCate
	} from '@/api/modules/product_category.js'
	export default {
		components: {

		},
		data() {
			return {
				inp_value: '',
				tip: '请输入关键词',
				swapperList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				categoryList: []
			}
		},
		mounted() {
			this.getAllCate()
		},
		methods: {
			// 聚焦跳转到搜索页
			handleFocus() {
				uni.navigateTo({
					url: '/pages/index/search'
				});
			},
			//获取全部类别
			getAllCate() {
				getAllCate().then(res => {
					console.log(res.data)
					this.categoryList = res.data.data
				}).catch(error => {
					console.log(error)
				})
			},
			//跳转到周边分类页
			toCategory(index) {
				console.log(index)
				uni.navigateTo({
					url: '/pages/shop/product_category?index=' + (index + 1)
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		margin-top: 32px;
		margin-bottom: 15px;
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

	.category {

		.scroll {
			margin-left: 28rpx;
			margin-top: 15rpx;
			text-align: center;

			.image {
				height: 120rpx;
				width: 120rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.scroll_text {
				font-size: 12px;

			}
		}


	}

	.content {

		.card {

			uni-image {
				width: 120px;
			}

			text {
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
		}
	}
</style>