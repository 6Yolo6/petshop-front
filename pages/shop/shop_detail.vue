<template>
	<view>
		<view class="head">
			<u-navbar title="商店分类" :autoBack="true" bgColor="lightyellow">
			</u-navbar>
		</view>
		<view class="tabs">
			<u-tabs :list="categoryList" @click="changeCate" :current="category+1" activeColor="#0000ff"></u-tabs>
		</view>
	          <view class="introduce" @click="toShop(firstElement.shopId)" >
					<uni-icons type="arrowup" color="#ff0000" :size="50" @click="test" />{{ firstElement.etc.shopName}}是一家评分超级高的商店，尝试去线下康康吧
		      </view>

		<view class="content">
			<view>
				<scroll-view scroll-y="true" class="scrolzly" show-scrollbar="true" @scrolltolower="scrolltolower">
					<view class="" v-for="(item, index) in productList">
						<uni-card :title="item.name" :sub-title="item.etc.shopName" :extra="item.etc.cateName"
							:thumbnail="item.img" @click="toDetail(item.id)">
						</uni-card>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getList
	} from '@/api/modules/shop.js'
	import {
		getByShop
	} from '@/api/modules/product.js'
	export default {
		data() {
			return {
				category: -1,
				shopList:[],
				categoryList: [{
					name: '商家'
				}],
				productList: [],
				pageNum: 1,
				finish: false
			}
		},
		mounted() {
			// url中获取商店id
			this.category = Number(this.$route.query.id)
			//console.log("category:", this.$route.query)
			// console.log(typeof(Number(this.category)))
			// console.log(typeof(this.category))
			// 获取全部商家
			this.getList()
			// 根据id获取该商家下的所有周边
			// this.getByCategory()
			this.getByShop(this.category)

		},
		computed: {
		    firstElement() {
		      return this.productList[0]; // 获取数组的第一个元素
		    },
		  },
		methods: {
			//获取全部商家
			getList() {
				getList().then(res => {
				 //console.log("全部商家", res.data)
					let list = res.data.data
					this.shopList.push(...res.data.data);
					console.log("全部商家", this.shopList)
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
				if (this.productList.length < this.productList.total) {
					this.pageNum += 1
					this.getByShop(this.category)
				}
			},
			// 根据id查询周边
			getByShop(id) {
				console.log("pageNum", this.pageNum)
				getByShop({
					pageNum: this.pageNum,
					pageSize: 8,
					category: id
				}).then(res => {
					console.log("商家", res.data)
					this.productList.push(...res.data.data.records)
					this.total = res.data.data.total
					// console.log("周边", this.productList)
				}).catch(error => {
					console.log(error)
				})
			},
			// 选择不同类别标签
			changeCate(index) {
				this.category = index.index-1
				console.log("category", index)
				this.productList = []
				this.pageNum = 1
				this.getByShop(index.index-1)
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/shop/product_detail?id=' + id
				});
			},
			toShop(id){
				uni.navigateTo({
					url: '/pages/index/map?id=' + id
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

.introduce{
	font-family:"楷体";
	font-weight:bold;
	display: flex;
	line-height: 48upx;
	align-items: center;
	font-style: italic;
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