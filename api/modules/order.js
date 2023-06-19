import {
	get,
	post,
	postJson
} from '../axios.js'
export function getOrder(params) {
	return get('/order/getByStatus', params)
}

export function addOrder(params) {
	return post('/order/add', params)
}