import React, { useState, useEffect } from 'react';
import { Sweet, sweetsAPI } from '../services/api';
import SweetForm from './SweetForm';

const AdminPanel: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (sweetData: { name: string; category: string; price: number; quantity?: number }) => {
    try {
      await sweetsAPI.create(sweetData);
      setMessage('Sweet created successfully!');
      setTimeout(() => setMessage(''), 3000);
      setShowForm(false);
      await loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create sweet');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleUpdate = async (id: number, sweetData: Partial<Sweet>) => {
    try {
      await sweetsAPI.update(id, sweetData);
      setMessage('Sweet updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      setEditingSweet(null);
      await loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update sweet');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetsAPI.delete(id);
      setMessage('Sweet deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
      await loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete sweet');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRestock = async (id: number, quantity: number) => {
    try {
      await sweetsAPI.restock(id, quantity);
      setMessage('Sweet restocked successfully!');
      setTimeout(() => setMessage(''), 3000);
      await loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to restock sweet');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin Panel - Manage Sweets</h2>
        <button className="btn btn-primary" onClick={() => { setEditingSweet(null); setShowForm(true); }}>
          Add New Sweet
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={editingSweet ? (data) => handleUpdate(editingSweet.id, data) : handleCreate}
          onCancel={() => { setShowForm(false); setEditingSweet(null); }}
        />
      )}

      <div className="grid">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="sweet-card">
            <h3>{sweet.name}</h3>
            <div className="category">{sweet.category}</div>
            <div className="price">${sweet.price.toFixed(2)}</div>
            <div className="quantity">Stock: {sweet.quantity}</div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditingSweet(sweet);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(sweet.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const quantity = prompt('Enter quantity to restock:');
                  if (quantity && !isNaN(parseInt(quantity))) {
                    handleRestock(sweet.id, parseInt(quantity));
                  }
                }}
              >
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

