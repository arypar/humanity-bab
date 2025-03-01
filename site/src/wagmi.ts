"use client";

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
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

const enableTestnets = 
  typeof process !== 'undefined' && 
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';

const projectId = 
  typeof process !== 'undefined' ? 
  (process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID') : 
  'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Nonprofit Crypto Donation Platform',
  projectId: projectId,
  chains: [
    humanityTestnet,
    ...(enableTestnets ? [sepolia] : []),
  ],
  ssr: true,
});
