import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function Error404() {
  return (
    <div className="center-block">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Link to="/">
            <ArrowLeftOutlined />
            {' '}
            Back to Home
          </Link>
        )}
      />
    </div>
  );
}
