import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { getJobList } from '@/apis/job';

const columns: ProColumns<JobType.Item>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '职位名称',
    dataIndex: 'postName',
  },
  {
    title: '职位类别',
    dataIndex: 'postCategory',
  },
  {
    title: '工作类型',
    dataIndex: 'jobType',
  },
  {
    title: '经验要求',
    dataIndex: 'expRequire',
  },
  {
    title: '最低学历',
    dataIndex: 'minEducation',
  },
  {
    title: '薪资范围',
    dataIndex: 'salary',
  },
  {
    title: '技能要求',
    dataIndex: 'skill',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  },
];

const Job: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<JobType.Item>
        params={{ pageSize: 10, current: 1 }}
        columns={columns}
        search={false}
        cardBordered
        request={async (params: { pageSize: number; current: number }) => {
          const res = await getJobList({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res.data.list,
            success: true,
            total: res.data.total,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
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
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
export default Job;
