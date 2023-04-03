// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取岗位列表
export async function getPositionList(params: PageParams) {
  return request<BaseResponse<listData<PositionType.Item>>>('/api/position/getPositionList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新岗位信息
export async function updatePosition(params: PositionType.Item) {
  return request<BaseResponse<boolean>>('/api/position/updatePosition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 新建岗位信息
export async function addPosition(params: PositionType.Item) {
  return request<BaseResponse<boolean>>('/api/position/addPosition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 删除岗位信息
export async function deletePosition(id: string) {
  return request<BaseResponse<boolean>>(`/api/position/deletePosition/${id}`, {
    method: 'DELETE',
  });
}
