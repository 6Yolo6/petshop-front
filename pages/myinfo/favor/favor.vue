<template>
	<view>
		<view class="nav">
			<uni-nav-bar shadow left-icon="left" title="我的收藏" @clickLeft="back" :border="false" />
		</view>
		<view>
			<view v-for="(item,index) in favor_list" :key="index">
				<uni-card :title="item.name" :isFull="true" :sub-title="item.breed" :extra="''+item.price+'￥'"
					@click="toDetail(item.id)">
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				favor_list: []
			}
		},
		methods: {

		}
	}
</script>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: white;
	}
</style>