// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取福利列表
export async function getWelfareList(params: PageParams) {
  return request<BaseResponse<listData<WelfareType.Item>>>('/api/welfare/getWelfareList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新福利信息
export async function updateWelfare(params: WelfareType.Item) {
  return request<BaseResponse<boolean>>('/api/welfare/updateWelfare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建福利信息
export async function addWelfare(params: WelfareType.Item) {
  return request<BaseResponse<boolean>>('/api/welfare/addWelfare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除福利信息
export async function deleteWelfare(id: string) {
  return request<BaseResponse<boolean>>(`/api/welfare/deleteWelfare/${id}`, {
    method: 'DELETE',
  });
}
