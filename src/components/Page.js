import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

class Page extends PureComponent {
  render() {
    const { breadcrumbTitle, breadcrumbLink, children } = this.props;

    return (
      <>
        <BreadcrumbsItem to={breadcrumbLink}>{breadcrumbTitle}</BreadcrumbsItem>
        {children}
      </>
    );
  }
}

Page.propTypes = {
  breadcrumbTitle: PropTypes.string.isRequired,
  breadcrumbLink: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Page.defaultProps = {
  children: <div />,
};

Page.styles = {
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box',
  minHeight: '100%',
};

export default Page;
