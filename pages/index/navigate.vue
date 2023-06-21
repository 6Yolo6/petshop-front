<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap map">
				<map @tap="getMapLocation" :latitude="reportInfo.lttd" :longitude="reportInfo.lgtd" :markers="covers"
					style="width: 100%; height: 90vh;">
				</map>
			</view>
			<view class="item">
				<view class="content">
					<view class="desc solid-bottom row-info">
						<view class="text-black text-sm margin-top-sm overflow-2 item-content"
							style=" align-items: center;">
							系统已为您匹配
						</view>
						<view class="uni-button-group">
							<button class="uni-button" @click="markertap"
								:styles="{'borderColor':'#678D5D'}">导航</button>
						</view>
					</view>
				</view>
			</view>
			<view class="m-footer">
				<view @click="showRules">
					点我了解规则
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../utils/qqmap-wx-jssdk.js'
	const tMap = new QQMapWX({
		key: 'your key'
	})
	export default {
		data() {
			return {
				content: '使用小程序时，请遵守以下规则：1. 不得使用小程序进行违法活动，包括但不限于传播淫秽、暴力、恐怖等信息，侵犯他人隐私等行为。2. 不得利用小程序进行诈骗、敲诈勒索等违法行为。3. 不得利用小程序进行广告推销、垃圾信息发送等行为。4. 不得利用小程序进行恶意攻击、病毒传播等行为。5. 不得利用小程序侵犯他人知识产权等合法权益。6. 不得利用小程序进行任何影响小程序正常运行的行为。7. 遵守小程序的使用规则和相关法律法规，不得干扰、破坏小程序的正常运行。8. 如有违反以上规则，小程序有权采取相应措施，包括但不限于删除相关内容、限制使用权限、追究法律责任等。',
				// 默认坐标北京
				reportInfo: {
					lgtd: 116.39742,
					lttd: 39.909,
				},
				shop_id: '1',
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [], //存放标记点数组
				isLocated: false,
			}
		},
		methods: {
			// 弹出规则提示框
			showRules() {
				uni.showModal({
					title: '请阅读以下规则',
					content: this.content,
					showCancel: false,
					confirmText: '我已了解',
					success: function(res) {}
				})

			},
			/**
			 * 获取经纬度并触发回调函数
			 * @param {Function} successCb 获取成功回调
			 * @param {Function} authDenyCb 获取失败回调
			 */
			getLocation(successCb, authDenyCb) {
				const self = this
				uni.getLocation({
					type: 'gcj02', // 'wgs84'默认gps 坐标 'gcj02'国测
					altitude: false, // 是否返回高度
					accuracy: 'best', // 精度值为20m
					geocode: true,
					success(res) {
						console.log(res)
						successCb && successCb(res)
						self.isLocated = true
						//获取经纬度
						self.reportInfo.lttd = res.latitude;
						self.reportInfo.lgtd = res.longitude;
					},
					fail(err) {
						if (
							err.errMsg ===
							'getLocation:fail 频繁调用会增加电量损耗，可考虑使用 wx.onLocationChange 监听地理位置变化'
						) {
							uni.showToast({
								title: '请勿频繁定位',
								icon: 'none'
							})
						}
						if (err.errMsg === 'getLocation:fail auth deny') {
							// 未授权
							uni.showToast({
								title: '无法定位，请重新获取位置信息',
								icon: 'none'
							})
							authDenyCb && authDenyCb()
							self.isLocated = false
						}
						if (err.errMsg === 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF') {
							uni.showModal({
								content: '请开启手机定位服务',
								showCancel: false
							})
						}
					},
					complete() {
						console.log(self.reportInfo)
						tMap.reverseGeocoder({
							location: {
								latitude: self.reportInfo.lttd,
								longitude: self.reportInfo.lgtd
							},
							success: function(res) {
								console.log('解析地址成功');
								console.log(res);
								// 省
								// let province = res.result.ad_info.province;
								// 市
								let city = res.result.ad_info.city;
								// console.log(province);
							},
							fail: function(res) {
								uni.showToast({
									title: '定位失败',
									duration: 2000,
									icon: 'none'
								});
								console.log(res);
							},
							complete: function(res) { //无论成功失败都会执行
								console.log(res);
							}
						});
					}
				})
			},
			/**
			 * 重新授权并调用定位方法
			 * @param {Function} successCb 授权成功回调
			 * @param {Function} authDenyCb 授权失败回调
			 */
			getAuthorize(successCb, authDenyCb) {
				uni.authorize({
					scope: 'scope.userLocation',
					success: () => {
						this.getLocation(successCb, authDenyCb)
					},
					fail: (err) => {
						err = err['errMsg']
						uni.showModal({
								content: '需要授权位置信息',
								confirmText: '确认授权'
							})
							.then((res) => {
								if (res[1]['confirm']) {
									uni.openSetting({
										success: (res) => {
											if (res.authSetting['scope.userLocation']) {
												// 授权成功
												uni.showToast({
													title: '授权成功',
													icon: 'none'
												})
											} else {
												// 未授权
												uni.showToast({
													title: '授权失败',
													icon: 'none'
												})
											}
											this.getLocation(successCb, authDenyCb)
										}
									})
								}
								if (res[1]['cancel']) {
									// 取消授权
									console.log('取消')
									this.getLocation(successCb, authDenyCb)
								}
							})
					}
				})
			},
			//手动动获取定位
			getMapLocation() {
				var that = this;
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						that.reportInfo.lttd = res.latitude;
						that.reportInfo.lgtd = res.longitude;
					},
					complete() {
						console.log(that.reportInfo)
						tMap.reverseGeocoder({
							location: {
								latitude: that.reportInfo.lttd,
								longitude: that.reportInfo.lgtd
							},
							success: function(res) {
								console.log('解析地址成功');
								console.log(res);
								// 省
								// let province = res.result.ad_info.province;
								// 市
								let city = res.result.ad_info.city;
								// console.log(province);
							},
							fail: function(res) {
								uni.showToast({
									title: '定位失败',
									duration: 2000,
									icon: 'none'
								});
								console.log(res);
							},
							complete: function(res) { //无论成功失败都会执行
								console.log(res);
							}
						});
					}
				})
			},
			//导航到指定位置 ltt lgt
			markertap() {
				let that = this
				//调出地图传入目的地 ltt lgt
				uni.getLocation({
					success: (res) => {
						uni.openLocation({
							latitude: Number(that.reportInfo.lttd),
							longitude: Number(that.reportInfo.lgtd),
							success: function() {
								console.log('success');
							},
							fail: function() {
								uni.showModal({
									title: '错误',
									content: '请检查定位是否打开',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							}
						});
					}
				})

			},

		},
		components: {

		},
		onLoad() {
			console.log("in onload")
			uni.request({
				url: 'http://localhost:8899/petshop/shop/get?' + 'id=' + this.shop_id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.reportInfo.lttd = Number(res.data.data.latitude);
					this.reportInfo.lgtd = Number(res.data.data.longitude);
				},
				fail: () => {},
				complete: () => {}
			});
			that.getAuthorize()
		},
		onShow() {

		},
	}
