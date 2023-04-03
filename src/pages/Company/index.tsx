import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import moment from 'moment';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, message, Space, Tag } from 'antd';
import { getCompanyList, updateCompany, addCompany, deleteCompany } from '@/apis/company';
import TableForm from './components/TableForm';

const Company: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<CompanyType.Item | undefined>(undefined);

  const showEditModal = (item: CompanyType.Item) => {
    item.workTime = item.workTime.split('-');
    item.workTime[0] = moment(item.workTime[0], 'HH:mm:ss');
    item.workTime[1] = moment(item.workTime[1], 'HH:mm:ss');
    setCurrent(item);
    setVisible(true);
  };
  const handleDone = () => {
    actionRef.current?.reloadAndRest?.();
    setCurrent(undefined);
    setVisible(false);
  };

  const addItem = async (params: CompanyType.Item) => {
    const res = await addCompany(params);
    if (res.code === 0) {
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
      handleDone();
    } else {
      message.error(res.message);
    }
  };

  const updateItem = async (params: CompanyType.Item) => {
    const res = await updateCompany(params);
    if (res.code === 0) {
      message.success('操作成功');
      handleDone();
      actionRef.current?.reloadAndRest?.();
    } else {
      message.error(res.message);
    }
  };

  const deleteItem = async (id: string) => {
    const res = await deleteCompany(id);
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

  const handleSubmit = (values: CompanyType.Item) => {
    values.workTime = values.workTime.join('-');
    // 用来区分新增、更新操作
    const method = current?.id ? 'update' : 'add';
    if (method === 'add') {
      addItem(values);
    } else {
      updateItem({
        id: current?.id,
        ...values,
      });
    }
  };

  const columns: ProColumns<CompanyType.Item>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: '公司简称',
      dataIndex: 'name',
    },
    {
      title: '公司全称',
      dataIndex: 'fullName',
    },
    {
      title: '所属行业',
      dataIndex: 'industryName',
    },
    {
      title: '公司性质',
      dataIndex: 'nature',
    },
    {
      title: '公司规模',
      dataIndex: 'staffSize',
    },
    {
      title: '公司简介',
      dataIndex: 'introduce',
      ellipsis: true,
    },
    {
      title: '工作时间',
      dataIndex: 'workTime',
    },
    {
      title: '休息时间',
      dataIndex: 'restTime',
    },
    {
      title: '加班情况',
      dataIndex: 'workOvertime',
    },
    {
      title: '地址详情',
      dataIndex: 'address',
    },
    {
      title: '审核状态',
      dataIndex: 'enableStatus',
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          <Tag
            color={
              record.enableStatus === null ? 'blue' : record.enableStatus === true ? 'green' : 'red'
            }
          >
            {record.enableStatus === null
              ? '待审核'
              : record.enableStatus === true
              ? '审核通过'
              : '审核失败'}
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
        record.enableStatus === null ? (
          <TableDropdown
            key="actionGroup"
            onSelect={(key) => {
              if (key === 'success') {
                updateItem({
                  id: record.id,
                  enableStatus: true,
                });
              } else {
                updateItem({
                  id: record.id,
                  enableStatus: false,
                });
              }
            }}
            menus={[
              { key: 'success', name: '通过' },
              { key: 'fial', name: '拒绝' },
            ]}
          />
        ) : null,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<CompanyType.Item>
        columns={columns}
        params={{ current: 1, pageSize: 10 }}
        actionRef={actionRef}
        search={false}
        cardBordered
        request={async (params) => {
          const res = await getCompanyList({
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
export default Company;
