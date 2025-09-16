"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface WebhookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNode: (params: string[]) => void;
}

interface Param {
  id: string;
  name: string;
}

export function WebhookDialog({
  open,
  onOpenChange,
  onAddNode,
}: WebhookDialogProps) {
  const [params, setParams] = useState<Param[]>([{ id: "1", name: "" }]);

  const addParam = () => {
    const newParam: Param = {
      id: Date.now().toString(),
      name: "",
    };
    setParams([...params, newParam]);
  };

  const updateParam = (id: string, value: string) => {
    setParams(
      params.map((param) =>
        param.id === id ? { ...param, name: value } : param,
      ),
    );
  };

  const removeParam = (id: string) => {
    if (params.length > 1) {
      setParams(params.filter((param) => param.id !== id));
    }
  };

  const handleAddNode = () => {
    const paramList: string[] = params
      .map((param) => param.name.trim())
      .filter((name) => name.length > 0);
    onAddNode(paramList);
    onOpenChange(false);
    setParams([{ id: "1", name: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Webhook Node</DialogTitle>
          <DialogDescription>
            Configure parameters for your webhook node.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Parameters</label>
            {params.map((param, index) => (
              <div key={param.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Parameter name"
                  value={param.name}
                  onChange={(e) => updateParam(param.id, e.target.value)}
                  className="flex-1"
                />
                {params.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeParam(param.id)}
                    className="px-2"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={addParam} variant="outline" className="w-full">
            Add Parameter
          </Button>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddNode}>Add Node</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
