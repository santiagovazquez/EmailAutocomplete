import { useState, useEffect } from 'react';
import './App.css';
import EmailAutocomplete from '../src/components/EmailAutocomplete';
import * as api from './api';

function App() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    api.getEmailList(searchTerm, 100)
      .then(opts => {
        setOptions(opts);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="App">
      <header className="App-header">
        <EmailAutocomplete
          loading={loading}
          options={options}
          value={emails}
          onChange={setEmails}
          searchValue={searchTerm}
          onSearchChange={(newSearch) => {
            setSearchTerm(newSearch);
          }}
          placeholder="Enter recipients..."
        />
      </header>
    </div>
  );
}

export default App;
