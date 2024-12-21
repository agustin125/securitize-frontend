import React from 'react';
import './styles/App.css';
import { Marketplace } from './components/marketplace/Marketplace';
import { ListingForm } from './components/marketplace/ListingForm';
import { PurchaseFlow } from './components/marketplace/PurchaseFlow';
import { WithdrawSection } from './components/marketplace/WithdrawSection';
import { WalletNotification } from './components/marketplace/WalletNotification';
import { useWallet } from './hooks/useWallet';

const App: React.FC = () => {
  const { address, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="container">
      <header>
        <h1>ERC-20 Marketplace</h1>
        <div className="wallet-actions">
          {address ? (
            <>
              <p>Connected as: {address}</p>
              <button onClick={disconnectWallet} className="button secondary">
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button onClick={connectWallet} className="button primary">
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {!window.ethereum && <WalletNotification />}

      <main>
        <section>
          <Marketplace />
        </section>

        <section>
          <ListingForm />
        </section>

        <section>
          <PurchaseFlow />
        </section>

        <section>
          <WithdrawSection />
        </section>
      </main>

      <footer>
        <p>&copy; 2024 ERC-20 Marketplace. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
