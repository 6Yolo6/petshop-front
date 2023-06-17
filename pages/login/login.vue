<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage" class="img"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="userName" type="text" maxlength="11" placeholder="用户名" :focus="isFocus"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" @click="startLogin"></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		login
	} from '@/api/modules/user.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '',
				userName: '', //用户/电话
				passData: '', //密码
				isFocus: true, // 是否聚焦
				user: {},
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			// this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			startLogin() {
				//登录
				if (this.userName.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}
				login({
					username: this.userName,
					password: this.passData,
				}).then(res => {
					console.log(res.data.data)
					this.user = res.data.data.user
					uni.setStorageSync("username", this.user.username)
					uni.setStorageSync("token", res.data.data.token)
					// localStorage.setItem("username", user.username)
					// localStorage.setItem("token", user.token)
					uni.switchTab({
						url: '/pages/myinfo/myinfo'
					})

				}).catch(err => {
					console.log(err)
				})

			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>