import { useState } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    setAddress(accounts[0]);
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  return { address, connectWallet, disconnectWallet };
};