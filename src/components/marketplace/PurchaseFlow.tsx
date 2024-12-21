import React, { useState } from 'react';
import { purchaseItem } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const PurchaseFlow = () => {
  const [form, setForm] = useState({ listingId: '', value: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePurchase = async () => {
    try {
      await purchaseItem(form);
      alert('Purchase successful');
    } catch (error) {
      console.error(error);
      alert('Failed to purchase');
    }
  };

  return (
    <div>
      <h2>Purchase Item</h2>
      <Input
        label="Listing ID"
        type="text"
        value={form.listingId}
        onChange={handleChange}
        placeholder="Enter listing ID"
        name="listingId"
      />
      <Input
        label="Value (ETH)"
        type="number"
        value={form.value}
        onChange={handleChange}
        placeholder="Enter value"
        name="value"
      />
      <Button onClick={handlePurchase}>Purchase</Button>
    </div>
  );
};
