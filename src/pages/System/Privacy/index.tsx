import { message } from 'antd';
import { useState } from 'react';
import { PageContainer, ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { getCmsList, updateCms } from '@/apis/cms';
import sleep from '@/utils/sleep';

const updateItem = async (params: CmsType.Item) => {
  const res = await updateCms(params);
  if (res.code === 0) {
    message.success('操作成功');
  } else {
    message.error(res.message);
  }
};

export default () => {
  const [info, setInfo] = useState<CmsType.Item | undefined>(undefined);
  return (
    <PageContainer>
      <ProForm<CmsType.Item>
        submitter={{
          // 配置按钮文本
          searchConfig: {
            resetText: '重置',
            submitText: '保存',
          },
        }}
        onFinish={async (values) => {
          await sleep(2000);
          updateItem({
            ...values,
            id: info?.id,
          });
        }}
        request={async () => {
          const res = await getCmsList({
            current: 1,
            pageSize: 1,
            type: '1',
          });
          setInfo(res.data.list[0]);
          return {
            ...res.data.list[0],
          };
        }}
      >
        <ProFormTextArea
          width="xl"
          fieldProps={{
            autoSize: { minRows: 15 },
          }}
          rules={[{ required: true, message: '请输入内容详情' }]}
          label="内容详情"
          name="text"
        />
      </ProForm>
    </PageContainer>
  );
};
