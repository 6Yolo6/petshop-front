<template>
	<view>
		<u-navbar :is-back="false" title="" title-color="white" :background="background" >
			<view class="slot-wrap">
				
				<view class="map-wrap" @click="getLocation">
					<u-icon name="map" color="#ffffff" size="35"></u-icon>
					<text class="map-wrap-text">青岛</text>
					<!-- <u-icon name="arrow-down-fill" color="#ffffff" size="22"></u-icon> -->
				</view>		
				<view class="search-wrap" >
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search height="56" :show-action="false" :action-style="{color: '#fff'}" @focus="search"></u-search>
				</view>
				<view class="navbar-right" >
<!-- 					<view class="message-box right-item">
						<u-icon name="chat" size="38"></u-icon>
						<u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
					</view> -->
					<view class="dot-box right-item">
						<u-icon name="chat-fill" size="35"></u-icon>
						<u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
					</view>
				</view>
				
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: 'search-navbar',
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(42,132,255), rgb(234,175,200))'
				}
			};
		},
		methods:{
			search(){
				this.$u.route({url: 'pages/search/search'})
			},
			getLocation(){
				this.$u.route({url: 'pages/location/location'})
			}
		}
	}
</script>

<style lang="scss">
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	
	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}
	
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}
	
	.message-box {
		
	}
	
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		// background-color: rgba(240,240, 240, 0.35);
		color: #fff;
		font-size: 20rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}
	
	.map-wrap-text {
		padding: 0 6rpx;
	}
</style>
