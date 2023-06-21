import {
	get,
	post,
	postJson
} from '../axios.js'
export function getShopLocation(params) {
	return get('/shop/getById', params)
}