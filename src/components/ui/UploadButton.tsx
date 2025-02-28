"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

const UploadButton = React.forwardRef<HTMLInputElement, UploadButtonProps>(
  ({ onFileSelect, className, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedFile(null);
      onFileSelect?.(null);
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
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
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 flex-1"
            >
              <FileText className="w-5 h-5" />
              <span className="flex-1 truncate">{selectedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="p-1 hover:bg-primary-foreground/20 rounded-md transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload PDF</span>
            </motion.div>
          )}
        </AnimatePresence>
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
