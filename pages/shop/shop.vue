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
			<scroll-view scroll-y="true" class="scrolly" show-scrollbar="true" @scrolltolower="scrolltolower">
				<uni-row class="demo-uni-row">
					<uni-col :span="12" v-for="(item, index) in productList" :index="index" :key="index">
						<view class="demo-uni-col dark">
							<uni-card :isShadow="true" :title="item.name" :sub-title="item.etc.shopName" mode="basic"
								:extra="item.price.toString()" @click="toDetail(item.id)" is-full
								shadow="0 0 5px rgba(0, 0, 0, 0.3)">
								<view>
									<view>
										<u--image :src="item.img" mode="aspectFit" width="100%" height="160rpx"
											radius="10">
										</u--image>
									</view>
									<view class="content-box">
										<u--text style="font-size: 10rpx;" :lines="2" :text="item.description">
										</u--text>
										<!-- <text style="font-size: 12rpx;">{{  }}</text> -->
									</view>
								</view>
							</uni-card>
						</view>
					</uni-col>
				</uni-row>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getAllCate
	} from '@/api/modules/product_category.js'
	import {
		getByCategory
	} from '@/api/modules/product.js'

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
				categoryList: [],
				productList: [],
				inp_value: "",
				tip: '请输入关键词',
				pageNum: 1,

			}
		},
		mounted() {
			this.getAllCate()
			this.getByCategory()
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
			// 点击位置
			toLocation() {
				console.log('导航')
				uni.navigateTo({
					url: '/pages/index/map'
				});
				// this.$u.toast('暂未开放')
			},
			//跳转到周边分类页
			toCategory(index) {
				console.log(index)
				uni.navigateTo({
					url: '/pages/shop/product_category?index=' + (index + 1)
				});
			},
			// 搜索框聚焦后跳转
			handleFocus() {
				uni.navigateTo({
					url: '/pages/index/search'
				});
			},
			scrolltolower() {
				console.log("到底部")
				if (this.productList.length < this.total) {
					this.pageNum += 1
					this.getByCategory()
				}
			},
			getByCategory() {
				getByCategory({
					pageNum: this.pageNum,
					pageSize: 6,
					category: 0
				}).then(res => {
					console.log("周边", res.data)
					this.productList.push(...res.data.data.records)
					this.total = res.data.data.total
					console.log("全部周边", this.productList)
				}).catch(error => {
					console.log(error)
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/shop/product_detail?id=' + id
				});
			}
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
		.scrolly {
			height: 1000rpx;
		}

		.card {




			uni-image {
				width: 120px;
			}


		}
	}
</style>