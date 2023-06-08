<template>
	<view class="order">
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
