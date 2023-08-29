<template>
	<view>
		<view class="head">
			<u-navbar title="商店详情" :autoBack="true">
			</u-navbar>
		</view>
		<view class="tabs">

		</view>
		<view class="content">
			<view>
				666
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			let id = option.id
			// 获取商店信息
			console.log(id)

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>