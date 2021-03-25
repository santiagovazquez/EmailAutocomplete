# EmailAutocomplete Example

This component emulates a classic input which receives a list of emails:

![example image](https://github.com/santiagovazquez/EmailAutocomplete/blob/main/docs/component-example.png?raw=true)

See a live demo [here](https://email-autocomplete.vercel.app).

### Basics

```
# runs the example app in dev mode. 
# available at http://localhost:3000
yarn start

# builds the app for prod to the `build` folder.
yarn build
```

### Usage example

```js

function SomeComponent() {
  // Initial state of the component
  const [emails, setEmails] = useState([]);
  // List of possible options for the dropdown
  const [options, setOptions] = useState([]);
  // current state of the search (could be used for filtering the option array)
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <EmailAutocomplete
      options={options}
      value={emails}
      onChange={setEmails}
      searchValue={searchTerm}
      onSearchChange={(newSearch) => {
        setSearchTerm(newSearch);
      }}
      placeholder="Enter recipients..."
    />
  );
}
```

### Potential Improvements
 
- Release the component as standalone
- Add meaningful tests
- Backspace should remove the previous element when current element empty 
- Ability to navigate with the keyboard thought the options of the dropdown 
- Rework inner components for more general purpose
- Integrate [Storybook](https://storybook.js.org/) so people can play around with the component
- Highlight search text on dropdown options
- Better feedback on duplicate entries
