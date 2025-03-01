"use client";

import { useCallback, useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { DONATION_CONTRACT_ADDRESS } from '@/contracts/config';
import DonationContractABI from '@/contracts/DonationContract.json';

// Types based on contract structures
export interface Nonprofit {
  walletAddress: `0x${string}`;
  organizationName: string;
  ein: string;
  isVerified: boolean;
  totalDonationsReceived: bigint;
}

export interface Donation {
  donor: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
}

// Hook for interacting with the donation contract
export function useDonationContract() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Write contract hook
  const { writeContract, isPending, data: hash } = useWriteContract();
  
  // Transaction receipt hook
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Register a nonprofit organization
  const registerNonprofit = useCallback(
    async (organizationName: string, ein: string) => {
      setIsLoading(true);
      setError(null);
      
      try {
        writeContract({
          address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
          abi: DonationContractABI.abi,
          functionName: 'registerNonprofit',
          args: [organizationName, ein],
        });
      } catch (err) {
        console.error('Error registering nonprofit:', err);
        setError('Failed to register nonprofit. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [writeContract]
  );

  // Make a donation to a nonprofit
  const donate = useCallback(
    async (nonprofitAddress: `0x${string}`, amountInEth: string) => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Verify we're on Sepolia network before proceeding
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0xaa36a7') { // Sepolia chainId
            setError('Please switch to the Sepolia network before donating');
            setIsLoading(false);
            return;
          }
        }
        
        // Proceed with donation
        writeContract({
          address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
          abi: DonationContractABI.abi,
          functionName: 'donate',
          args: [nonprofitAddress],
          value: parseEther(amountInEth),
        });
      } catch (err) {
        console.error('Error making donation:', err);
        setError('Failed to process donation. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [writeContract]
  );

  // Withdraw donations (for nonprofits only)
  const withdrawDonations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      writeContract({
        address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
        abi: DonationContractABI.abi,
        functionName: 'withdrawDonations',
      });
    } catch (err) {
      console.error('Error withdrawing donations:', err);
      setError('Failed to withdraw donations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [writeContract]);

  // Get nonprofit info
  const useNonprofitInfo = (nonprofitAddress: `0x${string}` | undefined) => {
    return useReadContract({
      address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
      abi: DonationContractABI.abi,
      functionName: 'getNonprofitInfo',
      args: nonprofitAddress ? [nonprofitAddress] : undefined,
      query: {
        enabled: !!nonprofitAddress,
      },
    });
  };

  // Get all nonprofits
  const useAllNonprofits = () => {
    return useReadContract({
      address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
      abi: DonationContractABI.abi,
      functionName: 'getAllNonprofits',
    });
  };

  // Get donor history
  const useDonorHistory = (donorAddress: `0x${string}` | undefined) => {
    return useReadContract({
      address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
      abi: DonationContractABI.abi,
      functionName: 'getDonorHistory',
      args: donorAddress ? [donorAddress] : undefined,
      query: {
        enabled: !!donorAddress,
      },
    });
  };

  // Get nonprofit donation history
  const useNonprofitDonations = (nonprofitAddress: `0x${string}` | undefined) => {
    return useReadContract({
      address: DONATION_CONTRACT_ADDRESS as `0x${string}`,
      abi: DonationContractABI.abi,
      functionName: 'getNonprofitDonations',
      args: nonprofitAddress ? [nonprofitAddress] : undefined,
      query: {
        enabled: !!nonprofitAddress,
      },
    });
  };

  return {
    registerNonprofit,
    donate,
    withdrawDonations,
    useNonprofitInfo,
    useAllNonprofits,
    useDonorHistory,
    useNonprofitDonations,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess,
    error,
    transactionHash: hash,
  };
} 