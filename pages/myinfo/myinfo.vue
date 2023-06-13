<template>
	<view class="page">
		<view class="header">
			<u-navbar title="我的空间" :autoBack="true" leftIcon="">
			</u-navbar>
		</view>
		<view class="top">
			<view class="background"></view>
		</view>
		<view class="user-card">
			<view class="card">
				<view class="top">
					<view class="userImage">
						<u--image src="https://cdn.uviewui.com/uview/album/1.jpg"></u--image>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<view class="user-text">
							名字
						</view>
						<view class="user-phone"> 171****4133 </view>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="left flex-center">
						<image src="../../static/myIcon/qiu.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>我的地址</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="left flex-center">
						<image src="../../static/myIcon/1.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>我的收藏</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item">
					<view class="left flex-center">
						<image src="../../static/myIcon/2.png" mode="aspectFit"></image>
					</view>
					<view class="center">
						<text>我的订单</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center">
				退出登录
			</view>
		</view>
	</view>
</template>
<script>
	//import {  } from "@/common/api/{$}.js";
	export default {
		data() {
			return {
				name
			};
		},
		mounted() {

		},
		methods: {},
	};
</script>
<style lang="scss" scoped>
	.header {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		position: fixed;
		top: 0;
		z-index: 1000;
		// background-color: rgb(81, 153, 255) !important;
	}

	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: #5199ff;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 180rpx;
			width: 100%;
		}
	}

	.icon {
		color: #96a1ae;
		font-size: 40rpx;
	}

	.user-card {
		height: 170rpx;
		padding: 0 15px;

		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 30%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 2px solid white;
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 1.6em;
						padding-left: 80rpx;
						height: 50%;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {
		padding: 0 15px;

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 5px 30px;

			.item {
				display: flex;
				height: 120rpx;

				.left {
					width: 15%;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}

				.center {
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 1.1em;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		.btn {
			background-color: #4f99ff;
			border-radius: 30px;
			width: 80%;
			color: white;
			font-size: 1.2em;
			height: 100%;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>