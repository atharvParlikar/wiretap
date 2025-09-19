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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

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
        initialMappings[input] = "";
      });
      setMappings(initialMappings);
    }
  }, [open, targetInputs]);

  const handleSave = () => {
    onSaveMapping(mappings);
    onOpenChange(false);
  };

  const updateMapping = (field: keyof typeof mappings, value: string) => {
    setMappings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Node Inputs</DialogTitle>
          <DialogDescription>
            Enter absolute values or select template references from the source node.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {targetInputs.map((inputField) => (
            <div key={inputField} className="space-y-2">
              <label className="text-sm font-medium capitalize">{inputField}</label>
              <div className="flex gap-2">
                <Input
                  value={mappings[inputField] || ""}
                  onChange={(e) => updateMapping(inputField, e.target.value)}
                  placeholder={`Type a value or use template button`}
                  className="flex-1"
                />
                <Select
                  onValueChange={(value) => {
                    if (value && value !== "none") {
                      updateMapping(inputField, value);
                    }
                  }}
                >
                  <SelectTrigger className="w-10 p-0">
                    <ChevronDown className="h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      Templates
                    </SelectItem>
                    {sourceOutputs.map((param, index) => (
                      <SelectItem key={index} value={`{{${param}}}`}>
                        {param}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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