import React, { useState } from 'react';
import { TradingProvider } from './context/TradingContext';
import { AppShell } from './components/layout/AppShell';
import { PremiumLoader } from './components/landing/PremiumLoader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <TradingProvider>
      {isLoading ? (
        <PremiumLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <AppShell />
      )}
    </TradingProvider>
  );
};

export default App;

