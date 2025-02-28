"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface DashboardStats {
  totalDonations: number;
  totalDonors: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    donor: string;
    timestamp: string;
  }>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          totalDonations: 1250,
          totalDonors: 45,
          recentDonations: [
            {
              id: "1",
              amount: 0.5,
              donor: "0x1234...5678",
              timestamp: "2024-01-20T10:30:00Z"
            },
            {
              id: "2",
              amount: 1.2,
              donor: "0x8765...4321",
              timestamp: "2024-01-19T15:45:00Z"
            }
          ]
        });
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isConnected, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-emerald-600" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-red-600 justify-center"
        >
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Organization Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your donations and manage your organization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats?.totalDonations} ETH
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Total Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats?.totalDonors}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentDonations.map(donation => (
                    <div
                      key={donation.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-600">
                        {donation.donor}
                      </span>
                      <span className="font-medium text-emerald-600">
                        {donation.amount} ETH
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push("/settings")}
          >
            Organization Settings
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/donations")}
          >
            View All Donations
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
