import { forwardRef, useEffect, useMemo } from 'react';
import './SearchInput.css';
import { classnames } from "../../utils";

const SearchInput = forwardRef(({ className, value, onChange, onKeyEvent, onBlur}, ref) => {
  // we change the width of the component via javascript on every value length change
  const size = useMemo(() => (value.length + 1) * 7.7, [value.length]);

  // we focus the component on rendering
  useEffect(() => {
    if (ref && ref.current) ref.current.focus();
  })

  return (
    <div className={classnames("SearchInputContainer", className)}>
      <input
        onKeyPress={(ev) => {
          if (ev.key === 'Enter' || ev.key === ',') {
            ev.preventDefault();
            ev.stopPropagation();
            onKeyEvent(ev);
          }
        }}
        onBlur={onBlur}
        style={{ width: size }}
        onChange={({ target: { value }}) => { onChange(value); }}
        value={value}
        ref={ref}
        className="SearchInput"/>
    </div>
  )
});

export default SearchInput;
