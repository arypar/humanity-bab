"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertCircle, CheckCircle, Loader2, HeartHandshake } from 'lucide-react';
import { ConnectWallet } from '@/components/ui/ConnectWallet';
import { useAccount } from 'wagmi';
import { useDonationContract } from '@/hooks/useDonationContract';
import { NonprofitSelector } from '@/components/ui/NonprofitSelector';

interface Nonprofit {
  address: `0x${string}`;
  name: string;
  ein?: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  nonprofitAddress: `0x${string}`;
  nonprofitName: string;
  ein: string;
  goal: number;
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
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showNonprofitSelector, setShowNonprofitSelector] = useState(false);
  
  const { donate, isLoading, isSuccess, transactionHash } = useDonationContract();

  // Sample nonprofits
  const sampleNonprofits: Nonprofit[] = [
    {
      address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199" as `0x${string}`,
      name: "Youth Entrepreneurship Association",
      ein: "92-1584371"
    },
    {
      address: "0x7F1554A41f570f023653Cce7A7bbE8986AA8f414" as `0x${string}`,
      name: "Animal Welfare Society",
      ein: "45-7891234"
    },
    {
      address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" as `0x${string}`,
      name: "Education Access Initiative",
      ein: "12-3456789"
    },
    {
      address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" as `0x${string}`,
      name: "Humanitarian Relief Fund",
      ein: "56-1234567"
    },
    {
      address: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db" as `0x${string}`,
      name: "Environmental Conservation Trust",
      ein: "78-9012345"
    }
  ];

  // Sample campaigns
  const sampleCampaigns: Campaign[] = [
    {
      id: "1",
      title: "Support the Youth Entrepreneurship Association",
      description: "Financial education for young entrepreneurs.",
      nonprofitAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199" as `0x${string}`,
      nonprofitName: "Youth Entrepreneurship Association",
      ein: "92-1584371",
      goal: 50000
    },
    {
      id: "2",
      title: "Local Animal Shelter Renovation",
      description: "Help us renovate our facilities to provide better care for rescued animals.",
      nonprofitAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199" as `0x${string}`,
      nonprofitName: "Animal Welfare Society",
      ein: "45-7891234",
      goal: 20000
    },
    {
      id: "3",
      title: "Education for Rural Children",
      description: "Providing educational resources and supplies to children in rural areas.",
      nonprofitAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199" as `0x${string}`,
      nonprofitName: "Education Access Initiative",
      ein: "12-3456789",
      goal: 25000
    }
  ];

  const handleDonate = async () => {
    if (!selectedNonprofit && !selectedCampaign) {
      setError('Please select a nonprofit organization or campaign');
      return;
    }

    try {
      setStep('processing');
      if (selectedCampaign) {
        await donate(selectedCampaign.nonprofitAddress, amount);
      } else if (selectedNonprofit) {
        await donate(selectedNonprofit.address, amount);
      }
      
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
      setShowCampaigns(false);
      
      // Check if the campaign info is in the nonprofit address/name
      const matchingCampaign = sampleCampaigns.find(
        camp => camp.nonprofitAddress === nonprofitAddress && camp.nonprofitName === nonprofitName
      );
      
      if (matchingCampaign) {
        // We were passed a campaign
        setSelectedCampaign(matchingCampaign);
        setSelectedNonprofit({
          address: matchingCampaign.nonprofitAddress,
          name: matchingCampaign.nonprofitName,
          ein: matchingCampaign.ein
        });
      } else if (nonprofitAddress && nonprofitName) {
        // We were passed just a nonprofit
        const matchingNonprofit = sampleNonprofits.find(
          np => np.address === nonprofitAddress
        );
        
        if (matchingNonprofit) {
          setSelectedNonprofit(matchingNonprofit);
        } else {
          setSelectedNonprofit({
            address: nonprofitAddress,
            name: nonprofitName,
            ein: "12-3456789" // Default EIN if not found
          });
        }
      }
    }
  }, [isOpen, nonprofitAddress, nonprofitName]);

  // Handle campaign selection
  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setSelectedNonprofit({
      address: campaign.nonprofitAddress,
      name: campaign.nonprofitName,
      ein: campaign.ein
    });
    setShowCampaigns(false);
  };

  // Handle nonprofit selection
  const handleNonprofitSelect = (nonprofit: Nonprofit) => {
    setSelectedNonprofit(nonprofit);
    setSelectedCampaign(null);
    setShowNonprofitSelector(false);
  };

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
                  ? `Thank you for supporting ${selectedCampaign?.nonprofitName || selectedNonprofit?.name || 'this organization'}`
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
            {isConnected && step === 'input' && !showCampaigns && !showNonprofitSelector && (
              <div className="space-y-6">
                {/* Campaign or Nonprofit Selection */}
                {selectedCampaign ? (
                  <div className="rounded-lg border border-emerald-100 p-4 bg-emerald-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-emerald-800">{selectedCampaign.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{selectedCampaign.description}</p>
                        <p className="text-xs text-emerald-700 mt-2">
                          Managed by: {selectedCampaign.nonprofitName}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedCampaign(null)}
                        className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : selectedNonprofit ? (
                  <div className="rounded-lg border border-emerald-100 p-4 bg-emerald-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-emerald-800">{selectedNonprofit.name}</h3>
                        <p className="text-xs text-emerald-700 mt-2">
                          EIN: {selectedNonprofit.ein || "Not provided"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedNonprofit.address.substring(0, 6)}...{selectedNonprofit.address.substring(selectedNonprofit.address.length - 4)}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedNonprofit(undefined)}
                        className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="nonprofit">Select Recipient</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-emerald-600 p-0 h-auto"
                          onClick={() => setShowCampaigns(true)}
                        >
                          Browse Campaigns
                        </Button>
                        <span className="text-gray-400">|</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-emerald-600 p-0 h-auto"
                          onClick={() => setShowNonprofitSelector(true)}
                        >
                          Browse Nonprofits
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
                      <p className="text-gray-500 text-center mb-3">
                        Please select a nonprofit organization or campaign to continue
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowNonprofitSelector(true)}
                          className="border-emerald-200 text-emerald-700"
                        >
                          Select Nonprofit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCampaigns(true)}
                          className="border-emerald-200 text-emerald-700"
                        >
                          Browse Campaigns
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount (Sepolia ETH)</Label>
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
                    Minimum donation: 0.001 Sepolia ETH
                  </p>
                  <p className="text-xs text-amber-600">
                    Make sure you're connected to the Sepolia network to make donations
                  </p>
                </div>
                
                <Button 
                  onClick={handleDonate} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={parseFloat(amount) <= 0 || (!selectedNonprofit && !selectedCampaign)}
                >
                  Donate Now
                </Button>

                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
            )}

            {/* Nonprofit Selection Panel */}
            {isConnected && step === 'input' && showNonprofitSelector && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Select a Nonprofit</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowNonprofitSelector(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {sampleNonprofits.map((nonprofit) => (
                    <div 
                      key={nonprofit.address}
                      className="rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors"
                      onClick={() => handleNonprofitSelect(nonprofit)}
                    >
                      <h4 className="font-medium text-emerald-700">{nonprofit.name}</h4>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>EIN: {nonprofit.ein}</span>
                        <span>{nonprofit.address.substring(0, 6)}...{nonprofit.address.substring(nonprofit.address.length - 4)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Campaign Selection Panel */}
            {isConnected && step === 'input' && showCampaigns && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Select a Campaign</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCampaigns(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {sampleCampaigns.map((campaign) => (
                    <div 
                      key={campaign.id}
                      className="rounded-lg border border-gray-200 p-3 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors"
                      onClick={() => handleCampaignSelect(campaign)}
                    >
                      <h4 className="font-medium text-emerald-700">{campaign.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{campaign.description}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{campaign.nonprofitName}</span>
                        <span className="flex items-center gap-1">
                          <HeartHandshake className="w-3 h-3" />
                          Goal: ${campaign.goal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
                
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg w-full">
                  <h4 className="font-medium text-emerald-800 mb-2">Tax Receipt Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Organization:</span> {selectedCampaign?.nonprofitName || selectedNonprofit?.name}</p>
                    <p><span className="font-medium">EIN:</span> {selectedCampaign?.ein || selectedNonprofit?.ein || "12-3456789"}</p>
                    <p><span className="font-medium">Amount:</span> {amount} ETH</p>
                    <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                {transactionHash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-4"
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