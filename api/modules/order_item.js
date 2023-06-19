import {
	get,
	post,
	postJson
} from '../axios.js'
export function getByOrderIds(params) {
	return get('/orderItem/getByOrderIds', params)
}

export function addItem(params) {
	return post('/orderItem/add', params)
}