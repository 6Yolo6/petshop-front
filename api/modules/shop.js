import {
	get,
	post,
	postJson
} from '../axios.js'
export function getShopLocation(params) {
	return get('/shop/getById', params)
}

export function getList(params) {
	return get('/shop/getList', params)
}