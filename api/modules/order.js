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

export function cancelOrder(params) {
	return post('/order/cancel', params)
}
export function refundOrder(params) {
	return post('/order/refund', params)
}