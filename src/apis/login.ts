// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function getUserInfo() {
  return request<BaseResponse<LoginType.User>>('/api/user/getUserInfo', {
    method: 'GET',
  });
}

/** 登录接口 POST /api/login/account */
export async function login(params: LoginType.LoginParams) {
  return request<BaseResponse<LoginType.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
