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

interface EmailMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webhookParams: string[];
  onSaveMapping: (mappings: { to: string; subject: string; message: string }) => void;
}

export function EmailMappingDialog({
  open,
  onOpenChange,
  webhookParams,
  onSaveMapping,
}: EmailMappingDialogProps) {
  const [mappings, setMappings] = useState({
    to: "none",
    subject: "none",
    message: "none",
  });

  useEffect(() => {
    if (open) {
      setMappings({
        to: "none",
        subject: "none",
        message: "none",
      });
    }
  }, [open]);

  const handleSave = () => {
    // Convert "none" back to empty strings for the actual mapping
    const cleanMappings = {
      to: mappings.to === "none" ? "" : mappings.to,
      subject: mappings.subject === "none" ? "" : mappings.subject,
      message: mappings.message === "none" ? "" : mappings.message,
    };
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
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={mappings.to} onValueChange={(value) => updateMapping("to", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {webhookParams.map((param, index) => (
                  <SelectItem key={index} value={param}>
                    {param}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Select value={mappings.subject} onValueChange={(value) => updateMapping("subject", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {webhookParams.map((param, index) => (
                  <SelectItem key={index} value={param}>
                    {param}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Select value={mappings.message} onValueChange={(value) => updateMapping("message", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {webhookParams.map((param, index) => (
                  <SelectItem key={index} value={param}>
                    {param}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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