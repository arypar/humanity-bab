"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Shield, Wallet, X } from "lucide-react";
import Image from "next/image";

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
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      description: "Help us renovate our animal shelter to provide better care for abandoned pets.",
      currentAmount: 8500,
      goalAmount: 20000,
      donorCount: 156
    },
    {
      id: "3",
      title: "Clean Water Initiative",
      description: "Provide clean drinking water to communities in developing countries.",
      currentAmount: 32000,
      goalAmount: 40000,
      donorCount: 412
    }
  ];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ x: rect.left, y: rect.bottom });
    }
    setShowCampaigns(true);
  };

  return (
    <div className="w-full mx-auto p-6 max-w-7xl flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="mb-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Powered by Humanity Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 rounded-full flex items-center gap-1 border py-2 border-white/30 shadow-sm"
          >
            <span className="text-white/90 text-sm font-medium">Powered by</span>
            <Image 
              src="/humanity3.png" 
              alt="Humanity" 
              width={80} 
              height={80}
              className="rounded-full"
            />
          </motion.div>
          
          <h1 className="text-5xl font-bold text-white md:text-6xl mt-5 font-sans">
            Tax-Deductible Crypto Donations
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Make charitable donations in cryptocurrency and receive instant tax deduction receipts. 
            Secure, transparent, and fully compliant with IRS regulations.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <div className="flex items-center gap-3 bg-white/10 text-white px-5 py-3 rounded-lg border border-white/20">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-lg">Instant Tax Receipts</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 text-white px-5 py-3 rounded-lg border border-white/20">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg">IRS Compliant</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 text-white px-5 py-3 rounded-lg border border-white/20">
              <Wallet className="w-6 h-6 text-primary" />
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
        className="bg-secondary rounded-xl p-6 w-full max-w-md border border-white/10"
      >
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-white mb-1">
            Try It Out
          </h2> 
          <p className="text-sm text-white/70">
            Make a tax-deductible donation to a verified campaign
          </p>
        </div>

        {/* Centered Donate Now Button */}
        <div className="flex flex-col items-center justify-center py-2 px-4">
          <Button 
            ref={buttonRef}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            onClick={handleButtonClick}
          >
            <span className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Donate Now
            </span>
          </Button>
        </div>
      </motion.div>

      {/* Expanded Campaign Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background rounded-xl overflow-hidden w-full max-w-2xl shadow-xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedCampaign.title}</h2>
                  <button 
                    onClick={() => setSelectedCampaign(null)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-white/80 mb-6">{selectedCampaign.description}</p>
                
                <div className="space-y-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedCampaign.currentAmount / selectedCampaign.goalAmount) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-white">
                        ${selectedCampaign.currentAmount.toLocaleString()}
                        <span className="text-white/60"> of ${selectedCampaign.goalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex -space-x-2 mr-2">
                          {['J', 'M', 'R', 'S', 'T'].slice(0, Math.min(4, Math.ceil(selectedCampaign.donorCount / 100))).map((letter, i) => (
                            <div 
                              key={i}
                              className={`w-6 h-6 rounded-full border-2 border-background ${
                                ['bg-blue-400', 'bg-primary', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400'][i % 5]
                              } flex items-center justify-center text-[10px] text-primary-foreground font-bold`}
                            >
                              {letter}
                            </div>
                          ))}
                          {selectedCampaign.donorCount > 400 && (
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-white/20 flex items-center justify-center text-[10px] text-white font-bold">
                              +
                            </div>
                          )}
                        </div>
                        <span className="text-white/60">
                          {selectedCampaign.donorCount} donors
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
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
          <div 
            className="fixed inset-0 z-50"
            onClick={() => setShowCampaigns(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute z-10 bg-background rounded-xl shadow-xl overflow-hidden w-80 border border-white/20"
              style={{ 
                top: buttonPosition.y + 10, 
                left: Math.max(16, Math.min(buttonPosition.x - 150, window.innerWidth - 296))
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-semibold text-white">Select a Campaign</h3>
                <button 
                  onClick={() => setShowCampaigns(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <motion.div 
                className="max-h-[60vh] overflow-y-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {campaigns.map((campaign) => {
                  const progress = Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100));
                  
                  return (
                    <motion.div
                      key={campaign.id}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="border-b border-white/10 last:border-0 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowCampaigns(false);
                      }}
                    >
                      <div className="p-4">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold text-white truncate mb-1.5">
                            {campaign.title}
                          </h3>
                          <div className="space-y-1">
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                            <div className="flex justify-between items-baseline text-sm">
                              <span className="font-medium text-primary">
                                ${campaign.currentAmount.toLocaleString()}
                              </span>
                              <span className="text-white/60 text-xs">
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