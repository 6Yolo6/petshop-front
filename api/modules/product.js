import {
	get,
	post,
	postJson
} from '../axios.js'
export function getByCategory(params) {
	return get('/product/getByCategory', params)
}

export function getProById(params) {
	return get('/product/getById', params)
}
export function getShopIds(params) {
	return get('/product/getShopIds', params)
}

export function modifyStock(params) {
	return get('/product/modifyStockByIds', params)
}