import React from 'react';
import { withdrawFunds } from '../../services/api';

export const WithdrawSection = () => {
  const handleWithdraw = async () => {
    try {
      await withdrawFunds({signerAddress: "0x1234567890123456789012345678901234567890"}); // Update with signer address
      alert('Funds withdrawn successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to withdraw funds');
    }
  };

  return (
    <div>
      <h2>Withdraw Funds</h2>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};
