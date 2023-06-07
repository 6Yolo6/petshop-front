<template>
	<view class="content">
		页面 - 2
		<u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		111

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					cate_name: '待收货'
				}, {
					cate_name: '待付款'
				}, {
					cate_name: '待评价'
				}],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

</style>
