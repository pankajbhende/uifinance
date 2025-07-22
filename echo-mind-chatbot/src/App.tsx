import React, { useState } from 'react';
import { Button, Typography, TextField, Checkbox, FormControlLabel, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchTaxInfo, AskRequest, AskResponse } from './api';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const App: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<AskRequest>({
    age: 30,
    is_minority: true,
    salary: 7000,
    question: t('taxQuestion'),
  });
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'age' || name === 'salary' ? Number(value) : value,
    }));
  };

  const handleApiCall = async () => {
    try {
      const data: AskResponse = await fetchTaxInfo(formData);
      setResponse(data.answer);
      setError(null);
    } catch (err) {
      setError('Failed to fetch response');
      setResponse(null);
    }
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        Financial Chatbot
      </Typography>
      <TextField
        label={t('age')}
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="is_minority"
            checked={formData.is_minority}
            onChange={handleInputChange}
          />
        }
        label={t('isMinority')}
      />
      <TextField
        label={t('salary')}
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('taxQuestion')}
        name="question"
        value={formData.question}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleApiCall} sx={{ mt: 2 }}>
        {t('submit')}
      </Button>
      {response && (
        <Typography mt={2} color="success.main">
          Response: {response}
        </Typography>
      )}
      {error && (
        <Typography mt={2} color="error">
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default App;
