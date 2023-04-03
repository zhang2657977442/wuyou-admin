import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Modal, message } from 'antd';
import { getUserList, deleteUser, addUser, updateUser } from '@/apis/user';
import TableForm from './components/TableForm';

const Account: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<LoginType.User | undefined>(undefined);

  const showEditModal = (item: LoginType.User) => {
    setVisible(true);
    setCurrent(item);
  };
  const handleDone = () => {
    setVisible(false);
    setCurrent(undefined);
  };

  const addItem = async (params: LoginType.User) => {
    const res = await addUser(params);
    if (res.code === 0) {
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
      handleDone();
    } else {
      message.error(res.message);
    }
  };

  const updateItem = async (params: LoginType.User) => {
    const res = await updateUser(params);
    if (res.code === 0) {
      message.success('操作成功');
      handleDone();
      actionRef.current?.reloadAndRest?.();
    } else {
      message.error(res.message);
    }
  };

  const deleteItem = async (id: string) => {
    const res = await deleteUser(id);
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

  const handleSubmit = (values: LoginType.User) => {
    console.log(values);
    // 用来区分新增、更新操作
    const method = current?.id ? 'update' : 'add';
    if (method === 'add') {
      addItem(values);
    } else {
      updateItem({
        ...values,
        id: current?.id,
      });
    }
  };

  const columns: ProColumns<LoginType.User>[] = [
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
      title: '头像',
      dataIndex: 'avatar',
      key: 'image',
      valueType: 'image',
    },
    {
      title: '电话号码',
      dataIndex: 'mobile',
    },
    {
      title: '角色',
      dataIndex: 'role',
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          <Tag
            color={record.role === '管理员' ? 'green' : record.role === '求职者' ? 'blue' : 'gold'}
            key={record.role}
          >
            {record.role}
          </Tag>
        </Space>
      ),
    },

    {
      title: '注册时间',
      dataIndex: 'registerDate',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          key="editable"
          onClick={() => {
            showEditModal(record);
          }}
        >
          编辑
        </a>,
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
      <ProTable<LoginType.User>
        columns={columns}
        search={false}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getUserList({
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
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <TableForm visible={visible} current={current} onSubmit={handleSubmit} onDone={handleDone} />
    </PageContainer>
  );
};
export default Account;
