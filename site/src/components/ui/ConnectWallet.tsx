"use client";

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };


  const isWrongNetwork = isConnected && chain?.id !== 11155111;

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        {isWrongNetwork && (
          <Button 
            variant="destructive" 
            size="sm"
            className="text-xs"
            onClick={() => {
              window.ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xAA36A7' }],
              }).catch(console.error);
            }}
          >
            Switch to Sepolia
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              {formatAddress(address || '')}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address || '');
              }}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 text-red-600 cursor-pointer"
              onClick={() => disconnect()}
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            disabled={isPending}
          >
            <Wallet className="h-4 w-4" />
            {isPending ? 'Connecting...' : 'Connect Wallet'}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="cursor-pointer py-2"
            >
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>{connector.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <div className="text-red-500 text-sm mt-1">{error.message}</div>}
    </div>
  );
} 