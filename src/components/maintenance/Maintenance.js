import React from 'react';
import renderHTML from 'react-render-html';

import classes from './Maintenance.scss';

const Maintenance = () => {
  return (
    <div className={classes.content}>
      <p>{renderHTML('<p>Site is under construction</p>')}</p>
    </div>
  );
};

export default Maintenance;
