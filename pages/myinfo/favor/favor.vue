<template>
	<view>
		<view class="navbar">
			<text class="navbar-title">用户收藏</text>
		</view>

		<!-- 页面内容 -->
		<view class="content">
			<view v-if="favorites.length === 0">
				<text>暂无收藏</text>
			</view>
			<view v-else>
				<!-- 商品列表 -->
				<view v-for="(item, index) in favorites" :key="index" class="item">
					<image :src="item.image" mode="aspectFill" class="item-image"></image>
					<view class="item-info">
						<text class="item-title">{{ item.title }}</text>
						<text class="item-shop">{{ item.shop }}</text>
						<text class="item-description">{{ truncateDescription(item.description, 50) }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				favorites: []
			}
		}
		// ...
	};
</script>

<style scoped>
	.navbar {
		height: 60px;
		background-color: #f8f8f8;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.navbar-title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.content {
		padding: 20px;
	}

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.item-image {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		object-fit: cover;
	}

	.item-info {
		flex: 1;
	}

	.item-title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.item-shop {
		font-size: 14px;
		color: #888;
		margin-bottom: 5px;
	}

	.item-description {
		font-size: 14px;
		color: #666;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.empty-message {
		font-size: 16px;
		color: #888;
		text-align: center;
		margin-top: 20px;
	}
</style>