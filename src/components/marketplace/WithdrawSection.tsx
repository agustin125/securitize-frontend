import React from 'react';
import { withdrawFunds } from '../../services/api';
import { getSignerAddress, performTx } from '../../utils/metamask-utils';
import { Button } from '../ui/Button';

export const WithdrawSection = () => {
  const handleWithdraw = async () => {
        try {
          const signerAddress = await getSignerAddress();
          const response = await withdrawFunds({signerAddress});
          await performTx(response);
        } catch (error) {
          console.error(error);
        }
  };

  return (
    <div>
      <h2>Withdraw Funds</h2>
      <Button onClick={handleWithdraw}>Withdraw</Button>
    </div>
  );
};
