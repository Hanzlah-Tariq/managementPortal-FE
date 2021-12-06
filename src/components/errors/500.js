import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import storage from '../../common/storage';

export default function Error500() {
  return (
    <div className="center-block">
      <Result
        status="500"
        title="Internal Server Error"
        subTitle="Sorry, something went wrong."
        extra={(
          <Link to={storage.get('user') ? '/dashboard' : '/'}>
            <ArrowLeftOutlined />
            {' '}
            Back to Home
          </Link>
        )}
      />
    </div>
  );
}
