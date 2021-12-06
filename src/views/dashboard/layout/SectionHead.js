import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { merge } from 'lodash';

class SectionHead extends PureComponent {
  render() {
    const {
      title, children, imagePath, headStyles, description,
    } = this.props;
    const { styles } = SectionHead;

    return (
      <div style={merge(styles.sectionHead, headStyles)}>
        <Row gutter={16}>
          <Col span={24} className="gutter-row">
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <p>{description}</p>
            <div className="padding-top-md padding-bottom-sm">{children}</div>
          </Col>
          <Col span={6}>
            <div style={styles.imageSection}>
              <img alt={title} src={imagePath} height={125} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

SectionHead.defaultProps = {
  imagePath: '',
  headStyles: {},
  description: '',
};

SectionHead.propTypes = {
  imagePath: PropTypes.string,
  headStyles: PropTypes.object,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

SectionHead.styles = {
  sectionHead: {
    background: '#fff',
    padding: '16px 32px 0',
    borderBottom: '1px solid #e8e8e8',
    height: '165px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  imageSection: {
    textAlign: 'right',
    marginTop: '-19px',
  },
};

export default SectionHead;
