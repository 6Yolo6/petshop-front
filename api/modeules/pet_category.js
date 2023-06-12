import { get, post, postJson } from '../axios.js'
export function getAllCate(params) {
	return get('/petCategory/getAllCate', params)
}