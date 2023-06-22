<template>
	<view class="container">
		<!-- 标题 -->
		<view class="page-title">收货地址</view>
		<!-- 表单组件 -->
		<view class="form-wrapper">
			<u-form :model="form" ref="form" :rules="rules" label-width="140rpx">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" placeholder="请输入收货人姓名" />
				</u-form-item>
				<u-form-item label="电话" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入收货人手机号" />
				</u-form-item>
				<u-form-item label="地区" prop="address" @click="showaddress = true;">
					<u-input v-model="form.address" placeholder="选择省市区" readonly />
				</u-form-item>
				<view @click="getLocations" style="display:flex;position:relative;top:-40px;left: 365px;">
					<view>
						<image src="/static/wz.png" mode="" style="width: 15px;height: 15px;"></image>
					</view>
					<view style="margin-left: 2px;font-size: 13px;color: #fb3824">
						定位
					</view>
				</view>
				<u-overlay :show="showaddress" @click="showaddress = false">
					<!-- <van-area :area-list="areaList" v-show="showaddress" @cancel="showaddress = false"
						@confirm="onAreaConfirm" style="margin-top: 525px;" /> -->
				</u-overlay>
				<u-form-item label="详细地址" prop="detail" :border-bottom="false">
					<u-input v-model="form.detail" placeholder="街道门牌、楼层等信息" />
				</u-form-item>
			</u-form>

			<view style="display: flex;justify-content: space-between;margin-top: 30px;padding-bottom: 10px;">
				<view>
					设置为默认地址
				</view>
				<view>
					<u-switch v-model="form.address_default" activeColor="#f56c6c"
						@change="form.address_default==true"></u-switch>
				</view>
			</view>
		</view>
		<!-- 操作按钮 -->
		<view class="footer">
			<view class="btn-wrapper">
				<view class="btn-item btn-item-main" @click="handleSubmit()">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	areaList
	// } from '@/node_modules/vant/area-data';

	// 表单字段元素
	const form = {
		name: '',
		phone: '',
		detail: '',
		address: '',
		address_default: false,
		id: "",
		isShow: false
	}

	// 表单验证规则
	const rules = {
		name: [{
			required: true,
			message: '请输入姓名',
			trigger: ['blur', 'change']
		}],
		phone: [{
			required: true,
			message: '请输入手机号',
			trigger: ['blur', 'change'],
			type: 'number',

		}, {
			validator: function(rule, value, callback) {
				if (/^1[34578]\d{9}$/.test(value) == false) {
					callback(new Error("手机号格式错误"));
				} else {
					callback();
				}
			},
			trigger: "blur"
		}],

		address: [{
			required: true,
			message: '请选择省市区',
			trigger: ['blur', 'change'],
			type: 'array'
		}],
		detail: [{
			required: true,
			message: '请输入详细地址',
			trigger: ['blur', 'change']
		}],
	}

	export default {
		data() {
			return {
				form,
				rules,
				// areaList: areaList,
				showaddress: false,
			}
		},
		onLoad(options) {
			this.getaddressDetail(options.id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},

		methods: {
			// 获取当前地址
			getaddressDetail(id) {
				const list = uni.getStorageSync('savedData')
				const item = list.filter(address => address.id === id);
				const {
					form
				} = this
				form.address_default = item[0].address_default
				form.address = item[0].address
				form.detail = item[0].detail
				form.name = item[0].name
				form.phone = item[0].phone
				form.id = item[0].id
				form.isShow = item[0].isShow
			},
			// 点击确定
			onAreaConfirm(value) {
				const tmp = []
				value.detail.values.forEach(item => {
					tmp.push(item.name)
				})
				this.form.address = tmp;
				this.showaddress = false;
			},
			// 表单提交
			handleSubmit() {
				this.$refs.form.validate().then(res => {
					const addressList = uni.getStorageSync('savedData');
					const updatedList = addressList.filter(address => address.id !== this.form.id);
					if (this.form.address_default == true) {
						updatedList.forEach(address => {
							address.address_default = false;
						});
						updatedList.push(this.form);
						uni.setStorageSync('savedData', updatedList);

					} else {
						updatedList.push(this.form);
						uni.setStorageSync('savedData', updatedList);
					}
					uni.navigateTo({
						url: '/pages/address/address',
					});
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			//获取定位
			getLocations() {
				this.showaddress = false
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						let lat = res.latitude;
						let lng = res.longitude;
						let key =
							'P7PBZ-BPXED-DJE4X-PTPBI-W7LXF-XMBBY'; //申请地址：https://lbs.qq.com/dev/console/application/mine
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng +
								'&key=' + key,
							method: "GET",
							success(ress) {
								let data = ress.data; //获取到所有定位的数据
								const address = []
								address.push(data.result.address_component.province)
								address.push(data.result.address_component.city)
								address.push(data.result.address_component.district)
								that.form.address = address
							},

							fail() {
								uni.showToast({
									'title': '对不起，数据获取失败！',
									'icon': 'none'
								})
							}
						})
					},
					fail(res) {
						uni.showToast({
							'title': '对不起，获取位置失败！',
							'icon': 'none'
						})
					}

				})
			},

		}
	}
</script>

<style scoped>
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.page-title {
		width: 94%;
		margin: 0 auto;
		padding-top: 40rpx;
		font-size: 28rpx;
		color: rgba(69, 90, 100, 0.6);
	}

	.form-wrapper {
		margin: 18rpx auto 20rpx -45px;
		padding: 0 106rpx;
		width: 85%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
	}

	// 底部操作栏
	.footer {
		margin-top: 80rpx;

		.btn-wrapper {
			height: 100%;
			// display: flex;
			// align-items: center;
			padding: 0 20rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 86rpx;
			color: #fff;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btn-item-wechat {
			background: #0ba90b;
			margin-bottom: 26rpx;
		}

		.btn-item-main {
			background: linear-gradient(to right, #f9211c, #ff6335);
			color: #fff;

			// 禁用按钮
			&.disabled {
				opacity: 0.6;
			}
		}

	}
</style>