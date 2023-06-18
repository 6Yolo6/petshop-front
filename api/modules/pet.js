import { get, post, postJson } from '../axios.js'
export function getByCate(params) {
	return get('/pet/getByCategory', params)
}
export function getById(params) {
	return get('/pet/getById', params)
}