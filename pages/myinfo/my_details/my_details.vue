<!-- <template>
	<view>
		<view class="header">
			<u-navbar title="我的信息" :autoBack="true">
				<view class="avatar">
					<u-avatar :src="detail.avatar"></u-avatar>
				</view>
			</u-navbar>
		</view>
	</view>
</template>

<script>
	import {
		getByName
	} from '../../../api/modules/user';
	export default {
		data() {
			return {
				avatar: '',
				detail: {},
				username: '',
			}
		},
		mounted() {
			this.username = uni.getStorageSync('username')
			this.getDetail()
		},
		methods: {
			getDetail() {
				getByName({ username: this.username }).then(res => {
					this.detail = res.data.data
					console.log(this.detail)
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		position: fixed;
		top: 0;
		z-index: 1000;
		background-color: white;
	}
</style> -->
<template>
	<view>
		<view class="header">
			<u-navbar title="我的信息" :autoBack="true">
				<view class="avatar">
					<u-avatar :src="detail.avatar"></u-avatar>
				</view>
			</u-navbar>
		</view>
		<view class="info">
			<uni-list-item title="头像" @click="changeUserpic" class="item">
				<!-- 为uni-list-item增加了插槽 -->
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.avatar}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" @click="changeUsername" class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.username}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="性别" @click="changeSex" class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.sex}}</text>
				</template>
			</uni-list-item>

			<!-- picker日期表单,不用导入调用的是各个平台的原生日期渲染 -->
			<picker mode="date" :value="birthday" @change="onDateChange" class="item">
				<uni-list-item title="创建时间">
					<template v-slot:footer>
						<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
						<text class="iconfont icon-bianji1 ml-2">{{detail.createTime}}</text>
					</template>
				</uni-list-item>
			</picker>


			<uni-list-item title="邮箱 " @click='changeEmotion' class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.email}}</text>
				</template>
			</uni-list-item>
			<view class="save">
				<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">保存</button>
			</view>
		</view>

		<pickerAddress></pickerAddress>
	</view>
</template>

<script>
	const sexArray = ['保密', '男', '女']
	const jobArray = ['农民', 'it', '教师']
	const emotionArray = ['保密', '未婚', '已婚']
	// import simpleAddress from '@/components/other-author-dev/simple-address/simple-address.nvue'
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import {
		getByName
	} from '../../../api/modules/user';
	export default {
		components: {
			pickerAddress

		},
		data() {
			return {
				detail: {},
				userpic: "/static/default.jpg",
				username: "不吃苹果",
				sex: 0,
				emotion: 0,
				job: "保密",
				birthday: "2019-01-01",
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				address: '河南省-郑州市-中原区'
			}
		},
		mounted() {
			this.username = uni.getStorageSync('username')
			this.getDetail()
		},
		computed: {
			sexText() {
				return sexArray[this.sex]
			},
			emotionText() {
				return emotionArray[this.emotion]
			},


		},
		methods: {
			getDetail() {
				getByName({ username: this.username }).then(res => {
					this.detail = res.data.data

					console.log(this.detail.username)
					console.log(this.detail)
				}).catch(err => {
					console.log(err)
				})
			},
			changeUserpic() {
				// 拍照或者选择本地图片
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.userpic = res.tempFilePaths[0]
					}
				})
			},
			// 修改昵称 不用理会
			changeUsername() {
				// this.$nextTick(function(){

				// 	console.log(this.$refs.usernameInput)
				// })
				// console.log('zzzzz')
				// this.$refs.username_input.focus()

			},
			// 修改性别
			changeSex() {
				// 显示操作菜单
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sex = res.tapIndex
					}
				})
			},
			// 修改已婚未婚
			changeEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: (res) => {
						this.emotion = res.tapIndex
					}
				})
			},
			// 修改职业
			changeJob() {
				uni.showActionSheet({
					itemList: jobArray,
					success: (res) => {
						this.job = jobArray[res.tapIndex]
					}
				})
			},
			// 修改日期
			onDateChange(e) {
				// console.log(e.detail)
				this.birthday = e.detail.value
			},
			// 三级联动
			onConfirm(e) {
				// console.log(JSON.stringify(e))
				this.address = e.label
			},
			// 调用该三级联动组件
			openAddres2() {
				// 根据 label 获取
				var index = this.$refs.simpleAddress.queryIndex(this.address.split('-'), 'label');
				// console.log(index);
				// 设置默认打开的地址
				this.cityPickerValueDefault = index.index;
				// 打开三级联动事件
				this.$refs.simpleAddress.open();
			},

		}
	}
</script>

<style scoped>
	.iconfont {
		font-size: smaller;
	}

	.align-center {
		position: absolute;
		right: 0;
		background-color: #000000;
	}

	.item {
		margin-bottom: 30rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.info {
		margin-top: 190rpx;
	}

	.save {
		margin-top: 250rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
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
</style>