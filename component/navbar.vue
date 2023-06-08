<template>
	<view>
		<u-tabbar :value="value" @change="change_tab" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
			<u-tabbar-item text="商城" icon="photo"></u-tabbar-item>
			<u-tabbar-item text="购物车" icon="play-right" badge="3"></u-tabbar-item>
			<u-tabbar-item text="消息" icon="account"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name: 'navbar',
		data() {
			return {
				value: 0
			}
		},
		methods: {
			change_tab(name) {
				this.value = name
			},
		}
	}
</script>

<style lang="scss">

</style>
