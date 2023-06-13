import { getStore } from '@/libs/storage'
import axios from 'axios'
import qs from 'qs'

// const baseURL = 'http://localhost:8899/petshop'
// 宿舍
const baseURL = 'http://192.168.2.205:8899/petshop'
// const baseURL = 'http://localhost:8899/vuebackend'

function interceptors(response) {
	// response status = 200
	const result = response.data
	if (result.statusCode === 200) {
		return Promise.resolve(result)
	} else if (result.statusCode === 600) {
		// 页面跳转
		uni.navigateTo({ url: '/' })
		return Promise.reject('need login!')
	} else if (result.statusCode === 400) {
		return Promise.reject(result.message)
	} else {
		return Promise.reject(result.message)
	}
}

export function get(url, params) {
	const token = getStore('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'GET',
			url: `${baseURL}/${url}`,
			data: params,
			header: { 'Authorization': token },
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export function post(url, params) {
	const token = getStore('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: `${baseURL}/${url}`,
			data: qs.stringify(params, { allowDots: true }),
			header: {
				'Authorization': token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export function postJson(url, params) {
	const token = getStore('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: `${baseURL}/${url}`,
			data: params,
			header: {
				'Authorization': token,
				'Content-Type': 'application/json',
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}