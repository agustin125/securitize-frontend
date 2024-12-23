import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../services/api';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ethers } from 'ethers';
import { ListingsResponseDto } from '../../services/dto/listing-response-item.dto';


export const Marketplace = () => {
  const [items, setItems] = useState<ListingsResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h2>View All Items</h2>
      <Button onClick={loadItems} disabled={loading} >
        {loading ? 'Refreshing...' : 'Refresh'}
      </Button>
      <div className="marketplace-grid">
        {items.map((item, index) => (
          <Card key={index} title={`Token: ${item.token}`}>
            <p>Seller: {item.seller}</p>
            <p>Price: {ethers.formatUnits(item.price, 18)} ETH</p>
            <p>Quantity: {ethers.formatUnits(item.amount, 18)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

