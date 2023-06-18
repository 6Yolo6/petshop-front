import {
	get,
	post,
	postJson
} from '../axios.js'
export function getByCategory(params) {
	return get('/product/getByCategory', params)
}

export function getById(params) {
	return get('/product/getById', params)
}
