import {
	get,
	post,
	postJson
} from '../axios.js'
export function add(params) {
	return post('/cart/add', params)
}

export function getAllCart(params) {
	return get('/cart/getAll', params)
}

export function sub(params) {
	return post('/cart/sub', params)
}

export function update(params) {
	return post('/cart/update', params)
}
export function updateAll(params) {
	return post('/cart/updateAll', params)
}

export function deleteByIds(params) {
	return post('/cart/deleteByIds', params)
}