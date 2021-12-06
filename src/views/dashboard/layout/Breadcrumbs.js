import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbArea } from 'react-breadcrumbs-dynamic';

const Item = ({ to, ...props }) => (
  <li>
    <Link to={to}>{props.children}</Link>
  </li>
);

Item.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

function Breadcrumbs() {
  return (
    <div className="breadcrumbs">
      <BreadcrumbArea
        item={Item}
        container="ul"
        finalProps={{ active: true }}
        duplicateProps={{ to: 'href' }}
        containerProps={{ className: 'breadcrumb' }}
      />
    </div>
  );
}

export default Breadcrumbs;
