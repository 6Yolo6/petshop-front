import { get, post, postJson } from '../axios.js'
export function searchByKey(params) {
	return get('/search/searchByKey', params)
}
export function getUserSearchHistory(params) {
	return get('/search/getUserSearchHistory', params)
}
export function deleteUserSearchHistory(params) {
	return post('/search/deleteUserSearchHistory', params)
}
export function clearUserSearchHistory(params) {
	return post('/search/clearUserSearchHistory', params)
}