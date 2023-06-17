<script>
	import Vue from 'vue'
	export default {
		created() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen();
			// #endif 
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif        

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App 开启')

			// 在这里添加第二个 App.vue 中的代码
			setTimeout(() => {
				uni.setTabBarBadge({
					index: 2,
					text: this.$store.getters.getTotalProductNum
				});
				uni.showTabBarRedDot({
					index: 3
				});
			}, 1000);
		},
		onHide: function() {
			console.log('App 关闭')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '//at.alicdn.com/t/c/font_4111808_8sigcajr1jk.css';

	/* 这里是第一个 App.vue 中的样式代码 */
	body {
		background: #FFFFFF !important;
	}
</style>