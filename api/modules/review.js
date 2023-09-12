import {
	get,
	post,
	postJson
} from '../axios.js'
export function add(params) {
	return post('/review/add', params)
}
export function getByShopId(params) {
	return get('/review/getByShopId', params)
}