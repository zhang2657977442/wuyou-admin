import type { FC } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import styles from '../index.less';

type OperationModalProps = {
  visible: boolean;
  current: IndustryType.Item | undefined;
  onDone: () => void;
  onSubmit: (values: IndustryType.Item) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<IndustryType.Item>
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
        label="行业名称"
        rules={[{ required: true, message: '请输入行业名称' }]}
        placeholder="请输入行业名称"
      />
    </ModalForm>
  );
};

export default TableForm;
