import {
	get,
	post,
	postJson
} from '../axios.js'

// 用户注册
export function register(user) {
	return postJson('/user/register', user)
}

// 用户登录
export function login(user) {
	return postJson('/user/login', user)
}

// 用户退出
export function logout() {
	return post('/user/logout')
}

// 修改用户信息
export function updateUser(user) {
	return put('/user', user)
}

// 根据用户 ID 查询用户信息
export function getUserById(id) {
	return get(`/user/${id}`)
}

export function validate(params) {
	return get('/user/validate', params)
}

// 删除用户信息
export function deleteUserById(id) {
	return delete(`/user/${id}`)
}