import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from "../../utils/hooks";
import { classnames } from "../../utils";
import "./AutocompleteOptionList.css";

const AutocompleteOptionList = ({ onMouseDown, options, open }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => { onMouseDown(null); });

  return (
    <div ref={ref} className={classnames("AutocompleteOptionList", open && "AutocompleteOptionListOpen")}>
      <ul className="EmailList">
        {
          options.map((o) => (
            <li key={`list-item-${o}`} onMouseDown={() => { onMouseDown(o); }}>{o}</li>
          ))
        }
      </ul>
    </div>
  )
}

AutocompleteOptionList.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
};

export default AutocompleteOptionList;
