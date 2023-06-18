import {
	get,
	post,
	postJson
} from '../axios.js'
export function getOrder(params) {
	return get('/order/getByStatus', params)
}

export function add(params) {
	return get('/order/add', params)
}