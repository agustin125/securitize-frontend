import React, { useState } from 'react';
import { purchaseItem } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { performTx } from '../../utils/metamask-utils';

export const PurchaseFlow = () => {
  const [form, setForm] = useState({ listingId: '', value: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePurchase = async () => {
    try {
      const response = await purchaseItem(form);
      await performTx(response);
    } catch (error) {
      console.error(error);
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
