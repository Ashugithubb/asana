'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  max: 10,
  ttl: 1000 * 60 * 5,
});


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    if (cache.has(query)) {
      console.log('Loaded from cache');
      setResults(cache.get(query));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`/api/search?q=${query}`);
      cache.set(query, res.data);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Search with LRU Cache</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {results.map((item, idx) => (
          <li key={idx} style={{ padding: '0.25rem 0' }}>
            {typeof item === 'string' ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
