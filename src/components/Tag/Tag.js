import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';
import { classnames } from '../../utils';
import { CloseIcon, WarningIcon } from '../Icons';

const getCssClassForVariant = (variant) => {
  const cssMap = {
    default: "TagDefault",
    error: "TagError",
    text: "TagText"
  };
  return cssMap[variant] || "TagDefault";
};

const getIconForVariant = (variant) => {
  const iconMap = {
    error: <WarningIcon/>,
    default: <CloseIcon/>,
  };
  return iconMap[variant] || null;
}


const Tag = ({ children, onIconClick, variant, className, ...otherProps }) => {
  const cssClass = getCssClassForVariant(variant);
  const icon = getIconForVariant(variant);

  return (
    <div className={classnames("Tag-Container", cssClass, className)} {...otherProps}>
      {children}
      <div className={classnames("Tag-Icon-Container", onIconClick && "Tag-Icon-Clickable")} onClick={onIconClick}>{icon}</div>
    </div>
  );
}

Tag.propTypes = {
  variant: PropTypes.oneOf(['text', 'default', 'error']),
  onIconClick: PropTypes.func,
};

Tag.defaultProps = {
  variant: 'text',
};

export default Tag;
