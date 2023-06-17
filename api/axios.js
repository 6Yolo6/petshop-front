import axios from 'axios'
import qs from 'qs'

const baseURL = 'http://localhost:8899/petshop'

axios.interceptors.request.use(
	config => {
		if (uni.getStorageSync('token')) {
			config.headers.token = uni.getStorageSync('token');
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);


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
		data: qs.stringify(params, {
			allowDots: true
		}),
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
}


export function postJson(url, params) {
	return axios({
		method: 'POST',
		url: `${baseURL}/${url}`,
		data: params,
		header: {
			'Content-Type': 'application/json',
		},
	})
}