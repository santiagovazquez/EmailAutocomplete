import { forwardRef, useMemo, useEffect } from 'react';
import PropTypes from "prop-types";
import './SearchInput.css';
import { classnames } from "../../utils";

const SearchInput = forwardRef(({ className, inputClassName, value, onChange, onKeyEvent, onBlur, placeholder }, ref) => {
  // we change the width of the component via javascript on every value length change
  const size = useMemo(() => (value.length + 1) * 7.7, [value.length]);

  useEffect(() => {
    ref.current && ref.current.focus();
  });

  return (
    <div className={classnames("SearchInputContainer", className)}>
      <input
        placeholder={placeholder}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter' || ev.key === ',') {
            ev.preventDefault();
            ev.stopPropagation();
            onKeyEvent(ev);
          }
        }}
        onBlur={onBlur}
        style={{ minWidth: size }}
        onChange={({ target: { value }}) => { onChange(value); }}
        value={value}
        ref={ref}
        className={classnames("SearchInput", inputClassName)}
      />
    </div>
  );
})

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyEvent: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
};

SearchInput.defaultProps = {
  className: "",
  inputClassName: "",
};

export default SearchInput;
