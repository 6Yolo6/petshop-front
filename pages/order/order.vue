<template>
	<view class="order">
		<u-navbar title="个人中心" :autoBack="true"></u-navbar>
		<u-tabs :list="list1" @click="click"></u-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'

				}]
			}
		},
		methods: {
			click(item) {
				console.log('item', item);
			}
		}
	};
</script>

<style lang="scss">

</style>
