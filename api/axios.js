import axios from 'axios'
import qs from 'qs'


// const baseURL = 'http://localhost:8899/petshop'
// const baseURL = 'http://192.168.43.152:8899/petshop'

// const baseURL = 'http://10.22.155.237:8899/petshop'
const baseURL = 'http://47.115.231.72:8899/petshop'

function interceptors(response) {
	// response status = 200
	const result = response.data
	if (result.statusCode === 200) {
		return Promise.resolve(result)
	} else if (result.statusCode === 600) {
		// 页面跳转
		uni.navigateTo({
			url: '/'
		})
		return Promise.reject('need login!')
	} else if (result.statusCode === 400) {
		console.log("result", result)
		if (result.message == "Token无效，请重新登录") {
			uni.showToast({
				icon: 'error',
				title: "token过期请先登录"
			})
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		return Promise.reject(result.message)
	} else {
		return Promise.reject(result.message)
	}
}

export function get(url, params) {
	const token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'GET',
			url: `${baseURL}/${url}`,
			data: params,
			header: {
				'token': token
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

export function post(url, params) {
	const token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: `${baseURL}/${url}`,
			data: qs.stringify(params, {
				allowDots: true
			}),
			header: {
				'token': token,
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
	const token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: `${baseURL}/${url}`,
			data: params,
			header: {
				'token': token,
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

// function interceptors(response) {
// 	// response status = 200
// 	const result = response.data
// 	if (result.statusCode === 200) {
// 		return Promise.resolve(result)
// 	} else if (result.statusCode === 600) {
// 		// 页面跳转
// 		uni.navigateTo({
// 			url: '/'
// 		})
// 		return Promise.reject('need login!')
// 	} else if (result.statusCode === 400) {
// 		return Promise.reject(result.message)
// 	} else {
// 		return Promise.reject(result.message)
// 	}
// }

// axios.interceptors.request.use(
// 	config => {
// 		if (uni.getStorageSync('token')) {
// 			config.headers.token = uni.getStorageSync('token')
// 		}
// 		return config
// 	},
// 	error => {
// 		return Promise.reject(error)
// 	}
// )
// //响应拦截器
// axios.interceptors.response.use((success) => {
// 	if (success.status && success.status == 200) {}
// 	return success;
// }, (error) => {
// 	// console.log(error.response);
// 	if (error.response.status == 504 || error.response.status == 404) {
// 		Toast("服务器被吃了")
// 	} else if (error.response.status == 414) {
// 		if (uni.getStorageSync('token')) {
// 			uni.showToast({
// 				title: "token过期，请登录"
// 			})
// 			uni.navigateTo({
// 				url: '/pages/login/login'
// 			})
// 		}
// 	} else {
// 		if (error.response.message) {
// 			Toast(error.response.message)
// 		}
// 	}
// });


// export function get(url, params) {
// 	return axios({
// 		method: 'GET',
// 		url: `${baseURL}/${url}`,
// 		params: params,
// 	})
// }

// export function post(url, params) {
// 	return axios({
// 		method: 'POST',
// 		url: `${baseURL}/${url}`,
// 		data: qs.stringify(params, {
// 			allowDots: true
// 		}),
// 		header: {
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 	})
// }


// export function postJson(url, params) {
// 	return axios({
// 		method: 'POST',
// 		url: `${baseURL}/${url}`,
// 		data: params,
// 		header: {
// 			'Content-Type': 'application/json',
// 		},
// 	})
// }
export function uploadFile(url, file, onProgress) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url,
			filePath: file.path,
			name: 'file',
			formData: {}, // 可以携带其他表单数据
			header: {
				'Content-Type': 'multipart/form-data'
			},
			onProgressUpdate: onProgress, // 上传进度回调
			success: res => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					reject(new Error('文件上传失败'))
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}