// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取简历列表
export async function getResumeList(params: PageParams) {
  return request<BaseResponse<listData<ResumeType.Item>>>('/api/resume/getList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新简历信息
export async function updateResume(params: ResumeType.Item) {
  return request<BaseResponse<boolean>>('/api/resume/updateResumeInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建简历信息
export async function addResume(params: ResumeType.Item) {
  return request<BaseResponse<boolean>>('/api/resume/addResume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除简历信息
export async function deleteResume(id: string) {
  return request<BaseResponse<boolean>>(`/api/resume/deleteResume/${id}`, {
    method: 'DELETE',
  });
}
