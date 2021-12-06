import React from 'react';
import { Spin } from 'antd';

const AppLoad = () => {
  return (
    <div className="app-loading">
      <Spin
        tip="Authenticating User..."
        className="load-spinner"
        size="large"
      />
    </div>
  );
};

export default AppLoad;
