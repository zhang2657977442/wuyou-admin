// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取职位列表
export async function getJobList(params: PageParams) {
  return request<BaseResponse<listData<JobType.Item>>>('/api/job/getJobList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新职位信息
export async function updateJob(params: JobType.Item) {
  return request<BaseResponse<boolean>>('/api/job/updateJobInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建职位信息
export async function addJob(params: JobType.Item) {
  return request<BaseResponse<boolean>>('/api/job/addJob', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除职位信息
export async function deleteJob(id: string) {
  return request<BaseResponse<boolean>>(`/api/job/deleteJob/${id}`, {
    method: 'DELETE',
  });
}
