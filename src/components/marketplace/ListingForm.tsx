import React, { useState } from 'react';
import { listItem } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ListingForm = () => {
  const [form, setForm] = useState({ token: '', amount: '', price: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await listItem(form);
      alert('Item listed successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to list item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List a New Item</h2>
      <Input
        label="Token Address"
        type="text"
        value={form.token}
        onChange={handleChange}
        placeholder="Enter token address"
        name="token"
      />
      <Input
        label="Amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Enter amount"
        name="amount"
      />
      <Input
        label="Price (ETH)"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Enter price"
        name="price"
      />
      <Button type="submit">List Item</Button>
    </form>
  );
};
