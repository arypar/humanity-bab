// NOT CURRENTLY USED


"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { CheckCircle, Shield, Wallet, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const featureCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const LandingHero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium mb-4"
              >
                Introducing give.fun
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-emerald-800 dark:text-emerald-100"
                variants={itemVariants}
              >
                Tax-Deductible 
                <span className="relative">
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200 dark:bg-emerald-700/40 rounded-full -z-10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                  <span className="relative"> Crypto </span>
                </span> 
                Donations
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Make charitable donations in cryptocurrency and receive instant tax deduction receipts. 
                Secure, transparent, and fully compliant with IRS regulations.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto text-lg rounded-xl"
                onClick={() => router.push("/dashboard")}
              >
                <Heart className="mr-2 h-5 w-5" />
                Start Donating
                <motion.div
                  className="ml-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-6 h-auto text-lg border-emerald-600 text-emerald-700 dark:text-emerald-300 dark:border-emerald-700 rounded-xl"
                onClick={() => router.push("/enroll")}
              >
                Enroll Your Nonprofit
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Instant Tax Receipts</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>IRS Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg">
                <Wallet className="w-5 h-5" />
                <span>Multiple Chains</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section - Direct transition without wave */}
      <div className="bg-white dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform makes crypto donations simple, secure, and tax-efficient
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="h-10 w-10 text-emerald-600" />,
                title: "Connect Wallet",
                description: "Connect your crypto wallet securely to our platform with just a few clicks."
              },
              {
                icon: <Heart className="h-10 w-10 text-emerald-600" />,
                title: "Choose a Cause",
                description: "Browse verified nonprofits and select the causes you want to support."
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-emerald-600" />,
                title: "Get Tax Receipt",
                description: "Receive an instant tax-deductible receipt for your donation."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
                  Ready to make a difference?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Join thousands of donors who are supporting causes they care about with cryptocurrency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => router.push("/enroll")}
                  >
                    Enroll Your Nonprofit
                  </Button>
                  <Link href="/dashboard" passHref>
                    <Button variant="outline" className="border-emerald-600 text-emerald-700 dark:text-emerald-300 dark:border-emerald-700">
                      Explore Campaigns
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-emerald-600 p-8 md:p-12 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, rotate: -5 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Tax Receipt</div>
                      <div className="text-emerald-600 font-medium">Verified ✓</div>
                    </div>
                    <div className="h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-md flex items-center justify-center">
                      <span className="font-medium text-emerald-800 dark:text-emerald-200">Donation Confirmed</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                        <span className="font-medium">1.5 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Date:</span>
                        <span className="font-medium">Today</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Organization:</span>
                        <span className="font-medium">Global Relief Fund</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        IRS Compliant Documentation for Tax Purposes
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero; 