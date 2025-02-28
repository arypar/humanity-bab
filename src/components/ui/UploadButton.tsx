"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (file: File) => void;
  className?: string;
}

const UploadButton = React.forwardRef<HTMLInputElement, UploadButtonProps>(
  ({ onFileSelect, className, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        onFileSelect?.(file);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "application/pdf") {
        onFileSelect?.(file);
      }
    };

    return (
      <motion.label
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-xl font-medium",
          "bg-primary text-primary-foreground shadow-sm",
          "transition-colors duration-200",
          isDragging ? "ring-2 ring-ring" : "hover:bg-primary/90",
          "cursor-pointer select-none",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-5 h-5" />
        <span>Upload PDF</span>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileSelect}
          ref={ref}
          {...props}
        />
      </motion.label>
    );
  }
);

UploadButton.displayName = "UploadButton";

export default UploadButton;
