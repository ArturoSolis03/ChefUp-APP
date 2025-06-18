// src/components/shared/SearchBar.tsx

import { InputBase, Paper, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search recipe...', onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Paper component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', width: '100%', maxWidth: 600 }}>
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
