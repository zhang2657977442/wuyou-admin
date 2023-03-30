// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取行业列表
export async function getIndustryList(params: PageParams) {
  return request<BaseResponse<listData<IndustryType.Item>>>('/api/industry/getIndustryList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新行业信息
export async function updateRule() {
  return request<IndustryType.Item>('/api/rule', {
    method: 'PUT',
  });
}

// 新建行业信息
export async function addRule() {
  return request<IndustryType.Item>('/api/rule', {
    method: 'POST',
  });
}

// 删除行业信息
export async function removeRule() {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
  });
}
