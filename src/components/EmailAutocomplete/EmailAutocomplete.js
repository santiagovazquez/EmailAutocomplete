import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EmailAutocomplete.css';
import EditableEmailTag from "./EditableEmailTag";
import AutocompleteOptionList from "./AutocompleteOptionList";
import { classnames } from "../../utils";

const EmailAutocomplete = ({ value, onChange, options, searchValue, onSearchChange, placeholder }) => {
  const ref = useRef(null);
  // editing position is the element which is currently under edition (input is being shown)
  const [ editingPos, setEditingPos ] = useState(0);
  const [ listOpen, setListOpen ] = useState(false);

  const addEmailOnEditingPosition = (email) => {
    let arrCopy = [...value];
    // repeated emails won't be added
    const included = value.includes(email);

    if (arrCopy.length === editingPos && email !== "" && !included) {
      arrCopy.push(email);
    } else if (email !== "" && !included) {
      arrCopy[editingPos] = email;
    } else if (email === "" && editingPos < arrCopy.length) {
      arrCopy.splice(editingPos, 1);
    } else {
      // any other case, we don't change the array to avoid triggering a re-render
      arrCopy = value;
    }

    // after adding the new email to the array, we clean up & update state vars
    onSearchChange("");
    onChange(arrCopy);
    setEditingPos(arrCopy.length);
  }

  // when search is not empty, we display the dropdown list
  useEffect(() => {
    if (searchValue !== "") {
      setListOpen(true);
    }
  }, [searchValue, options]);

  return (
    <div className="EmailAutocomplete-Container">
      <div
        className="EmailAutocomplete-TagsContainer"
        // Any click on empty space on the companent, will trigger an autofocus on the editing position
        onClick={() => { if (ref.current) ref.current.focus(); }}>
        {
          value.map((email, idx) => (
            <EditableEmailTag
              className="EmailAutocomplete-EmailTagContainer"
              key={`item-${email}`}
              value={email}
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              editMode={idx === editingPos}
              onEnterEditMode={() => {
                onSearchChange(email);
                setEditingPos(idx);
              }}
              onBlur={() => {
                addEmailOnEditingPosition(searchValue);
                setListOpen(false);
              }}
              onExitEditMode={() => {
                addEmailOnEditingPosition(searchValue);
                setListOpen(false);
              }}
              onDelete={(ev) => {
                ev.stopPropagation();
                let arrCopy = [...value];
                arrCopy.splice(idx, 1);
                onChange(arrCopy);
                setEditingPos(arrCopy.length);
              }}
            />)
          )
        }
        {
          editingPos === value.length && <EditableEmailTag
            className="EmailAutocomplete-EmailTagContainer"
            ref={ref}
            value={searchValue}
            placeholder={placeholder}
            onSearchChange={onSearchChange}
            searchValue={searchValue}
            editMode={true}
            onExitEditMode={() => {
              addEmailOnEditingPosition(searchValue);
              setListOpen(false);
            }}
            onBlur={() => {
              addEmailOnEditingPosition(searchValue);
              setListOpen(false);
            }}
            inputClassName={classnames("EmailInput", editingPos === 0 && "EmailInputShowPlaceholder")}
          />
        }
      </div>
      <AutocompleteOptionList
        onMouseDown={(email) => {
          if (email) addEmailOnEditingPosition(email);
          setListOpen(false);
        }}
        open={listOpen}
        options={options}/>
    </div>
  );
}

EmailAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
};

EmailAutocomplete.defaultProps = {
  placeholder: '',
  loading: false,
};

export default EmailAutocomplete;
