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

// 更新福利信息
export async function updateIndustry(params: IndustryType.Item) {
  return request<BaseResponse<boolean>>('/api/industry/updateIndustry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建福利信息
export async function addIndustry(params: IndustryType.Item) {
  return request<BaseResponse<boolean>>('/api/industry/addIndustry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除福利信息
export async function deleteIndustry(id: string) {
  return request<BaseResponse<boolean>>(`/api/industry/deleteIndustry/${id}`, {
    method: 'DELETE',
  });
}
