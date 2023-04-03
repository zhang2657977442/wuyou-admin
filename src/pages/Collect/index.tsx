import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space, Tag, Modal, message } from 'antd';
import { getCollectList, deleteCollect } from '@/apis/collect';

const Account: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const deleteItem = async (id: string) => {
    const res = await deleteCollect(id);
    if (res.code === 0) {
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
    } else {
      message.error(res.message);
    }
  };

  const handleRemove = (id: string) => {
    Modal.confirm({
      title: '删除记录',
      content: '确定删除该记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(id),
    });
  };

  const columns: ProColumns<CollectType.Item>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '岗位/简历',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          <Tag color={record.type === '收藏职位' ? 'green' : 'blue'} key={record.type}>
            {record.type}
          </Tag>
        </Space>
      ),
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          target="_blank"
          rel="noopener noreferrer"
          key="delete"
          onClick={() => {
            handleRemove(record.id!);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<CollectType.Item>
        columns={columns}
        search={false}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getCollectList({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res.data.list,
            success: true,
            total: res.data.total,
          };
        }}
        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
      />
    </PageContainer>
  );
};
export default Account;
