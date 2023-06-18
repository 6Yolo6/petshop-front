import axios from 'axios'
import qs from 'qs'

const baseURL = 'http://localhost:8899/petshop'


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
axios.interceptors.request.use(
	config => {
		if (uni.getStorageSync('token')) {
			config.headers.token = uni.getStorageSync('token')
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)


export function get(url, params) {
	return axios({
		method: 'GET',
		url: `${baseURL}/${url}`,
		params: params,
	})
}

export function post(url, params) {
	return axios({
		method: 'POST',
		url: `${baseURL}/${url}`,
		data: qs.stringify(params, { allowDots: true }),
		header: { 'Content-Type': 'application/x-www-form-urlencoded', },
	})
}


export function postJson(url, params) {
	return axios({
		method: 'POST',
		url: `${baseURL}/${url}`,
		data: params,
		header: { 'Content-Type': 'application/json', },
	})
}