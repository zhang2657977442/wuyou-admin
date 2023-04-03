import type { FC } from 'react';
import { ProForm, ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../index.less';
import { getCompanyList } from '@/apis/company';
import { getPositionList } from '@/apis/position';

type OperationModalProps = {
  visible: boolean;
  current: JobType.Item | undefined;
  onDone: () => void;
  onSubmit: (values: JobType.Item) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<JobType.Item>
      visible={visible}
      title={current ? '编辑' : '添加'}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => dom,
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <ProFormSelect
        name="postId"
        label="岗位"
        rules={[{ required: true, message: '请选择岗位' }]}
        request={async () => {
          const res = await getPositionList({
            current: 1,
            pageSize: 999,
          });
          return res.data.list
            .filter((item) => item.pid)
            .map((item) => {
              return { label: item.name, value: item.id };
            });
        }}
        placeholder="请选择岗位"
      />
      <ProFormSelect
        name="companyId"
        label="所属公司"
        rules={[{ required: true, message: '请选择所属公司' }]}
        request={async () => {
          const res = await getCompanyList({
            current: 1,
            pageSize: 999,
          });
          return res.data.list.map((item) => {
            return { label: item.name, value: item.id };
          });
        }}
        placeholder="请选择所属公司"
      />
      <ProForm.Group>
        <ProFormSelect
          name="jobType"
          label="工作类型"
          rules={[{ required: true, message: '请选择工作类型' }]}
          options={[
            {
              label: '全职',
              value: '全职',
            },
            {
              label: '兼职',
              value: '兼职',
            },
          ]}
          placeholder="请选择工作类型"
        />
        <ProFormSelect
          name="minEducation"
          label="最低学历"
          rules={[{ required: true, message: '请选择最低学历' }]}
          options={[
            {
              label: '高中以下',
              value: '高中以下',
            },
            {
              label: '高中',
              value: '高中',
            },
            {
              label: '中专/技校',
              value: '中专/技校',
            },
            {
              label: '大专',
              value: '大专',
            },
            {
              label: '本科',
              value: '本科',
            },
            {
              label: '硕士',
              value: '硕士',
            },
            {
              label: '博士',
              value: '博士',
            },
          ]}
          placeholder="请选择最低学历"
        />
        <ProFormSelect
          name="expRequire"
          label="经验要求"
          rules={[{ required: true, message: '请选择经验要求' }]}
          options={[
            {
              label: '不限',
              value: '不限',
            },
            {
              label: '1年以内',
              value: '1年以内',
            },
            {
              label: '1-3年',
              value: '1-3年',
            },
            {
              label: '3-5年',
              value: '3-5年',
            },
            {
              label: '5-10年',
              value: '5-10年',
            },
            {
              label: '10年以上',
              value: '10年以上',
            },
          ]}
          placeholder="请选择经验要求"
        />
        <ProFormSelect
          name="salary"
          label="薪资范围"
          rules={[{ required: true, message: '请选择薪资范围' }]}
          options={[
            {
              label: '面议',
              value: '面议',
            },
            {
              label: '1-3K',
              value: '1-3K',
            },
            {
              label: '3-5K',
              value: '3-5K',
            },
            {
              label: '5-8K',
              value: '5-8K',
            },
            {
              label: '8-12K',
              value: '8-12K',
            },
            {
              label: '12-15K',
              value: '12-15K',
            },
            {
              label: '15-20K',
              value: '15-20K',
            },
            {
              label: '20K以上',
              value: '20K以上',
            },
          ]}
          placeholder="请选择薪资范围"
        />
      </ProForm.Group>
      <ProFormTextArea
        width="xl"
        rules={[{ required: true, message: '请输入技能要求' }]}
        label="技能要求"
        name="skill"
      />
    </ModalForm>
  );
};

export default TableForm;
