<template>
	<view class="container">
		<view class="header">
			<u-navbar title="收货地址" :autoBack="true">
			</u-navbar>
		</view>
		<view class="addres-list">
			<view class="address-item" v-for="(item, index) in addressList" :key="index">
				<view class="contacts">
					<text class="name">{{ item.name }}</text>
					<text class="phone">{{ item.phoneNumber }}</text>
				</view>
				<view class="address">
					<text class="region">{{ item.area }}</text>
					<text class="detail">{{ item.detail }}</text>
					<u-tag :text="item.tag" class="tag" bg-color="#f93737"></u-tag>
				</view>
				<view class="line"></view>

				<view class="item-option">
					<view class="_left">
						<label class="item-radio" @click.stop="handleSetDefault(index)">
							<u-switch v-model="item.isDefault" activeColor="#f56c6c"></u-switch>
						</label>
					</view>
					<view class="_right">
						<view class="events">
							<view class="event-item" @click="handleUpdate(item.id)">
								<text class="iconfont icon-edit"></text>
								<u-button type="primary" text="编辑" class="button"></u-button>
							</view>
							<view class="event-item" @click="handleRemove(item.id)">
								<text class="iconfont icon-delete"></text>
								<u-button type="primary" text="删除" class="button"></u-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部操作按钮 -->
		<view class="footer-fixed">
			<view class="btn-wrapper">
				<view class="btn-item btn-item-main" @click="handleCreate()">添加新地址</view>
			</view>
		</view>
		<u-modal :show="showConform" :closeOnClickOverlay="true" :content="confirmContent" :showCancelButton="true"
			@confirm='confirmYes()' @cancel="confirmNo" @close="clickOverlay"></u-modal>
	</view>
</template>

<script>
	import {
		getAddressByUserId,
		updateDefaultById,
		deleteById
	} from '@/api/modules/user_address.js'
	export default {

		data() {
			return {
				addressList: [],
				defaultName: '',
				showConform: false,
				confirmTitle: '提示',
				confirmContent: '你确定要删除吗？',
				deleteId: -1,
			}
		},

		onShow() {
			// 获取地址数据
			this.getaddressList()
			this.onReorder()
		},


		methods: {
			clickOverlay() {
				this.showConform = false
			},
			confirmNo() {
				this.showConform = false
			},
			confirmYes() {
				deleteById({ addressId: this.deleteId }).then(res => {
					console.log(res)
					this.getaddressList()
				}).catch(err => {

				})
				this.showConform = false
			},
			// 获取收货地址
			getaddressList() {
				getAddressByUserId({
					userId: 1
				}).then(res => {
					this.addressList = res.data.data
					// for (let i in this.addressList) {
					// 	console.log(this.addressList[i].isDefault)
					// }
					// console.log(this.addressList)
				}).catch(err => {

				})
			},

			// 列表排序把默认收货地址放到最前
			onReorder() {
				this.addressList.sort(item => {
					return item.address_default ? -1 : 1
				})
			},
			// 添加地址
			handleCreate() {
				uni.navigateTo({
					url: '/pages/myinfo/address/editaddress',
				});
			},
			// 编辑地址
			handleUpdate(addressId) {
				uni.navigateTo({
					url: '/pages/myinfo/address/editaddress?id=' + addressId,
				});
			},
			// 删除地址
			handleRemove(addressId) {
				this.showConform = true
				this.deleteId = addressId
			},
			updateDefaultById(id, isDefault) {
				updateDefaultById({ addressId: id, isDefault: isDefault }).then(res => {
					// 重新获取收货地址
					this.getaddressList()
				}).catch(err => {

				})
			},
			// 设置默认地址
			handleSetDefault(index) {
				if (this.addressList[index].isDefault) {

					for (let i in this.addressList) {
						if (this.addressList[i].isDefault && i != index) {
							this.updateDefaultById(this.addressList[i].id, false)
						}
					}
				} else {
					this.updateDefaultById(this.addressList[index].id, false)
				}
				this.updateDefaultById(this.addressList[index].id, true)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		margin-left: auto;
	}

	.button {
		border-radius: 30%;
		border: none;
		background: #f96666;
		;
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

	.addres-list {
		border-radius: 50%;
		padding-top: 20rpx;
		margin: 20rpx;
		padding-bottom: 120rpx;
	}

	// 项目内容
	.address-item {
		margin: 20rpx auto 20rpx auto;
		padding: 30rpx 40rpx;
		width: 94%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: linear-gradient(to right, #FFD2D2, #ff8c8c);
	}

	.contacts {
		font-size: 30rpx;
		margin-bottom: 16rpx;

		.name {
			margin-right: 16rpx;
		}
	}

	.address {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;

		.region {
			margin-right: 10rpx;
		}
	}

	.line {
		margin: 20rpx 0;
		border-bottom: 1rpx solid #f3f3f3;
	}

	.item-option {
		display: flex;
		justify-content: space-between;
		height: 48rpx;

		// 单选框
		.item-radio {
			font-size: 28rpx;

			.radio {
				vertical-align: middle;
				transform: scale(0.76)
			}

			.text {
				vertical-align: middle;
			}
		}

		// 操作
		.events {
			display: flex;
			align-items: center;
			line-height: 48rpx;

			.event-item {
				font-size: 28rpx;
				margin-right: 26rpx;
				color: #4c4c4c;
			}
		}

	}


	// 底部操作栏
	.footer-fixed {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		min-height: 120rpx;
		z-index: 11;
		box-shadow: 0 -4rpx 40rpx 0 rgba(151, 151, 151, 0.24);
		background: #fff;

		// 设置ios刘海屏底部横线安全区域
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.btn-wrapper {
			height: 120rpx;
			display: flex;
			align-items: center;
			padding: 0 40rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
		}

		.btn-item-main {
			background: linear-gradient(to right, #f9211c, #ff6335);
		}

	}
</style>