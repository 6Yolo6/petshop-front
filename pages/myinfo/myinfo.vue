<template>
	<view class="content">
		<!-- 导航栏 -->
		<!-- <u-navbar :is-back="false" :is-fixed="true" title="" title-color="white" :background="background" :border-bottom="false"/> -->
		<u-navbar :is-back="false" title="" title-color="white" :background="background" :border-bottom="false">
			<view class="slot-wrap">
				 
				<view class="map-wrap"></view>		
				<view class="search-wrap" ></view>
				<view class="navbar-right" >
					<view class="message-box right-item">
						<u-icon name="bell" size="38"></u-icon>
						<u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
					</view>
					<view class="dot-box right-item">
						<u-icon name="setting" size="38"></u-icon>
						<u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
					</view>
				</view>
				
			</view>
		</u-navbar>
		
		
		<!-- 用户背景 -->
		<view class="user-bg">
			<view class="u-flex user-box u-p-l-40 u-p-r-30 u-p-b-30">
				<view class="u-m-r-10">
					<u-avatar :src="pic" size="140" :fade="true" duration="450" :lazy-load="true"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-16 u-p-b-20">用户名称</view>
					<view class="u-font-12 ">手机号:18206292125</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="scan" color="#ffffff" size="28"></u-icon>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#ffffff" size="28"></u-icon>
				</view>
			</view>
		</view>

		<!-- vip -->
		<view class="u-flex vip-card u-p-l-40 u-p-r-30 u-p-b-30">
			<view class="u-m-r-10 u-flex-1 u-p-t-30">
				<u-icon name="integral" class="u-m-r-20"></u-icon>
				<text>商城尊享会员</text>
			</view>
			<view class="u-flex-1 u-p-t-30" style="text-align: right;">
				<u-icon name="level"></u-icon> 1
				<text class="u-font-12 u-m-l-20">钻石会员</text>
			</view>
		</view>
		
		
		<!-- 余额 -->
		<view class="" style="position: relative; top:-75upx;">
			<!-- card -->
			<view class="card-hader">
				<u-icon name="red-packet" size="38"></u-icon>
				<text class="u-m-l-20">我的账户</text>
			</view>
			<view class="card-body">
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<text class="u-font-18">0</text>
						<view class="grid-text">余额</view>
					</u-grid-item>
					<u-grid-item>
						<text class="u-font-18">0</text>
						<view class="grid-text">优惠券</view>
					</u-grid-item>
					<u-grid-item>
						<text class="u-font-18">0</text>
						<view class="grid-text">积分</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		
		<!-- 订单 -->
		<view class="" style="position: relative; top:-60upx;">
			
			<!-- card -->
			<view class="card-hader" @click="$u.route('/pages/order/order');">
				<u-icon name="red-packet" size="38"></u-icon>
				<text class="u-m-l-20">全部订单</text>
				<u-icon name="arrow-right" size="30" class="u-m-t-10" style="float: right;"></u-icon>
			</view>
			<view class="card-body">
				<u-grid :col="5" :border="false">
					<u-grid-item @click="$u.route('/pages/order/order');">
						<u-icon name="red-packet" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">待付款</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pages/order/order');">
						<u-icon name="car" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">待发货</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pages/order/order');">
						<u-icon name="bag" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">待收货</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pages/order/order');">
						<u-icon name="chat" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">待评价</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pages/order/order');">
						<u-icon name="trash" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">退款售后</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		
		
		<!-- 设置 -->
		<view class="" style="position: relative; top:-45upx; margin-bottom: 100upx;">
			<!-- card -->
			<view class="card-hader">
				<u-icon name="grid" size="38"></u-icon>
				<text class="u-m-l-20 ">我的服务</text>
			</view>
			<view class="card-body">
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<u-icon name="star" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">我的收藏</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="map" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">地址管理</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="trash" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">分销中心</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="zhuanfa" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">分享</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="kefu-ermai" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">联系我们</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="setting" size="38"></u-icon>
						<view class="grid-text u-font-10 u-m-t-10">设置</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		

	</view>
</template>

<script>
	// import '../../components/search-navbar.vue'
	import searchNavbar from '@/pages/search-navbar.vue';
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(90deg, rgb(42,132,255), rgb(234,175,200))'
				},
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			this.$u.route("/uview-ui/components/u-full-screen/u-full-screen?id=1");
		},
		methods: {
		},
		components: { searchNavbar }
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #F8F8F8;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}

	// 
	.user-bg{
		background: linear-gradient(90deg, rgb(42,132,255), rgb(234,175,200));
		width: 100vw;
		height: 280upx;
	}
	
	
	// 导航栏
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
	
	.camera{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		// background-color: #fff;
		color: #FFFFFF;
	}
	
	.vip-card{
		background-image: url(../../static/vip-card.png);
		background-size: cover;
		color: #f6e5a3;
		width: 90vw;
		position: relative;
		top: -95upx;
	}
	
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	
	
	.card-hader{
		text-align: left;
		width: 92vw;
		margin: 0 500upx;
		padding: 15upx 20upx;
		background-color: #FFFFFF;
		border: 1upx solid #FDF6EC;
	}
	.card-body{
		width: 92vw;
		margin: 0 500upx;
		padding: 15upx 20upx;
		background-color: #FFFFFF;
		border: 1upx solid #FDF6EC;
		border-top: none;
	}
</style>
