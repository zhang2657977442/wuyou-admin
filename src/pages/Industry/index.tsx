import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { getIndustryList, addIndustry, updateIndustry, deleteIndustry } from '@/apis/industry';
import TableForm from './components/TableForm';
import transData from '@/utils/transData';

const Account: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<IndustryType.Item | undefined>(undefined);

  const showEditModal = (item: IndustryType.Item) => {
    setVisible(true);
    setCurrent(item);
  };
  const handleDone = () => {
    setVisible(false);
    setCurrent(undefined);
  };

  const addItem = async (params: IndustryType.Item) => {
    const res = await addIndustry(params);
    if (res.code === 0) {
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
      handleDone();
    } else {
      message.error(res.message);
    }
  };

  const updateItem = async (params: IndustryType.Item) => {
    const res = await updateIndustry(params);
    if (res.code === 0) {
      message.success('操作成功');
      handleDone();
      actionRef.current?.reloadAndRest?.();
    } else {
      message.error(res.message);
    }
  };

  const deleteItem = async (id: string) => {
    const res = await deleteIndustry(id);
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

  const handleSubmit = (values: IndustryType.Item) => {
    console.log(values);
    // 用来区分新增、更新操作
    const method = current?.id ? 'update' : 'add';
    if (method === 'add') {
      addItem({
        ...values,
        pid: current?.pid ? current?.pid : undefined,
      });
    } else {
      updateItem({
        ...values,
        id: current?.id,
      });
    }
  };

  const columns: ProColumns<IndustryType.Item>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
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
        !record.pid || record.children ? (
          <a
            key="editable"
            onClick={() => {
              const item: any = {
                pid: record.id!,
              };
              setCurrent(item);
              setVisible(true);
            }}
          >
            新增子类
          </a>
        ) : null,
        <a
          key="editable"
          onClick={() => {
            showEditModal(record);
          }}
        >
          编辑
        </a>,
        !record.children?.length ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            key="delete"
            onClick={() => {
              handleRemove(record.id!);
            }}
          >
            删除
          </a>
        ) : null,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<IndustryType.Item>
        columns={columns}
        search={false}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getIndustryList({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: transData(res.data.list, 'id', 'pid', 'children'),
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
          pageSize: 999,
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
