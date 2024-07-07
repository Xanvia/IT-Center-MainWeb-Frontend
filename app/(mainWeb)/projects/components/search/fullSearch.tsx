"use client";

import { useState } from 'react';
import SearchBar from './searchBar';

interface SearchResult {
  name: string;
}

const Page: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-end">
        <SearchBar onSearch={handleSearch} />
      </div>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
