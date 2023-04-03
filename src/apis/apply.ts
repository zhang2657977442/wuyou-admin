// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取浏览记录
export async function getApplyList(params: PageParams) {
  return request<BaseResponse<listData<ApplyType.Item>>>('/api/apply/getApplyList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除浏览记录
export async function deleteApply(id: string) {
  return request<BaseResponse<boolean>>(`/api/apply/deleteApply/${id}`, {
    method: 'DELETE',
  });
}
