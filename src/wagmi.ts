import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  Chain
} from 'wagmi/chains';

const humanityTestnet: Chain = {
  id: 1942999413,
  name: 'Humanity Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Humanity Points',
    symbol: 'tHP',
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.testnet.humanity.org']
    },
    public: {
      http: ['https://rpc.testnet.humanity.org']
    }
  },
  blockExplorers: {
    default: {
      name: 'HumanityScan',
      url: 'https://explorer.testnet.humanity.org'
    }
  },
  testnet: true
};

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    humanityTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
