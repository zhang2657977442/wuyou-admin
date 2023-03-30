// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取用户列表
export async function getUserList(params: PageParams) {
  return request<BaseResponse<listData<LoginType.User>>>('/api/user/getUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新用户信息
export async function updateUser(params: LoginType.User) {
  return request<BaseResponse<boolean>>('/api/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建用户信息
export async function addUser(params: LoginType.User) {
  return request<BaseResponse<boolean>>('/api/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除用户信息
export async function deleteUser(id: string) {
  return request<BaseResponse<boolean>>(`/api/user/deleteUser/${id}`, {
    method: 'DELETE',
  });
}
