<template>
	<view class="order-detail">
		<!-- 		<u-card bg-color="#ffffff" shadow="hover" padding="20">
			<div class="u-flex u-align-center">
				<img class="avatar" src="avatar.png" />
				<div class="u-margin-left">
					<div class="name">用户名</div>
					<div class="desc">个人简介</div>
				</div>
			</div>
		</u-card> -->
		<u-button :ripple="true" type="primary">十年</u-button>

		<!-- 通过rippleBgColor设置水波纹的背景颜色 -->
		<u-button :ripple="true" ripple-bg-color="#909399">之约</u-button>
		<u-list>
			<u-list-item title="订单号" extra="'123456789'" />
			<u-list-item title="下单时间" extra="2023-06-07 12:00:00" />
			<u-list-item title="收货地址" extra="广东省深圳市南山区xx路xx号" />
			<u-list-item title="订单状态" extra="待发货">
				<u-tag type="warning">待发货</u-tag>
			</u-list-item>
		</u-list>

		<u-collapse accordion>
			<u-collapse-item title="商品列表">
				<!-- 商品列表 -->
			</u-collapse-item>
			<u-collapse-item title="订单备注">
				<!-- 订单备注 -->
			</u-collapse-item>
			<u-collapse-item title="发票信息">
				<!-- 发票信息 -->
			</u-collapse-item>
		</u-collapse>

		<u-cell-group>
			<u-cell title="设置" is-link />
			<u-cell title="关于" is-link />
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	.order-detail {
		padding: 20px;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 20px;
	}

	.name {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.desc {
		color: #999;
		font-size: 14px;
	}

	.u-list-item {
		padding: 20px;
	}

	.u-list-item-extra {
		color: #999;
	}

	.u-collapse-item {
		padding: 20px;
	}

	.u-cell-group {
		margin-top: 20px;
	}
</style>