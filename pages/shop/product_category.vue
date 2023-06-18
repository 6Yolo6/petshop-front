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
			<view class="" v-for="(item, index) in productList">
				<uni-card :title="item.name" :sub-title="item.etc.shopName" :extra="item.etc.cateName"
					:thumbnail="item.img" @click="toDetail(item.id)">
					<text class="uni-body">这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
				</uni-card>
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
				categoryList: [],
				productList: [],

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
			this.getByCategory(this.category + 1)

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
			// 根据id查询周边
			getByCategory(id) {
				getByCategory({
					pageNum: 1,
					pageSize: 10,
					category: id
				}).then(res => {
					// console.log("周边", res.data)
					this.productList = res.data.data.records
					console.log("周边", this.productList)
				}).catch(error => {
					console.log(error)
				})
			},
			// 选择不同类别标签
			changeCate(index) {
				this.category = index.index
				console.log("category", index)
				this.getByCategory(index.index + 1)
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