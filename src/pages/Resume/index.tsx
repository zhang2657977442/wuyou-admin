import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { getResumeList, deleteResume, addResume, updateResume } from '@/apis/resume';
import TableForm from './components/TableForm';

const Account: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<ResumeType.Item | undefined>(undefined);

  const showEditModal = (item: ResumeType.Item) => {
    setVisible(true);
    setCurrent(item);
  };
  const handleDone = () => {
    setVisible(false);
    setCurrent(undefined);
  };

  const addItem = async (params: ResumeType.Item) => {
    const res = await addResume(params);
    if (res.code === 0) {
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
      handleDone();
    } else {
      message.error(res.message);
    }
  };

  const updateItem = async (params: ResumeType.Item) => {
    const res = await updateResume(params);
    if (res.code === 0) {
      message.success('操作成功');
      handleDone();
      actionRef.current?.reloadAndRest?.();
    } else {
      message.error(res.message);
    }
  };

  const deleteItem = async (id: string) => {
    const res = await deleteResume(id);
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

  const handleSubmit = (values: ResumeType.Item) => {
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

  const columns: ProColumns<ResumeType.Item>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
    },
    {
      title: '学历',
      dataIndex: 'education',
    },
    {
      title: '工作经验',
      dataIndex: 'experience',
    },
    {
      title: '期望薪资',
      dataIndex: 'salary',
    },
    {
      title: '求职状态',
      dataIndex: 'jobStatus',
    },
    {
      title: '个人优势',
      dataIndex: 'skill',
      ellipsis: true,
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
      <ProTable<ResumeType.Item>
        columns={columns}
        search={false}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getResumeList({
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
