"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Shield, Wallet, X } from "lucide-react";
import { DonationDialog } from "./DonationDialog";
import { useAccount } from "wagmi";
import { useDonationContract } from "@/hooks/useDonationContract";

// Client-side only wrapper to prevent hydration mismatch
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <>{children}</> : null;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  donorCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const [showCampaigns, setShowCampaigns] = React.useState(false);
  const [buttonPosition, setButtonPosition] = React.useState({ x: 0, y: 0 });
  const [showDonationDialog, setShowDonationDialog] = React.useState(false);
  
  // Get verified nonprofits
  const { useAllNonprofits } = useDonationContract();
  const { data: nonprofitAddresses, isLoading: loadingNonprofits } = useAllNonprofits();

  // Mock data - replace with real API data
  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Help Sarah's Medical Treatment",
      description: "Support Sarah in her fight against cancer with life-saving treatment.",
      currentAmount: 15000,
      goalAmount: 50000,
      donorCount: 234
    },
    {
      id: "2",
      title: "Local Animal Shelter Renovation",
      description: "Help us renovate our facilities to provide better care for rescued animals.",
      currentAmount: 8000,
      goalAmount: 20000,
      donorCount: 156
    },
    {
      id: "3",
      title: "Education for Rural Children",
      description: "Providing educational resources and supplies to children in rural areas.",
      currentAmount: 12000,
      goalAmount: 25000,
      donorCount: 189
    }
  ];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Open donation dialog instead of campaigns
    setShowDonationDialog(true);
  };

  // Default nonprofit address for testing - this would come from your contract in production
  const defaultNonprofitAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

  return (
    <div className="w-full mx-auto p-6 max-w-7xl flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-bold text-emerald-800 md:text-6xl">
            Tax-Deductible Crypto Donations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Make charitable donations in cryptocurrency and receive instant tax deduction receipts. 
            Secure, transparent, and fully compliant with IRS regulations.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-lg">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Instant Tax Receipts</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-lg">
              <Shield className="w-6 h-6" />
              <span className="text-lg">IRS Compliant</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-lg">
              <Wallet className="w-6 h-6" />
              <span className="text-lg">Multiple Chains</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Try It Out Section with Donate Now button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-emerald-50 rounded-xl p-6 w-full max-w-md"
      >
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Try It Out
          </h2> 
          <p className="text-sm text-gray-600">
            Make a tax-deductible donation to a verified campaign
          </p>
        </div>

        {/* Centered Donate Now Button */}
        <div className="flex flex-col items-center justify-center py-2 px-4">
          <ClientOnly>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
              onClick={handleButtonClick}
            >
              <span className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Donate Now
              </span>
            </Button>
          </ClientOnly>
        </div>
      </motion.div>

      {/* Donation Dialog */}
      <ClientOnly>
        <DonationDialog 
          isOpen={showDonationDialog}
          onClose={() => setShowDonationDialog(false)}
          // If there are verified nonprofits from the contract, use the first one
          // Otherwise use a default address for testing
          nonprofitAddress={
            nonprofitAddresses && Array.isArray(nonprofitAddresses) && nonprofitAddresses.length > 0 
              ? (nonprofitAddresses[0] as `0x${string}`) 
              : (defaultNonprofitAddress as `0x${string}`)
          }
          nonprofitName="Verified Nonprofit"
        />
      </ClientOnly>

      {/* Expanded Campaign Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                  {selectedCampaign.title}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {selectedCampaign.description}
                </p>
                
                <div className="space-y-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedCampaign.currentAmount / selectedCampaign.goalAmount) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-emerald-700">
                        ${selectedCampaign.currentAmount.toLocaleString()}
                        <span className="text-gray-500"> of ${selectedCampaign.goalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex -space-x-2 mr-2">
                          {['J', 'M', 'R', 'S', 'T'].slice(0, Math.min(4, Math.ceil(selectedCampaign.donorCount / 100))).map((letter, i) => (
                            <div 
                              key={i}
                              className={`w-6 h-6 rounded-full border-2 border-white ${
                                ['bg-blue-400', 'bg-emerald-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400'][i % 5]
                              } flex items-center justify-center text-[10px] text-white font-bold`}
                            >
                              {letter}
                            </div>
                          ))}
                          {selectedCampaign.donorCount > 400 && (
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                              +
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500">
                          {selectedCampaign.donorCount} donors
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Donate Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaigns Popup */}
      <AnimatePresence>
        {showCampaigns && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowCampaigns(false)}>
            <motion.div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCampaigns(false)}
            />
            
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-50 relative mx-4"
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                y: buttonPosition.y - window.innerHeight / 2
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                y: buttonPosition.y - window.innerHeight / 2
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-emerald-800">Choose a Campaign</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowCampaigns(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-4"
              >
                {campaigns.map((campaign) => {
                  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100));
                  
                  return (
                    <motion.div
                      key={campaign.id}
                      variants={itemVariants}
                      className="border border-gray-100 rounded-lg overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowCampaigns(false);
                      }}
                    >
                      <div className="p-4">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold text-emerald-700 truncate mb-1.5">
                            {campaign.title}
                          </h3>
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-emerald-500 rounded-full"
                              />
                            </div>
                            <div className="flex justify-between items-baseline text-sm">
                              <span className="font-medium text-emerald-700">
                                ${campaign.currentAmount.toLocaleString()}
                              </span>
                              <span className="text-gray-500 text-xs">
                                of ${campaign.goalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;