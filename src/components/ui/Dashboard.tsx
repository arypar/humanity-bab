"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Shield, Wallet, X } from "lucide-react";

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

  return (
    <div className="w-full mx-auto p-6 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-emerald-800 md:text-5xl">
            Tax-Deductible Crypto Donations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make charitable donations in cryptocurrency and receive instant tax deduction receipts. 
            Secure, transparent, and fully compliant with IRS regulations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Instant Tax Receipts</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5" />
              <span>IRS Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg">
              <Wallet className="w-5 h-5" />
              <span>Multiple Chains</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Try It Out
        </h2>
        <p className="text-gray-600 mb-6">
          Make your first tax-deductible donation to one of these verified campaigns
        </p>
      </motion.div>

      {/* Centered Campaigns Grid */}
      <div className="flex justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1400px]"
        >
          {campaigns.map((campaign) => {
            const progress = (campaign.currentAmount / campaign.goalAmount) * 100;
            
            return (
              <motion.div
                key={campaign.id}
                variants={itemVariants}
                className="group cursor-pointer w-full"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <h3 className="text-base font-semibold text-emerald-700 truncate mb-3">
                      {campaign.title}
                    </h3>
                    <div className="space-y-2">
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
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

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
                      <div className="text-gray-500">
                        {selectedCampaign.donorCount} donors
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
    </div>
  );
};

export default Dashboard;
