import {
	get,
	post,
	postJson
} from '../axios.js'
export function addFavor(params) {
	return postJson('/favor/add', params)
}
export function getAll(params) {
	return get('/favor/getAll', params)
}
export function deleteById(params) {
	return post('/favor/deleteById', params)
}