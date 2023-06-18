import { get, post, postJson } from '../axios.js'
export function updateById(params) {
	return postJson('/userAddress/updateById', params)
}
export function getAddress(params) {
	return get('/userAddress/getAddress', params)
}
export function updateDefaultById(params) {
	return post('/userAddress/updateDefaultById', params)
}
export function deleteById(params) {
	return post('/userAddress/deleteById', params)
}
export function getAddressById(params) {
	return get('/userAddress/getAddressById', params)
}