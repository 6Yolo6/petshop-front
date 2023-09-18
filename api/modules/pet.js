import {
	get,
	post,
	postJson
} from '../axios.js'
export function getByCate(params) {
	return get('/pet/getByCategory', params)
}
export function getPetById(params) {
	return get('/pet/getById', params)
}
export function addVisit(params) {
	return post('/pet/addVisit', params)
}