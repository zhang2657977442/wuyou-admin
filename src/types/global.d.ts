// 分页参数
type PageParams = {
  keyword?: string;
  current?: number;
  pageSize?: number;
};

// 响应结果
type BaseResponse<T> = {
  code: number;
  data: T;
  message?: string;
};

//
type listData<T> = {
  list: T[];
  total: number;
};
