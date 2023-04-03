// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

type Type = {
  type: string;
};

// 获取内容列表
export async function getCmsList(params: Type & PageParams) {
  return request<BaseResponse<listData<CmsType.Item>>>('/api/cms/getCmsList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新内容信息
export async function updateCms(params: CmsType.Item) {
  return request<BaseResponse<boolean>>('/api/cms/updateCms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建内容信息
export async function addCms(params: CmsType.Item) {
  return request<BaseResponse<boolean>>('/api/cms/addCms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除内容信息
export async function deleteCms(id: string) {
  return request<BaseResponse<boolean>>(`/api/cms/deleteCms/${id}`, {
    method: 'DELETE',
  });
}
