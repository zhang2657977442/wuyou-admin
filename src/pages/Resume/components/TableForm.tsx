import type { FC } from 'react';
import {
  ProForm,
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from '../index.less';
import { getUserList } from '@/apis/user';

type OperationModalProps = {
  visible: boolean;
  current: ResumeType.Item | undefined;
  onDone: () => void;
  onSubmit: (values: ResumeType.Item) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<ResumeType.Item>
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
      <ProFormText
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
        placeholder="请输入姓名"
      />
      <ProFormSelect
        name="userId"
        label="对应用户"
        rules={[{ required: true, message: '请选择对应用户' }]}
        request={async () => {
          const res = await getUserList({
            current: 1,
            pageSize: 999,
          });
          return res.data.list.map((item) => {
            return { label: item.username, value: item.id };
          });
        }}
        placeholder="请选择对应用户"
      />
      <ProForm.Group>
        <ProFormSelect
          name="gender"
          label="性别"
          rules={[{ required: true, message: '请选择性别' }]}
          options={[
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
            },
          ]}
          placeholder="请选择性别"
        />
        <ProFormSelect
          name="education"
          label="学历"
          rules={[{ required: true, message: '请选择学历' }]}
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
          placeholder="请选择学历"
        />
        <ProFormDatePicker
          name="birthday"
          label="出生日期"
          rules={[{ required: true, message: '请选择出生日期' }]}
          placeholder="请选择出生日期"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="experience"
          label="工作经验"
          rules={[{ required: true, message: '请选择工作经验' }]}
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
          placeholder="请选择工作经验"
        />
        <ProFormSelect
          name="salary"
          label="期望薪资"
          rules={[{ required: true, message: '请选择期望薪资' }]}
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
          placeholder="请选择期望薪资"
        />
        <ProFormSelect
          name="jobStatus"
          label="求职状态"
          rules={[{ required: true, message: '请选择求职状态' }]}
          options={[
            {
              label: '在职-暂不考虑',
              value: '在职-暂不考虑',
            },
            {
              label: '在职-考虑机会',
              value: '在职-考虑机会',
            },
            {
              label: '在职-月内到岗',
              value: '在职-月内到岗',
            },
            {
              label: '离职-随时到岗',
              value: '离职-随时到岗',
            },
          ]}
          placeholder="请选择求职状态"
        />
      </ProForm.Group>
      <ProFormTextArea
        width="xl"
        rules={[{ required: true, message: '请输入个人优势' }]}
        label="个人优势"
        name="skill"
      />
    </ModalForm>
  );
};

export default TableForm;
