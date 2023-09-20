import {
	get,
	post,
	postJson,
	uploadFile
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

// 用户修改头像
export function updateAvatar(file, params) {
	return uploadFile('/user/updateAvatar', file, params)
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

export function getByName(params) {
	return get('/user/getByName', params)
}

export function getId(params) {
	return get('/user/getId', params)
}