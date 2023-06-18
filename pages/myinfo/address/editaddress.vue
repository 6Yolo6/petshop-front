<template>
	<view class="container">
		<view class="header">
			<u-navbar title="收货地址" :autoBack="true">
			</u-navbar>
		</view>
		<!-- 表单组件 -->
		<view class="form-wrapper">
			<u-form :model="form" ref="form" :rules="rules" label-width="120rpx" style="a">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" placeholder="请输入收货人姓名" />
				</u-form-item>
				<u-form-item label="电话" prop="phoneNumber">
					<u-input v-model="form.phoneNumber" placeholder="请输入收货人手机号" />
				</u-form-item>
				<u-form-item label="地区" prop="address" @click="showaddress = true;">
					<pickerAddress @change="change">{{form.area}}</pickerAddress>
				</u-form-item>
				<u-form-item label="详细地址" prop="detail" :border-bottom="false">
					<u-input v-model="form.detail" placeholder="街道门牌、楼层等信息" />
				</u-form-item>
			</u-form>
			标签
			<view class="tag" v-for="(item, index) in tag" :key="index">
				<u-tag :text="item.name" :plain="!item.checked" type="warning" :name="index" @click="tagClick">
				</u-tag>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 30px;padding-bottom: 10px;">
				<view>
					设置为默认地址
				</view>
				<view class="btn-default">
					<u-switch v-model="form.isDefault" activeColor="#f56c6c" @change="form.isDefault==true"></u-switch>
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
	import {
		v4 as uuidv4
	} from 'uuid';

	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import {
		updateById,
		getAddressById
	} from '@/api/modules/user_address.js'
	import form from '../../../uni_modules/uview-ui/libs/config/props/form';
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				tag: [{
						checked: false,
						name: "公司",
					},
					{
						checked: false,
						name: "家",
					},
					{
						checked: false,
						name: "学校",
					}
				],
				// 提示信息
				txt: '选择地址',
				title: 'Hello',
				// 校验规则
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					phoneNumber: [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change'],
						type: 'number',

					}, {
						validator: function(rule, value, callback) {
							// 表示以 1 开头，后面跟着 3、4、5、7、8 中的一个数字，然后跟着任意 9 个数字，最后以数字结束
							if (/^1[34578]\d{9}$/.test(value) == false) {
								callback(new Error("手机号格式错误"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}],
					area: [{
						required: true,
						message: '请选择省市区',
						trigger: ['blur', 'change'],
					}],
					detail: [{
						required: true,
						message: '请输入详细地址',
						trigger: ['blur', 'change']
					}],
				},
				// areaList: areaList,
				showaddress: false,
				form: {
					name: '',
					phoneNumber: '',
					detail: '',
					area: '请选择地区',
					isDefault: false,
					tag: '',
				}
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			let id = 0
			// console.log(this.areaList)
			this.$refs.form.setRules(this.rules)
			// 判断路由栈是否存在页面
			if (getCurrentPages().length > 1) {
				// url中获取类别id
				id = this.$route.query.id
				this.getAddressById(id)
			}

		},
		methods: {
			back() {
				// uni.$emit('refreshData')
			},
			// 修改时获取收货地址信息
			getAddressById(id) {
				getAddressById({
					addressId: id
				}).then(res => {
					let list = res.data.data
					this.form = list
					// 标签选中
					for (let i in this.tag) {
						if (this.tag[i].name == this.form.tag) {
							this.tag[i].checked = true
						}
					}
					console.log(list)
				}).catch(err => {

				})
			},
			tagClick(index) {
				// 如果未选中
				if (!this.tag[index].checked) {
					for (let i in this.tag) {
						this.tag[i].checked = false
					}
				}
				this.tag[index].checked = !this.tag[index].checked
				this.form.tag = this.tag[index].name

			},
			change(data) {
				this.form.area = data.data.join(' ')
				console.log(data.data.join(' '))
			},
			// 表单提交
			handleSubmit() {
				console.log(this.form);
				this.$refs.form.validate().then(res => {
					updateById({
						...this.form
					}).then(res => {
						console.log(res.data)
						// uni.redirectTo({
						// 	url: '/pages/myinfo/address/addresslist',
						// });
						uni.navigateBack({
							delta: 1
						})
						uni.$emit('refreshData')
					}).catch(err => {})

					this.form.name = ''
					this.form.phoneNumber = ''
					this.form.detail = ''
					this.form.area = '请选择地区'
					this.isDefault = false
					this.tag = ''

					// uni.navigateTo({
					// 	url: '/pages/myinfo/address/addresslist',
					// });
					// uni.$emit('refreshData')
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			//获取定位(uni自带的api)
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
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' +
								lng +
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
	.btn-default {
		margin-right: 80rpx;
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

	.tag {
		display: inline-block;
		margin: 20rpx;
	}

	.a {
		// width: 340px !important;
	}


	.form-wrapper {

		margin: auto;
		padding: 0 106rpx;
		width: 90%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
	}

	// 底部操作栏
	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 40rpx;
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