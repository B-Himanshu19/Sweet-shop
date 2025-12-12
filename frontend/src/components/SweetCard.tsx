import React from 'react';
import { Sweet } from '../services/api';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase }) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <div className="category">{sweet.category}</div>
      <div className="price">${sweet.price.toFixed(2)}</div>
      <div className={`quantity ${isOutOfStock ? 'low' : 'in-stock'}`}>
        {isOutOfStock ? 'Out of Stock' : `In Stock: ${sweet.quantity}`}
      </div>
      <button
        className="btn btn-primary"
        onClick={() => onPurchase(sweet.id)}
        disabled={isOutOfStock}
        style={{ width: '100%' }}
      >
        {isOutOfStock ? 'Out of Stock' : 'Purchase'}
      </button>
    </div>
  );
};

export default SweetCard;

