import React, { forwardRef, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { classnames, validateEmail } from "../../utils";
import SearchInput from "./SearchInput";
import Tag from "../Tag";
import "./EditableEmailTag.css";

const EditableEmailTag = forwardRef((props, forwardedRef) => {
  const {
    editMode,
    value,
    onDelete,
    searchValue,
    onSearchChange,
    onEnterEditMode,
    onExitEditMode,
    onBlur,
    className,
    inputClassName,
    placeholder,
  } = props;
  const newRef = useRef(null);
  const ref = forwardedRef || newRef;
  const error = useMemo(() => !validateEmail(value), [value]);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={classnames("EditableEmailTagContainer", className)}
      // to avoid calling the handler that triggers the focus on the search field
      onClick={(ev) => { ev.stopPropagation() }}>
      {
        editMode && <SearchInput
          ref={ref}
          placeholder={placeholder}
          inputClassName={inputClassName}
          onKeyEvent={onExitEditMode}
          onBlur={onBlur}
          value={searchValue}
          onChange={onSearchChange}/>
      }
      {
        !editMode && error && <Tag
          onClick={(ev) => {
            ev.stopPropagation();
            onEnterEditMode();
          }}
          variant="error">{value}</Tag>
      }
      {
        !editMode && !error &&  <Tag
          onIconClick={onDelete}
          // when hovering, we show the delete button (changing the status of the tag)
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false); }}
          variant={classnames(hover ? "default" : "text")}>{value}</Tag>
      }
    </div>

  );
});

EditableEmailTag.propTypes = {
  editMode: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onEnterEditMode: PropTypes.func,
  onExitEditMode: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

EditableEmailTag.defaultProps = {
  // don't force the user to pass a fn, pass a dummy function to avoid unnecessary checking
  onEnterEditMode: () => {},
  onDelete: () => {},
  inputClassName: "",
  placeholder: "",
}

export default EditableEmailTag;
