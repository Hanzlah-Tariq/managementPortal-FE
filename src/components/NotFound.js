import React from 'react';
import { Row, Col, Button } from 'antd';

import logo from '../assets/images/not-found.png';

const NotFound = () => {
  return (
    <div>
      <Row>
        <Col span={24} style={NotFound.styles.pageImage}>
          <img src={logo} alt="Logo" />
        </Col>
      </Row>
      <Row>
        <Col style={NotFound.styles.pageItem}>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = '/dashboard';
            }}
          >
            Back to Home
          </Button>
        </Col>
      </Row>
    </div>
  );
};

NotFound.styles = {
  pageItem: {
    textAlign: 'center',
    padding: 25,
  },
  pageImage: {
    marginTop: 50,
    marginBottom: 25,
    textAlign: 'center',
  },
};

NotFound.defaultProps = {};

NotFound.propTypes = {};

export default NotFound;
