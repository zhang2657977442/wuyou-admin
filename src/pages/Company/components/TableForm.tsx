import type { FC } from 'react';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import styles from '../index.less';
import { getIndustryList } from '@/apis/industry';

type OperationModalProps = {
  visible: boolean;
  current: CompanyType.Item | undefined;
  onDone: () => void;
  onSubmit: (values: CompanyType.Item) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<CompanyType.Item>
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
        label="公司简称"
        rules={[{ required: true, message: '请输入公司简称' }]}
        placeholder="请输入公司简称"
      />
      <ProFormText
        name="fullName"
        label="公司全称"
        rules={[{ required: true, message: '请输入公司全称' }]}
        placeholder="请输入公司全称"
      />
      <ProFormText
        name="address"
        label="地址详情"
        rules={[{ required: true, message: '请输入地址详情' }]}
        placeholder="请输入地址详情"
      />
      <ProForm.Group>
        <ProFormSelect
          name="nature"
          label="公司性质"
          rules={[{ required: true, message: '请选择公司性质' }]}
          options={[
            {
              label: '私营/民营企业',
              value: '私营/民营企业',
            },
            {
              label: '国有企业',
              value: '国有企业',
            },
            {
              label: '合资企业',
              value: '合资企业',
            },
            {
              label: '其他',
              value: '其他',
            },
          ]}
          placeholder="请选择公司性质"
        />
        <ProFormSelect
          name="staffSize"
          label="公司规模"
          rules={[{ required: true, message: '请选择公司规模' }]}
          options={[
            {
              label: '0-20人',
              value: '0-20人',
            },
            {
              label: '20-99人',
              value: '20-99人',
            },
            {
              label: '100-499人',
              value: '100-499人',
            },
            {
              label: '500-999人',
              value: '500-999人',
            },
            {
              label: '1000-9999人',
              value: '1000-9999人',
            },
            {
              label: '10000人以上',
              value: '10000人以上',
            },
          ]}
          placeholder="请选择公司规模"
        />
        <ProFormSelect
          name="workOvertime"
          label="加班情况"
          rules={[{ required: true, message: '请选择加班情况' }]}
          options={[
            {
              label: '不加班',
              value: '不加班',
            },
            {
              label: '偶尔加班',
              value: '偶尔加班',
            },
            {
              label: '弹性工作',
              value: '弹性工作',
            },
          ]}
          placeholder="请选择加班情况"
        />
        <ProFormSelect
          name="restTime"
          label="休息时间"
          rules={[{ required: true, message: '请选择休息时间' }]}
          options={[
            {
              label: '双休',
              value: '双休',
            },
            {
              label: '单休',
              value: '单休',
            },
            {
              label: '大小周',
              value: '大小周',
            },
            {
              label: '排班轮休',
              value: '排班轮休',
            },
          ]}
          placeholder="请选择休息时间"
        />
        <ProFormSelect
          name="industryId"
          label="所属行业"
          rules={[{ required: true, message: '请选择所属行业' }]}
          request={async () => {
            const res = await getIndustryList({
              current: 1,
              pageSize: 999,
            });
            return res.data.list.map((item) => {
              return { label: item.name, value: item.id };
            });
          }}
          placeholder="请选择所属行业"
        />
        <ProFormTimePicker.RangePicker
          label="工作时间"
          rules={[{ required: true, message: '请选择工作时间' }]}
          name="workTime"
        />
      </ProForm.Group>
      <ProFormTextArea
        width="xl"
        rules={[{ required: true, message: '请输入公司简介' }]}
        label="公司简介"
        name="introduce"
      />
    </ModalForm>
  );
};

export default TableForm;
