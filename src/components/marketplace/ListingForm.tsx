import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listItem } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { performTx, performTxBehalf, getSignerAddress } from '../../utils/metamask-utils';

export const ListingForm: React.FC = () => {
  const [form, setForm] = useState({ token: '', amount: '', price: '' });
  const [behalf, setBehalf] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBehalf(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const address = await getSignerAddress();
      console.log('Signer Address:', address);
      const responses = await listItem({ ...form, address });

      for (const response of responses) {
        if (behalf) {
          performTxBehalf(form.token, Number(form.amount), Number(form.price), address);
        } else {
          await performTx(response);
        }
      }

      toast.success('🎉 Transactions signed successfully! You can now send them to the network.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error listing item:', error);
      toast.error('❌ Failed to list item. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Listing...' : 'List Item'}
      </Button>
      <label>
        <input
          type="checkbox"
          checked={behalf}
          onChange={handleCheckboxChange}
        />
        Sign on Behalf
      </label>
      <ToastContainer />
    </form>
  );
};
