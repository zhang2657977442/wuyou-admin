import type { FC } from 'react';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../index.less';

type OperationModalProps = {
  visible: boolean;
  current: CmsType.Item | undefined;
  onDone: () => void;
  onSubmit: (values: CmsType.Item) => void;
};

const TableForm: FC<OperationModalProps> = (props) => {
  const { visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<CmsType.Item>
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
      <ProFormTextArea
        width="xl"
        rules={[{ required: true, message: '请输入内容详情' }]}
        label="内容详情"
        name="text"
      />
    </ModalForm>
  );
};

export default TableForm;
