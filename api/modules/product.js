import {
	get,
	post,
	postJson
} from '../axios.js'
export function getByCategory(params) {
	return get('/product/getByCategory', params)
}
export function getByShop(params) {
	return get('/product/getByShop', params)
}
export function getProById(params) {
	return get('/product/getById', params)
}
export function getProOrPetByIds(params) {
	return get('/product/getProOrPetByIds', params)
}
export function getShopIds(params) {
	return get('/product/getShopIds', params)
}

export function modifyStock(params) {
	return post('/product/modifyStockByIds', params)
}

export function checkStock(params) {
	return get('/product/checkStock', params)
}
export function addVisit(params) {
	return post('/product/addVisit', params)
}