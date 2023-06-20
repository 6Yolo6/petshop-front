import {
	get,
	post,
	postJson
} from '../axios.js'
export function addFavor(params) {
	return postJson('/favor/add', params)
}
export function getFavor(params) {
	return get('/favor/getAll', params)
}
export function deleteById(params) {
	return post('/favor/deleteById', params)
}
export function findByPetId(params) {
	return get('/favor/findByPetId', params)
}