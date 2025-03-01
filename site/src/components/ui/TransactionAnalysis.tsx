"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface Transaction {
  id: string;
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  timestamp: number;
  amount: string;
  currency: string;
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

const TransactionAnalysis: React.FC = () => {
  // Mock data with organization names
  const transactions: Transaction[] = [
    {
      id: "0x123",
      sender: {
        name: "Acme Corp",
        address: "0x1234...5678"
      },
      recipient: {
        name: "Global Industries",
        address: "0x8765...4321"
      },
      timestamp: new Date('2024-02-07').getTime(),
      amount: "0.5",
      currency: "ETH"
    },
    {
      id: "0x456",
      sender: {
        name: "Tech Solutions Ltd",
        address: "0x2345...6789"
      },
      recipient: {
        name: "Digital Services Inc",
        address: "0x9876...5432"
      },
      timestamp: new Date('2024-02-06').getTime(),
      amount: "100",
      currency: "USDC"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      
      <CardContent className="max-h-[600px] overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              variants={itemVariants}
              className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="font-medium truncate">{tx.sender.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {tx.sender.address}
                    </span>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-muted-foreground">To</span>
                    <span className="font-medium truncate">{tx.recipient.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {tx.recipient.address}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-end gap-6 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-medium whitespace-nowrap">
                      {tx.amount} {tx.currency}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm whitespace-nowrap">
                      {format(tx.timestamp, 'M/d/yy')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TransactionAnalysis;
