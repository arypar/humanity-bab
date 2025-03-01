"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from 'wagmi';
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import UploadButton from "@/components/ui/UploadButton";

interface VerificationStatus {
  step: 'idle' | 'verifying' | 'complete' | 'failed';
  orgDetails?: string[];
  error?: string;
}

const EnrollPage: React.FC = () => {
  const { address } = useAccount(); 
  const [credential, setCredential] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [ein, setEin] = React.useState("");
  const [errors, setErrors] = React.useState<{ orgName?: string; ein?: string; submit?: string }>({});
  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus>({ step: 'idle' });



  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [hasPdfUploaded, setHasPdfUploaded] = React.useState(false);
  const einPattern = /^\d{2}-\d{7}$/;

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

    try {
      const response = await fetch("/api/verifyEIN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ein, orgName }),
      });

      const data = await response.json();
      console.log("Received API response:", data);

      if (data.success) {

        const response = await fetch('https://issuer.humanity.org/credentials/issue', {
          method: 'POST',
          headers: {
            "X-API-Token": "ce9cae73-4a03-472c-91ee-d630e86511c0",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "subject_address": address,
            "claims": {
              "nonprofit": "true",
            }
          })
      });
      if(response.status == 200) {
        setVerificationStatus({ step: "complete", orgDetails: data.organization });
      } else {
        setVerificationStatus({ step: "failed", error: "Verification failed. Please try again." });
      }

      } else {
        setVerificationStatus({ step: "failed", error: data.error });
      }
    } catch (error) {
      console.error("Error during EIN verification:", error);
      setVerificationStatus({ step: "failed", error: "Verification failed. Please try again." });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">Enroll Your Nonprofit</h1>
          <p className="text-gray-600">Register your 501(c)(3) organization to start accepting tax-deductible crypto donations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent>
            {verificationStatus.step === 'idle' || verificationStatus.step === 'failed' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Enter organization's legal name"
                  />
                  {errors.orgName && <p className="text-sm text-red-500">{errors.orgName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ein">EIN Number</Label>
                  <Input
                    id="ein"
                    value={ein}
                    onChange={(e) => setEin(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="XX-XXXXXXX"
                    maxLength={10}
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

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Submit Application
                </Button>

                {verificationStatus.step === 'failed' && (
                  <p className="text-sm text-red-500 mt-2">{verificationStatus.error}</p>
                )}
              </form>
            ) : verificationStatus.step === 'verifying' ? (
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin w-10 h-10 text-emerald-600" />
                <p className="text-lg font-medium mt-2">Verifying EIN...</p>
              </div>
            ) : (
              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Verification Complete!</h3>
                <p className="text-gray-700">EIN Verified: {verificationStatus.orgDetails?.[0]}</p>
                <p className="text-gray-700">Organization: {verificationStatus.orgDetails?.[1]}</p>
                <p className="text-gray-700">Credential: {credential}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnrollPage;
