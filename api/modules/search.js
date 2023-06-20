import { get, post, postJson } from '../axios.js'
export function searchByKey(params) {
	return get('/search/searchByKey', params)
}