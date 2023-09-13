import {
	get,
	post,
	postJson
} from '../axios.js'
export function getDetail(params) {
	return get('/orderItem/getDetail', params)
}

export function addItem(params) {
	return post('/orderItem/add', params)
}
export function updateDetail(params) {
	return post('/orderItem/update', params)
}
export function refundDetail(params) {
	return post('/orderItem/refund', params)
}
export function applyRefund(params) {
	return post('/orderItem/applyRefund', params)
}