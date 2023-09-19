<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<u-navbar :autoBack="true"></u-navbar>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="userName" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="登录密码" isShowPass></wInput>
			</view>
			<wButton class="wbutton" text="注 册" @click.native="startReg()"></wButton>
			<!-- 底部信息 -->
			<view style="margin: 20px auto;">
				已注册？<text @click="toLogin()">点击去登录</text>
			</view>
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">
					同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		register
	} from '@/api/modules/user.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '',
				userName: '', // 用户/电话
				passData: '', //密码
				showAgree: true, //协议是否选择
			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {},
		methods: {
			isShowAgree() {
				//是否选择协议
				this.showAgree = !this.showAgree;
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			startReg() {
				//注册
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不应该小于6位'
					});
					return false;
				}
				register({
					username: this.userName,
					password: this.passData
				}).then(res => {
					console.log(res)
					uni.setStorageSync("username", res.data.data.username)
					uni.setStorageSync("token", res.data.data.token)
					uni.switchTab({
						url: '/pages/myinfo/myinfo'
					})
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>