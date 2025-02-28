"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import UploadButton from "@/components/ui/UploadButton";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface VerificationStatus {
  step: 'idle' | 'scanning' | 'verifying' | 'security' | 'complete';
  orgType?: string;
  error?: string;
}

const EnrollPage: React.FC = () => {
  const [orgName, setOrgName] = React.useState("");
  const [ein, setEin] = React.useState("");
  const [errors, setErrors] = React.useState<{
    orgName?: string;
    ein?: string;
    submit?: string;
  }>({});
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus>({ step: 'idle' });
  const [hasPdfUploaded, setHasPdfUploaded] = React.useState(false);
  
  const loadingSteps = {
    scanning: {
      title: "Scanning Document",
      description: "Extracting information from your 501(c)(3) determination letter..."
    },
    verifying: {
      title: "Verifying Status",
      description: "Cross-referencing with IRS tax-exempt database..."
    },
    security: {
      title: "Security Checks",
      description: "Performing final security verification..."
    },
    complete: {
      title: "Registration Complete!",
      description: "Your organization has been successfully verified."
    }
  };

  // EIN validation pattern: XX-XXXXXXX
  const einPattern = /^\d{2}-\d{7}$/;

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Organization name validation
    if (!orgName.trim()) {
      newErrors.orgName = "Organization name is required";
    } else if (orgName.trim().length < 3) {
      newErrors.orgName = "Organization name must be at least 3 characters";
    }

    // EIN validation
    if (!ein) {
      newErrors.ein = "EIN is required";
    } else if (!einPattern.test(ein)) {
      newErrors.ein = "EIN must be in format XX-XXXXXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and hyphen
    const cleaned = value.replace(/[^\d-]/g, '');
    
    // Auto-format EIN as user types
    if (cleaned.length <= 2) {
      setEin(cleaned);
    } else if (cleaned.length <= 10) {
      const parts = cleaned.split('-');
      if (parts.length === 1) {
        setEin(`${cleaned.slice(0, 2)}-${cleaned.slice(2)}`);
      } else {
        setEin(cleaned);
      }
    }
  };

  const simulateVerification = async () => {
    try {
      // Simulate document scanning
      setVerificationStatus({ step: 'scanning' });
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate IRS database check
      setVerificationStatus({ step: 'verifying' });
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Simulate security checks
      setVerificationStatus({ step: 'security' });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Complete with success
      setVerificationStatus({
        step: 'complete',
        orgType: 'Public Charity' // This would come from your backend
      });
    } catch (error) {
      setVerificationStatus({
        step: 'idle',
        error: 'Verification failed. Please try again.'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    try {
      await simulateVerification();
    } catch (err) {
      setErrors({ submit: "An error occurred while submitting. Please try again." });
    }
  };

  const renderVerificationStatus = () => {
    const currentStep = verificationStatus.step;
    if (currentStep === 'idle') return null;

    if (currentStep === 'complete') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 p-6 rounded-lg border border-emerald-200"
        >
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-center text-emerald-800 mb-4">
            Welcome to the Community!
          </h3>
          <div className="space-y-3 text-center">
            <p className="text-gray-700">Your organization has been successfully verified.</p>
            <div className="bg-white p-4 rounded-md">
              <p className="font-medium">Organization Details:</p>
              <p className="text-gray-600">{orgName}</p>
              <p className="text-gray-600">EIN: {ein}</p>
              <p className="text-gray-600">Type: {verificationStatus.orgType}</p>
            </div>
            <p className="text-emerald-600 font-medium">
              You can now start accepting crypto donations!
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Upload className="w-8 h-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-lg font-medium mt-2">
            {loadingSteps[currentStep].title}
          </h3>
          <p className="text-sm text-gray-500">
            {loadingSteps[currentStep].description}
          </p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-emerald-600 h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: currentStep === 'scanning' ? "33%" :
                     currentStep === 'verifying' ? "66%" :
                     currentStep === 'security' ? "90%" : "100%" 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-emerald-800 mb-4"
          >
            Enroll Your Nonprofit
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600"
          >
            Register your 501(c)(3) organization to start accepting tax-deductible crypto donations
          </motion.p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent>
            {verificationStatus.step === 'idle' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Enter your organization's legal name"
                    className={`w-full ${errors.orgName ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors.orgName}
                  />
                  {errors.orgName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.orgName}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="ein">EIN Number</Label>
                  <Input
                    id="ein"
                    value={ein}
                    onChange={handleEinChange}
                    placeholder="XX-XXXXXXX"
                    className={`w-full ${errors.ein ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors.ein}
                    maxLength={10}
                  />
                  {errors.ein && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.ein}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <Label>501(c)(3) Determination Letter</Label>
                  <div className="p-6 text-center">
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
                    <p className="text-sm text-gray-500 mt-2">
                      Upload your IRS determination letter (PDF format)
                    </p>
                    {uploadSuccess && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-emerald-600 mt-2 flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>File uploaded successfully</span>
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.submit}</span>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Submit Application"}
                  </Button>
                </motion.div>
              </form>
            ) : (
              renderVerificationStatus()
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnrollPage;
