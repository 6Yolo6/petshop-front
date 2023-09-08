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