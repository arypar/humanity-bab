"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { ConnectWallet } from '@/components/ui/ConnectWallet';
import { useAccount } from 'wagmi';
import { useDonationContract } from '@/hooks/useDonationContract';
import { NonprofitSelector } from '@/components/ui/NonprofitSelector';

interface Nonprofit {
  address: `0x${string}`;
  name: string;
}

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nonprofitAddress?: `0x${string}`;
  nonprofitName?: string;
}

export function DonationDialog({ 
  isOpen, 
  onClose, 
  nonprofitAddress, 
  nonprofitName = 'this organization' 
}: DonationDialogProps) {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('0.01');
  const [step, setStep] = useState<'input' | 'processing' | 'success' | 'error'>('input');
  const [error, setError] = useState<string | null>(null);
  const [selectedNonprofit, setSelectedNonprofit] = useState<Nonprofit | undefined>(
    nonprofitAddress ? { address: nonprofitAddress, name: nonprofitName } : undefined
  );
  
  const { donate, isLoading, isSuccess, transactionHash } = useDonationContract();

  const handleDonate = async () => {
    if (!selectedNonprofit) {
      setError('Please select a nonprofit organization');
      return;
    }

    try {
      setStep('processing');
      await donate(selectedNonprofit.address, amount);
      
      // The actual success state will be tracked by the isSuccess from the hook
      // but we'll handle it in the useEffect below
    } catch (err) {
      console.error('Donation error:', err);
      setStep('error');
      setError('Failed to process donation. Please try again.');
    }
  };

  // Watch for success state from the contract hook
  React.useEffect(() => {
    if (isSuccess) {
      setStep('success');
    }
  }, [isSuccess]);

  // Reset the dialog state when it opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setStep('input');
      setError(null);
      
      // Initialize selected nonprofit if provided in props
      if (nonprofitAddress && nonprofitName) {
        setSelectedNonprofit({
          address: nonprofitAddress,
          name: nonprofitName
        });
      }
    }
  }, [isOpen, nonprofitAddress, nonprofitName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-md relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-500">
                {step === 'success' ? 'Donation Complete!' : 'Make a Donation'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {step === 'success' 
                  ? `Thank you for supporting ${selectedNonprofit?.name || 'this organization'}`
                  : `Support nonprofit organizations with tax-deductible donations`}
              </p>
            </div>
            
            {/* Wallet Connection */}
            {!isConnected && (
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please connect your wallet to continue
                </p>
                <ConnectWallet />
              </div>
            )}
            
            {/* Donation Form */}
            {isConnected && step === 'input' && (
              <div className="space-y-6">
                {/* Nonprofit Selector */}
                <div className="space-y-2">
                  <Label htmlFor="nonprofit">Select Nonprofit</Label>
                  <NonprofitSelector 
                    selectedNonprofit={selectedNonprofit}
                    onSelect={(nonprofit) => setSelectedNonprofit(nonprofit)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount (ETH)</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.001"
                      min="0.001"
                      className="pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ETH
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Minimum donation: 0.001 ETH
                  </p>
                </div>
                
                <Button 
                  onClick={handleDonate} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={parseFloat(amount) <= 0 || !selectedNonprofit}
                >
                  Donate Now
                </Button>

                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
            )}
            
            {/* Processing State */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  Processing your donation...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Please confirm the transaction in your wallet
                </p>
              </div>
            )}
            
            {/* Success State */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-4">
                <CheckCircle className="w-16 h-16 text-emerald-600 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  Thank you for your donation!
                </p>
                {transactionHash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-2"
                  >
                    View transaction on Etherscan
                  </a>
                )}
                
                <Button 
                  onClick={onClose} 
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700"
                >
                  Close
                </Button>
              </div>
            )}
            
            {/* Error State */}
            {(step === 'error' || error) && (
              <div className="flex flex-col items-center justify-center py-4">
                <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
                <p className="text-red-600 text-center font-medium">
                  {error || 'Something went wrong'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm mt-2">
                  Please try again or contact support if the issue persists.
                </p>
                
                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setStep('input')} 
                    variant="outline"
                  >
                    Try Again
                  </Button>
                  <Button 
                    onClick={onClose} 
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 