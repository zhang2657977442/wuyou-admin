// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取公司列表
export async function getCompanyList(params: PageParams) {
  return request<BaseResponse<listData<CompanyType.Item>>>('/api/company/getCompanyList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新公司信息
export async function updateCompany(params: CompanyType.Item) {
  return request<BaseResponse<boolean>>('/api/company/updateCompanyInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建公司信息
export async function addCompany(params: CompanyType.Item) {
  return request<BaseResponse<boolean>>('/api/company/addCompanyInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除公司信息
export async function deleteCompany(id: string) {
  return request<BaseResponse<boolean>>(`/api/company/deleteCompany/${id}`, {
    method: 'DELETE',
  });
}
