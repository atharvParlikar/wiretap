"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NodeMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceOutputs: string[];
  targetInputs: string[];
  onSaveMapping: (mappings: { [key: string]: string }) => void;
}

export function NodeMappingDialog({
  open,
  onOpenChange,
  sourceOutputs,
  targetInputs,
  onSaveMapping,
}: NodeMappingDialogProps) {
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open && targetInputs) {
      const initialMappings: { [key: string]: string } = {};
      targetInputs.forEach(input => {
        initialMappings[input] = "none";
      });
      setMappings(initialMappings);
    }
  }, [open, targetInputs]);

  const handleSave = () => {
    // Convert "none" back to empty strings for the actual mapping
    const cleanMappings: { [key: string]: string } = {};
    Object.entries(mappings).forEach(([key, value]) => {
      cleanMappings[key] = value === "none" ? "" : value;
    });
    onSaveMapping(cleanMappings);
    onOpenChange(false);
  };

  const updateMapping = (field: keyof typeof mappings, value: string) => {
    setMappings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Map Webhook Parameters to Email</DialogTitle>
          <DialogDescription>
            Select which webhook parameter should be used for each email field.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {targetInputs.map((inputField) => (
            <div key={inputField} className="space-y-2">
              <label className="text-sm font-medium capitalize">{inputField}</label>
              <Select
                value={mappings[inputField] || "none"}
                onValueChange={(value) => updateMapping(inputField, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parameter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {sourceOutputs.map((param, index) => (
                    <SelectItem key={index} value={param}>
                      {param}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Mapping</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}