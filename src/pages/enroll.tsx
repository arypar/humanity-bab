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

const EnrollPage: React.FC = () => {
  const [orgName, setOrgName] = React.useState("");
  const [ein, setEin] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!orgName || !ein) {
      setError("Please fill in all required fields");
      return;
    }

    // TODO: Implement form submission logic
    try {
      // API call would go here
      console.log("Form submitted:", { orgName, ein });
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
    }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter your organization's legal name"
                  className="w-full"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="ein">EIN Number</Label>
                <Input
                  id="ein"
                  value={ein}
                  onChange={(e) => setEin(e.target.value)}
                  placeholder="XX-XXXXXXX"
                  className="w-full"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Label>501(c)(3) Determination Letter</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <UploadButton />
                  <p className="text-sm text-gray-500 mt-2">
                    Upload your IRS determination letter (PDF format)
                  </p>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnrollPage;
