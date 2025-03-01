import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import NavigationHeader from '@/components/ui/NavigationHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';
import { useEffect, useState } from 'react';

const client = new QueryClient();

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <>{children}</> : null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ClientOnly>
          <RainbowKitProvider>
            <div className="min-h-screen bg-background">
              <NavigationHeader />
              <Component {...pageProps} />
            </div>
          </RainbowKitProvider>
        </ClientOnly>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
