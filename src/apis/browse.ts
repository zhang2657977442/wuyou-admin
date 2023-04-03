// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取浏览记录
export async function getBrowseList(params: PageParams) {
  return request<BaseResponse<listData<BrowseType.Item>>>('/api/browse/getBrowseList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除浏览记录
export async function deleteBrowse(id: string) {
  return request<BaseResponse<boolean>>(`/api/browse/deleteBrowse/${id}`, {
    method: 'DELETE',
  });
}
