import {
	get,
	post,
	postJson
} from '../axios.js'
export function add(params) {
	return get('/cart/save', params)
}