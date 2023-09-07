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
					<u-upload @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1"
						class="iconfont icon-bianji1 ml-2" :previewFullImage="true"></u-upload>
					<u--image :showLoading="true" :src="detail.avatar" width="80px" height="80px"
						@click="click"></u--image>
					<!-- <text class="iconfont icon-bianji1 ml-2">{{detail.avatar}}</text> -->
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" @click="changeUsername" class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="text-right">{{detail.username}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="性别" @click="changeSex" class="item">
				<template v-slot:footer>
					<u-picker :show="showGender" :columns="columns" defaultIndex="0"
						@confirm="confirmGender"></u-picker>
					<!-- <u-button @click="showGender = true" width="100rpx">打开</u-button> -->
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2 text-right">{{detail.sex}}</text>
				</template>
			</uni-list-item>

			<uni-list-item title="创建时间" class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.createTime}}</text>
				</template>
			</uni-list-item>


			<uni-list-item title="邮箱 " @click='changeEmotion' class="item">
				<template v-slot:footer>
					<!-- <input ref="usernameInput" class="text-right" type="text " value="" v-model="detail.username" /> -->
					<text class="iconfont icon-bianji1 ml-2">{{detail.email}}</text>
				</template>
			</uni-list-item>
			<!-- 			<view class="save">
				<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;"
					type="primary">{{state}}</button>
			</view> -->
		</view>

		<pickerAddress></pickerAddress>
	</view>
</template>

<script>
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	import {
		getByName,
		updateAvatar
	} from '../../../api/modules/user';
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				columns: [
					['女', '男']
				],
				showGender: false,
				fileList1: [],
				detail: {},
				state: '修改',
				asyncResult: null, // 用于存储异步操作的结果
			}
		},
		mounted() {
			this.username = uni.getStorageSync('username')
			this.getDetail()
		},
		computed: {
			resultFromAsync() {
				// 在这里引用异步操作的结果
				return this.asyncResult;
			},


		},
		methods: {
			// 确认性别
			confirmGender() {

			},
			// 修改性别
			changeSex() {
				this.showGender = true
			},
			// 初始化页面信息
			getDetail() {

				getByName({ username: this.username }).then(res => {
					this.detail = res.data.data

					console.log(this.detail.username)
					console.log(this.detail)
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				if (event.file instanceof File) {
					console.log(yes)
				}
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// updateAvatar(file) {
			// 	console.log(this.detail.id)
			// 	updateAvatar(file, { userId: this.detail.id }).then(res => {
			// 		console.log(res)
			// 	})
			// },
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:8899/petshop/user/updateAvatar', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							userId: this.detail.id
						},
						success: (res) => {
							console.log(res)
							this.getDetail()
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
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