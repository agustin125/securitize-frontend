import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../services/api';
import { Card } from '../ui/Card';
import { ethers } from 'ethers';

export const Marketplace = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    loadItems();
  }, []);

  return (
    <div>
      <h2>Marketplace</h2>
      <div className="marketplace-grid">
        {items.map((item: any, index: number) => (
          <Card key={index} title={`Token: ${item.token}`}>
            <p>Price: {ethers.formatUnits(item.price, 18)} ETH</p>
            <p>Quantity: {item.amount}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
