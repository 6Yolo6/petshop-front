import {
	get,
	post,
	postJson
} from '../axios.js'
export function add(params) {
	return post('/cart/add', params)
}

export function getAll(params) {
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

export function deleteById(params) {
	return post('/cart/deleteById', params)
}