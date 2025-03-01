"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useDonationContract } from '@/hooks/useDonationContract';

interface Nonprofit {
  address: `0x${string}`;
  name: string;
}

interface NonprofitSelectorProps {
  onSelect: (nonprofit: Nonprofit) => void;
  selectedNonprofit?: Nonprofit;
}

export function NonprofitSelector({ onSelect, selectedNonprofit }: NonprofitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nonprofits, setNonprofits] = useState<Nonprofit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { useAllNonprofits } = useDonationContract();
  const { data: nonprofitAddresses, isLoading: loadingAddresses } = useAllNonprofits();
  
  useEffect(() => {
    if (nonprofitAddresses && Array.isArray(nonprofitAddresses)) {
      const formattedNonprofits: Nonprofit[] = nonprofitAddresses.map((address, index) => {
        // Try to get a real name if possible, otherwise use a generated name
        return {
          address: address as `0x${string}`,
          name: `Nonprofit Organization ${index + 1}`
        };
      });
      
      // Add a default nonprofit if none found
      if (formattedNonprofits.length === 0) {
        formattedNonprofits.push({
          address: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
          name: 'Default Nonprofit'
        });
      }
      
      setNonprofits(formattedNonprofits);
      
      // Auto-select first nonprofit if none selected
      if (!selectedNonprofit && formattedNonprofits.length > 0) {
        onSelect(formattedNonprofits[0]);
      }
      
      setIsLoading(false);
    }
  }, [nonprofitAddresses, onSelect, selectedNonprofit]);
  
  if (isLoading || loadingAddresses) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading nonprofits...</span>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedNonprofit?.name || 'Select a nonprofit'}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
          <div className="py-1">
            {nonprofits.map((nonprofit) => (
              <div
                key={nonprofit.address}
                className={`px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
                  selectedNonprofit?.address === nonprofit.address ? 'bg-emerald-50 text-emerald-900' : ''
                }`}
                onClick={() => {
                  onSelect(nonprofit);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <span className="truncate">{nonprofit.name}</span>
                  <span className="ml-2 text-xs text-gray-500 truncate">
                    {`${nonprofit.address.substring(0, 6)}...${nonprofit.address.substring(
                      nonprofit.address.length - 4
                    )}`}
                  </span>
                </div>
                
                {selectedNonprofit?.address === nonprofit.address && (
                  <Check className="h-4 w-4 text-emerald-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 