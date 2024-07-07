"use client";

import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-red-600 shadow-md shadow-red-500/50 rounded-md hover:bg-red-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
