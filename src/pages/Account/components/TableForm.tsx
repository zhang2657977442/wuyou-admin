import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import styles from '../index.less';

type OperationModalProps = {
  visible: boolean;
  current: LoginType.User |　undefined
  onDone: () => void;
  onSubmit: (values: LoginType.User) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<LoginType.User>
      visible={visible}
      title={current ? '编辑' : '添加'}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    > 
          <ProFormText
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
            placeholder="请输入用户名"
          />
          <ProFormText
            name="avatar"
            label="头像地址"
            rules={[{ required: true, message: '请输入头像地址' }]}
            placeholder="请输入头像地址"
          />
          <ProFormText
            name="mobile"
            label="电话号码"
            rules={[{ required: true, message: '请输入电话号码' }]}
            placeholder="请输入电话号码"
          />
          <ProFormSelect
            name="role"
            label="用户角色"
            rules={[{ required: true, message: '请选择用户角色' }]}
            options={[
              {
                label: '求职者',
                value: '求职者',
              },
              {
                label: '招聘者',
                value: '招聘者',
              },
              {
                label: '管理员',
                value: '管理员',
              },
            ]}
            placeholder="请选择用户角色"
          />
    </ModalForm>
  );
};

export default TableForm;
