import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState('');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:5157/bfhl', parsedJson);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or API error.');
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    );
  };

  const handleFilterResponse = () => {
    if (response) {
      let filtered = [];
      if (selectedOptions.includes('Alphabets')) {
        filtered.push(...response.alphabets);
      }
      if (selectedOptions.includes('Numbers')) {
        filtered.push(...response.numbers);
      }
      if (selectedOptions.includes('Highest Lowercase Alphabet')) {
        filtered.push(...response.highestLowercaseAlphabet);
      }
      setFilteredResponse(filtered.join(', '));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Input:</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder='Enter JSON, e.g., {"data": ["M", "1", "334", "4", "B", "Z", "a"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <h2>Multi-Select Filter:</h2>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>
          <br />
          <button onClick={handleFilterResponse}>Filter Response</button>
          <h2>Filtered Response:</h2>
          <p>{filteredResponse}</p>
        </>
      )}
    </div>
  );
}

export default App;