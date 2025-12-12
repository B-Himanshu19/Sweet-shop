import React, { useState, useEffect } from 'react';
import { Sweet, sweetsAPI } from '../services/api';
import SweetCard from './SweetCard';
import SearchAndFilters from './SearchAndFilters';

const Dashboard: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setFilteredSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: number) => {
    try {
      await sweetsAPI.purchase(id, 1);
      setMessage('Purchase successful!');
      setTimeout(() => setMessage(''), 3000);
      await loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Purchase failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSearch = async (searchParams: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    try {
      if (Object.keys(searchParams).length === 0) {
        setFilteredSweets(sweets);
        return;
      }

      const results = await sweetsAPI.search(searchParams);
      setFilteredSweets(results);
    } catch (err: any) {
      setError('Search failed');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading sweets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Available Sweets</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <SearchAndFilters onSearch={handleSearch} sweets={sweets} />

      {filteredSweets.length === 0 ? (
        <div className="card">
          <p>No sweets found.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} onPurchase={handlePurchase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

