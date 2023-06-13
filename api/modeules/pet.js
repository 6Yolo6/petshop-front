import { get, post, postJson } from '../axios.js'
export function getByCate(params) {
	return get('/pet/getByCategory', params)
}