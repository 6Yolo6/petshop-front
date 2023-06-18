import {
	get,
	post,
	postJson
} from '../axios.js'
export function addFavor(params) {
	return postJson('/favor/add', params)
}