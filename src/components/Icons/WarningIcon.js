import React from 'react';
import PropTypes from 'prop-types';
import exclamationIcon from '../../icons/exclamation-icon.svg';
import { classnames } from '../../utils';

const WarningIcon = ({ className }) => (
  <div className={classnames("Icon-Container", className)}>
    <div className="Icon-Warning-Icon">
      <img src={exclamationIcon} alt="warning icon"/>
    </div>
  </div>
);

WarningIcon.propTypes = {
  className: PropTypes.string,
};

WarningIcon.defaultProps = {
  className: '',
};

export default WarningIcon;
