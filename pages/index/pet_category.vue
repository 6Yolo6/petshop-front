<template>
	<view>
		<view class="header">
			<u-navbar title="宠物分类" :autoBack="true">
			</u-navbar>
		</view>
		<!-- 分段器筛选 -->
		<view class="category"><!-- 
			<u-subsection :list="category_list" :current="current" :activeColor="active_color"
				@change="sectionChange"></u-subsection> -->
			<u-tabs :list="category_list" @click="sectionChange" :current="current" activeColor="#0000ff"></u-tabs>
		</view>
		<view>
			<view v-for="(item,index) in pet_list" :key="index">
				<uni-card :title="item.name" :isFull="true" :sub-title="item.breed" :extra="''+item.price+'￥'"
					@click="toDetail(item.id)">
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllCate
	} from '@/api/modules/pet_category.js'
	import {
		getByCate
	} from '@/api/modules/pet.js'
	export default {
		data() {
			return {
				selected_value: '',
				category_list: [{ name: '全部' }],
				pet_list: [],
				inp_value: '',
				tip: '请输入关键字',
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0,
				active_color: '#0000ff'
			}
		},
		onLoad() {
			// 判断路由栈是否存在页面
			if (getCurrentPages().length > 1) {
				// url中获取类别id
				this.current = this.$route.query.index
			} else {
				//默认显示狗狗类
				this.current = 0
			}

			// console.log(typeof(this.current))
			// 获取全部类别
			this.getAllCate()
			// 获取默认类别
			this.getByCategory(Number(this.current))
		},
		mounted() {

		},
		methods: {
			// 进入宠物详情页
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/pet_details?id=' + id
				});
			},
			// 左上角返回
			leftClick() {
				console.log('leftClick');
			},
			// 获取种类
			getAllCate() {
				getAllCate().then((res) => {
					// console.log(res)
					let temp_list = []
					temp_list = res.data.data
					for (let i in temp_list) {
						this.category_list.push({
							name: temp_list[i].name
						})
					}
				}).catch((err) => {
					console.log('错误')
				})
			},

			// 种类选择
			sectionChange(index) {
				this.current = index.index
				// console.log(index)
				this.getByCategory(index.index)
			},
			// 根据种类id筛选宠物
			getByCategory(index) {
				getByCate({
					category: index,
					pageNum: 1,
					pageSize: 10
				}).then((res) => {
					// let temp_list = []
					this.pet_list = res.data.data.records
					// this.pet_list
					// console.log(temp_list)
				}).catch((err) => {
					console.log('错误')
				})
			}
		}
	}
</script>

<style scoped>
	.category {
		margin-top: 60rpx;
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

	.select {
		width: 20%;
	}
</style>