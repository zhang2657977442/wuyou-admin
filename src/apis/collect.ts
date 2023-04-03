// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取浏览记录
export async function getCollectList(params: PageParams) {
  return request<BaseResponse<listData<ApplyType.Item>>>('/api/collect/getCollectList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除浏览记录
export async function deleteCollect(id: string) {
  return request<BaseResponse<boolean>>(`/api/collect/deleteCollect/${id}`, {
    method: 'DELETE',
  });
}
