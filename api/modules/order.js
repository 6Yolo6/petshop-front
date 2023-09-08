import {
	get,
	post,
	postJson
} from '../axios.js'
export function getOrder(params) {
	return get('/order/getByUserId', params)
}

export function addOrder(params) {
	return post('/order/add', params)
}