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
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
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
