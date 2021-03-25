import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../icons/close-icon.svg';
import { classnames } from '../../utils';

const CloseIcon = ({ className }) => (
  <div className={classnames("Icon-Container", "Icon-Close", className)}>
    <img src={closeIcon} alt="close icon"/>
  </div>
);

CloseIcon.propTypes = {
  className: PropTypes.string,
};

CloseIcon.defaultProps = {
  className: '',
};

export default CloseIcon;
