import {
	get,
	post,
	postJson
} from '../axios.js'
export function getAllCate(params) {
	return get('/productCategory/getAllCate', params)
}