</script>

<style>
	.map {
		border: 9rpx solid #678D5D;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 500rpx;
		/* width: 100%;
		height: 50%; */
		/* border-radius: 14rpx; */
	}

	.content {
		margin-top: 100rpx;
		width: 100%;
		height: 307rpx;
		border: 11rpx solid #;
		border-radius: 17rpx;
		/* color: white; */
		background-color: #ffffff;
	}

	.item {
		position: absolute;
		bottom: 100rpx;
		width: 100%;
		height: 300rpx;
		border: 5px none #9E9E9E;
		border-radius: 25rpx;
		/* 		margin-left: 25rpx;
		margin-right: 25rpx; */
		box-shadow: 4px 4px 5px #999;
		padding-bottom: 30rpx;
		display: block;
		background-color: var(--white);
		overflow: hidden;
		font-weight: 700;
	}


	.item-title {
		height: 73rpx;
		/* border-bottom: 9rpx solid #678D5D; */
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 28rpx;
		margin-top: -48rpx;
	}

	.item-content {
		height: 62rpx;
		/* border: 3rpx solid #9E9E9E; */
		margin-left: 40rpx;
		margin-right: 40rpx;
		font-size: 34rpx;
		/* text-justify: initial; */
		/* font-style: solid; */
	}

	.uni-button-group {
		/* 		margin-top: 50px; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 228rpx;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 12px;
		line-height: 1;
		margin: 0;
		background-color: #678D5D;
		color: white;
	}

	.sider-img {
		width: 254rpx;
		height: 306rpx;
	}

	.m-footer {
		margin-top: 162rpx;
		margin-left: 482rpx;
		position: absolute;
		bottom: 30rpx;
	}

	.img-footer {
		margin-top: -50rpx;
		border-bottom: 9rpx solid #678D5D;
		width: 300rpx;
		font-weight: 700;
	}
</style>