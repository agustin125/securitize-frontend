import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResponseDto } from '../services/dto/response-item.dto';

export const connectToMetaMask = async (): Promise<ethers.Signer> => {
  if (!window.ethereum) {
    toast.error('❌ MetaMask is not installed', {
      position: 'top-right',
      autoClose: 5000,
    });
    throw new Error('MetaMask is not installed');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const getSignerAddress = async (): Promise<string> => {
  const signer = await connectToMetaMask();
  return signer.getAddress();
};

export const getTransactionNonce = async (address: string): Promise<string> => {
  if (!window.ethereum) {
    toast.error('❌ MetaMask is not installed', {
      position: 'top-right',
      autoClose: 5000,
    });
    throw new Error('MetaMask is not installed');
  }

  return await window.ethereum.request({
    method: 'eth_getTransactionCount',
    params: [address, 'latest'],
  });
};

export const performTx = async (response: ResponseDto) => {
  if (!response.unsignedTx) {
    toast.error('❌ No unsigned transaction received from the API', {
      position: 'top-right',
      autoClose: 5000,
    });
    throw new Error('No unsigned transaction received from the API');
  }

  try {
    console.log('Unsigned Transaction:', response);
    toast.success(response.message, {
      position: 'top-right',
      autoClose: 5000,
    });

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const senderAddress = accounts[0];

    const nonce = await getTransactionNonce(senderAddress);
    const txParams = {
      ...response.unsignedTx,
     // value: response.unsignedTx.value ? BigInt(response.unsignedTx.value) : BigInt(0),
      from: senderAddress,
      nonce,
    };

    console.log('Transaction Params:', txParams);

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });

    console.log('Transaction Hash:', txHash);
    toast.success('🎉 Transactions signed successfully! You can now send them to the network.', {
      position: 'top-right',
      autoClose: 5000,
    });
    return txHash;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Transaction Error:', error.message);
    } else {
      console.error('Transaction Error:', error);
    }
    toast.error(`❌ Transaction failed: ${error}`, {
      position: 'top-right',
      autoClose: 5000,
    });
    throw new Error(`Transaction failed: ${error}`);
  }
};


export const  performTxBehalf = async (tokenAddress: string, listAmount: number, price: number, sellerAddress: string) : Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const verifyingContract = process.env.MARKETPLACE_ADDRESS;

  if (!verifyingContract) {
    throw new Error("Verifying contract address is not set in environment variables");
  }

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  console.log("Chain ID:", chainId);
  const domain = {
    name: "Marketplace",
    version: "1",
    chainId: "1337",
    verifyingContract,
  };

  const types = {
    ListItem: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "price", type: "uint256" },
      { name: "signer", type: "address" },
    ],
  };

  const message = {
    token: tokenAddress,
    amount: listAmount,
    price: price,
    signer: sellerAddress,
  };

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const userAddress = accounts[0];

  if (userAddress.toLowerCase() !== sellerAddress.toLowerCase()) {
    throw new Error("Connected account does not match the seller address");
  }

  try {
    const signature = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [sellerAddress, JSON.stringify({ domain, types, primaryType: "ListItem", message })],
    });

    console.log("Signature:", signature);
    return signature;
  } catch (error) {
    console.error("Error signing data:", error);
    throw new Error("Failed to sign data with MetaMask");
  }
}

