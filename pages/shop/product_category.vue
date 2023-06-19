<template>
	<view>
		<view class="head">
			<u-navbar title="周边分类" :autoBack="true">
			</u-navbar>
		</view>
		<view class="tabs">
			<u-tabs :list="categoryList" @click="changeCate" :current="category" activeColor="#0000ff"></u-tabs>
		</view>
		<view class="content">
			<view class="">
				<scroll-view scroll-y="true" class="scrolly" show-scrollbar="true" @scrolltolower="scrolltolower">
					<view class="" v-for="(item, index) in productList">
						<uni-card :title="item.name" :sub-title="item.etc.shopName" :extra="item.etc.cateName"
							:thumbnail="item.img" @click="toDetail(item.id)">
							<text class="uni-body">这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
						</uni-card>
					</view>
				</scroll-view>
			</view>
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
		data() {
			return {
				category: 0,
				categoryList: [{
					name: '全部'
				}],
				productList: [],
				pageNum: 1,
				finish: false
			}
		},
		mounted() {
			// url中获取类别id
			this.category = Number(this.$route.query.index)
			// console.log("category:", this.category)
			// console.log(typeof(Number(this.category)))
			// console.log(typeof(this.category))
			// 获取全部类别
			this.getAllCate()
			// 根据id获取该类别下的所有周边
			this.getByCategory(this.category)

		},
		methods: {
			//获取周边全部分类
			getAllCate() {
				getAllCate().then(res => {
					// console.log("全部分类", res.data)
					let list = res.data.data
					for (let i in list) {
						this.categoryList.push({
							name: list[i].name
						})
					}
					console.log("全部分类", this.categoryList)
				}).catch(error => {
					console.log(error)
				})
			},
			scrolltolower() {
				console.log("到底部")
				if (this.productList.length < this.total) {
					this.pageNum += 1
					this.getByCategory(this.category)
				}
			},
			// 根据id查询周边
			getByCategory(id) {
				console.log("pageNum", this.pageNum)
				getByCategory({
					pageNum: this.pageNum,
					pageSize: 8,
					category: id
				}).then(res => {
					console.log("周边", res.data)
					this.productList.push(...res.data.data.records)
					this.total = res.data.data.total
					// console.log("周边", this.productList)
				}).catch(error => {
					console.log(error)
				})
			},
			// 选择不同类别标签
			changeCate(index) {
				this.category = index.index
				console.log("category", index)
				this.productList = []
				this.pageNum = 1
				this.getByCategory(index.index)
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
	.tabs {
		margin-top: 80rpx;
		// top: 35px;
		// position: fixed;
		// z-index: 100;
	}



	.head {
		width: 100%;
		display: flex;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;

	}

	.content {
		// margin-top: 90px;

		.scrolly {
			height: 1500rpx;
		}

		.uni-card {
			.uni-card__header {
				.uni-card__header-avatar {
					width: 100px;
					height: 100px;
				}

				.uni-card__header-avatar-image {
					width: 100px;
					height: 100px;
				}
			}
		}
	}
</style>