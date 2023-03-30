import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            欢迎使用 人才直聘后台管理系统
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: '24px',
              marginTop: 16,
              marginBottom: 32,
              width: '80%',
            }}
          >
            “人才直聘”是在全球范围内首创互联网“直聘”模式的在线招聘产品总服务用户数超过1亿，致力于用科技解决职业领域问题。人才直聘产品的核心是“直聊+精准匹配”通过将在线聊天功能引入招聘场景，让应聘者和用人方直接沟通，从而跳过传统的冗长应聘环节，提升沟通效率。同时，人才直聘采用推荐作为产品的技术选型，应用人工智能、大数据等前沿技术，提高雇主与人才的匹配精准度，缩短求职招聘时间，从而提升求职招聘效率。
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
           />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
