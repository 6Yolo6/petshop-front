import { get, post, postJson } from '../axios.js'
export function updateById(params) {
	return postJson('/userAddress/updateById', params)
}
export function getAddressByUserId(params) {
	return get('/userAddress/getAddressByUserId', params)
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