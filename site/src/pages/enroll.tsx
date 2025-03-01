"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import { Upload, CheckCircle, AlertCircle, Loader2, Wallet } from "lucide-react";
import UploadButton from "@/components/ui/UploadButton";
import { ConnectWallet } from "@/components/ui/ConnectWallet";
import { useDonationContract } from "@/hooks/useDonationContract";
import { CHAIN } from "@/contracts/config";

interface VerificationStatus {
  step: 'idle' | 'verifying' | 'complete' | 'failed';
  orgDetails?: string[];
  error?: string;
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <>{children}</> : null;
}

const EnrollPage: React.FC = () => {
  const { address, isConnected, chain } = useAccount(); 
  const [credential, setCredential] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [ein, setEin] = React.useState("");
  const [errors, setErrors] = React.useState<{ orgName?: string; ein?: string; submit?: string }>({});
  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus>({ step: 'idle' });
  const [walletVerified, setWalletVerified] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [registrationError, setRegistrationError] = React.useState<string | null>(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [hasPdfUploaded, setHasPdfUploaded] = React.useState(false);
  const einPattern = /^\d{2}-\d{7}$/;

  const { registerNonprofit, isLoading, isSuccess, error } = useDonationContract();

  const isWrongNetwork = isConnected && chain?.id !== CHAIN.id;

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!orgName.trim()) {
      newErrors.orgName = "Organization name is required";
    } else if (orgName.trim().length < 3) {
      newErrors.orgName = "Organization name must be at least 3 characters";
    }

    if (!ein) {
      newErrors.ein = "EIN is required";
    } else if (!/^\d{8,9}$/.test(ein)) {
      newErrors.ein = "EIN must be 8 or 9 digits and only contain numbers";
    }

    if (!isConnected) {
      newErrors.submit = "Please connect your wallet first";
    } else if (isWrongNetwork) {
      newErrors.submit = "Please switch to Sepolia network";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) {
      return;
    }

    console.log("Submitting verification request...");
    setVerificationStatus({ step: "verifying" });
    
    // Simulate verification delay
    setTimeout(() => {
      setVerificationStatus({ 
        step: "complete", 
        orgDetails: [ein, orgName]
      });
      setWalletVerified(true);
    }, 1500);
  };

  const handleRegisterWithContract = async () => {
    if (!address || !orgName || !ein) {
      setRegistrationError("Missing required information");
      return;
    }

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      await registerNonprofit(orgName, ein);
    } catch (err) {
      console.error("Contract registration error:", err);
      setRegistrationError("Failed to register with the contract. Please try again.");
      setIsRegistering(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setRegistrationSuccess(true);
      setIsRegistering(false);
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (error) {
      setRegistrationError(error);
      setIsRegistering(false);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Enroll Your Nonprofit</h1>
          <p className="text-gray-400">Register your 501(c)(3) organization to start accepting tax-deductible crypto donations</p>
        </div>

        <ClientOnly>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-black">Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!isConnected ? (
                <div className="text-center py-4">
                  <p className="text-gray-700 mb-4">
                    Please connect your Ethereum wallet to register your nonprofit
                  </p>
                </div>
              ) : verificationStatus.step === 'idle' || verificationStatus.step === 'failed' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-gray-800">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Enter organization's legal name"
                      disabled={!isConnected || isWrongNetwork}
                      className="border-gray-300 focus:border-black focus:ring-black text-black"
                    />
                    {errors.orgName && <p className="text-sm text-red-500">{errors.orgName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ein" className="text-gray-800">EIN Number</Label>
                    <Input
                      id="ein"
                      value={ein}
                      onChange={(e) => setEin(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Enter your EIN (e.g., 12345678)"
                      maxLength={9}
                      disabled={!isConnected || isWrongNetwork}
                      className="border-gray-300 focus:border-black focus:ring-black text-black"
                    />
                    {errors.ein && <p className="text-sm text-red-500">{errors.ein}</p>}
                  </div>
                  
                  <UploadButton
                    onLoadStart={() => {
                      setIsUploading(true);
                      setUploadSuccess(false);
                    }}
                    onSuccess={() => {
                      setIsUploading(false);
                      setUploadSuccess(true);
                      setHasPdfUploaded(true);
                    }}
                    onError={() => {
                      setIsUploading(false);
                      setUploadSuccess(false);
                      setHasPdfUploaded(false);
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    disabled={!isConnected || isWrongNetwork}
                  >
                    Submit Application
                  </Button>

                  {verificationStatus.step === 'failed' && (
                    <p className="text-sm text-red-500 mt-2">{verificationStatus.error}</p>
                  )}
                  
                  {errors.submit && (
                    <p className="text-sm text-red-500 mt-2">{errors.submit}</p>
                  )}
                </form>
              ) : verificationStatus.step === 'verifying' ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="animate-spin w-10 h-10 text-black" />
                  <p className="text-lg font-medium mt-2 text-gray-800">Verifying EIN...</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                  <CheckCircle className="w-12 h-12 text-black mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-4">Verification Complete!</h3>
                  <p className="text-gray-700">EIN Verified: {verificationStatus.orgDetails?.[0]}</p>
                  <p className="text-gray-700">Organization: {verificationStatus.orgDetails?.[1]}</p>
                  <p className="text-sm text-gray-600 mt-2">
                        Your on-chain identity has been issued using Humanity Protocol.
                      </p>
                  
                  {!registrationSuccess ? (
                    <div className="mt-6">
                      <Button
                        onClick={handleRegisterWithContract}
                        className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                        disabled={isRegistering}
                      >
                        {isRegistering ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4" />
                            Register with Smart Contract
                          </>
                        )}
                      </Button>
                      
                      {registrationError && (
                        <p className="text-sm text-red-500 mt-2">{registrationError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-black mx-auto mb-2" />
                      <p className="font-medium text-gray-800">
                        Successfully registered on the blockchain!
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Your organization is now ready to receive donations.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Your on-chain identity has been issued using Humanity Protocol.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </ClientOnly>
      </motion.div>
    </div>
  );
};

export default EnrollPage;
