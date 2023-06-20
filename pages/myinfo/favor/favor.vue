<template>
	<view>
		<view class="header">
			<u-navbar title="我的收藏" :autoBack="true">
			</u-navbar>
		</view>

		<!-- 页面内容 -->
		<view class="content">
			<view class="card">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#007aff"></uni-segmented-control>
				<view>
					<view v-for="(item,index) in favorList" :key="index">
						<uni-card :title="item.favorName" :is-shadow="true" :sub-title="item.favorBreed"
							:extra="''+item.favorPrice+'￥'" @click="toDetail(item.favorId,item.isPet)" class="card-item"
							shadow="0 0 5px rgba(0, 0, 0, 0.3)">
							<view v-slot="actions">
								<uni-fav class="favBtn" :checked="item.checked" :circle="true" bg-color="#dd524d"
									bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff"
									@click.native.stop="favClick(item.id)"
									:contentText="{contentDefault: '收藏',contentFav: '取消收藏'}" />
							</view>
						</uni-card>
						<u-modal :show="showConform" :closeOnClickOverlay="true" :content="confirmContent"
							:showCancelButton="true" @confirm='confirmYes(index)' @cancel="confirmNo"
							@close="clickOverlay"></u-modal>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFavor,
		deleteById
	} from '@/api/modules/favor.js'
	export default {
		data() {
			return {
				current: 0,
				items: ['宠物', '周边'],
				favorList: [],
				showConform: false,
				confirmContent: "你确定要删除吗？",
				deleteId: 0,
			}
		},
		onLoad() {
			//0宠物1周边
			if (this.current == 0) {
				this.getFavor(true)
			} else {
				this.getFavor(false)
			}
		},
		mounted() {
			// this.getPet()
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					if (this.current == 0) {
						this.getFavor(true)
					} else {
						this.getFavor(false)
					}
				}

			},
			// 点击确认
			confirmYes() {
				deleteById({ id: this.deleteId }).then(res => {
					console.log(res)
					if (this.current == 0) {
						this.getFavor(true)
					} else {
						this.getFavor(false)
					}
					this.showConform = false
				}).catch(err => {

				})
			},
			// 点击取消
			confirmNo() {
				this.showConform = false
			},
			// 点击遮罩层
			clickOverlay() {
				this.showConform = false
			},
			// 去往收藏详情页
			toDetail(id, isPet) {
				if (isPet) {
					uni.navigateTo({
						url: '/pages/index/pet_details?id=' + id
					});
				} else {
					uni.navigateTo({
						url: '/pages/shop/product_detail?id=' + id
					});
				}
			},
			// 删除收藏
			favClick(id) {
				// 记录要删除的id
				this.deleteId = id
				// 开启提示框
				this.showConform = true

			},
			// 获取收藏
			getFavor(isPet) {
				getFavor({ isPet: isPet }).then(res => {
					this.favorList = res.data.data
					for (let i in this.favorList) {
						this.favorList[i].checked = true
					}
					console.log(this.current)
					console.log(this.favorList)
				}).catch(err => {

				})
			},
		}
		// ...
	};
</script>

<style scoped>
	.card {
		margin-top: 50rpx;
	}


	.favBtn {
		float: right;
		margin-bottom: 20rpx;
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

	.navbar {
		height: 60px;
		background-color: #f8f8f8;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.navbar-title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.content {
		padding: 20px;
	}

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.item-image {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		object-fit: cover;
	}

	.item-info {
		flex: 1;
	}

	.item-title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.item-shop {
		font-size: 14px;
		color: #888;
		margin-bottom: 5px;
	}

	.item-description {
		font-size: 14px;
		color: #666;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.empty-message {
		font-size: 16px;
		color: #888;
		text-align: center;
		margin-top: 20px;
	}
</style>