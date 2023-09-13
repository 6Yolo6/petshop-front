<template>
	<view>
		<view class="header">
			<u-search :clearabled="true" shape="round" :value="inp_value" :placeholder="tip" class="search"
				bgColor="linear-gradient(to right, #70e1f5, #ffd194)" @focus="handleFocus"
				:showAction="false"></u-search>
			<uni-icons type="location" size="30" class="location" @click="toLocation"></uni-icons>
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper :list="list1" previousMargin="30" nextMargin="30" circular radius="5"
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
		<scroll-view scroll-y="true" class="scrolly" show-scrollbar="true" @scrolltolower="scrolltolower">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" v-for="(item, index) in pet_list" :index="index" :key="index">
					<view class="demo-uni-col dark">
						<uni-card :title="item.name" :sub-title="item.breed" :extra="item.price+'￥'" padding="10rpx"
							class="card" is-shadow shadow="0 0 5px rgba(0, 0, 0, 0.3)" @click="toDetail(item.id)"
							is-full>
							<view>
								<u--image :src="item.img" mode="aspectFit" width="100%" height="160rpx" radius="10">
								</u--image>
							</view>
							<u--text :lines="2" :text="item.description"></u--text>
						</uni-card>
					</view>
				</uni-col>
			</uni-row>
		</scroll-view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getByCate
	} from '@/api/modules/pet.js'
	import {
		getAllCate
	} from '@/api/modules/pet_category.js'
	export default {
		components: {},
		data() {
			return {
				total: 0,
				pageNum: 1,
				pageSize: 6,
				category_list: [],
				inp_value: "",
				tip: "请输入关键字",
				pet_list: [],
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
			};
		},
		mounted() {
			this.getAllCate()
			this.getAllPet()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/pet_details?id=' + id
				});
			},
			scrolltolower() {
				this.pageNum++
				if (this.pet_list.length < this.total) {
					this.getAllPet()
				} else {
					this.$refs.uToast.show({
						message: '你已经划到底了'
					})
				}

			},
			getAllPet() {
				getByCate({
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					category: 0
				}).then(res => {
					this.pet_list.push(...res.data.data.records)
					this.total = res.data.data.total
				}).catch(err => {
					console.log(err)
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
			// 搜索框聚焦后跳转
			handleFocus() {
				uni.navigateTo({
					url: '/pages/index/search'
				});
			},
			// 点击轮播图(待定)
			clickSwiper() {
				console.log("click")
			},
			// 点击类别
			clickCategory(index) {
				console.log(index)
				uni.navigateTo({
					url: '/pages/index/pet_category?index=' + (index + 1)
				});
			},
			// 获取全部类别
			getAllCate() {
				getAllCate().then((res) => {
					this.category_list = res.data.data
				}).catch((err) => {
					console.log('错误')
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-select input-text {
		width: 20px;
	}

	.scrolly {
		height: 1000rpx;
	}


	.card {
		height: 400rpx;
		border-radius: 15%;
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