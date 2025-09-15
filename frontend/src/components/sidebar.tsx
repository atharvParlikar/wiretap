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

interface SidebarProps {
  onAddNode: (type: string) => void;
}

export function Sidebar({ onAddNode }: SidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");

  const handleSave = () => {
    // Placeholder for sending request
    console.log("Saving workflow:", workflowName);
    setIsDialogOpen(false);
    setWorkflowName("");
  };

  return (
    <div className="w-48 bg-white border-r border-gray-200 p-3">
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full mb-3 h-8 text-xs bg-blue-600 text-white hover:bg-blue-700"
      >
        Save Workflow
      </Button>
      <h2 className="text-xs font-semibold mb-3 text-gray-700">Add Nodes</h2>
      <div className="space-y-1">
        <Button
          onClick={() => onAddNode("default")}
          className="w-full justify-start h-8 text-left bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-xs"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            Default
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("input")}
          className="w-full justify-start h-8 text-left bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 text-xs"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Input
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("output")}
          className="w-full justify-start h-8 text-left bg-white border border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 text-xs"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Output
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("process")}
          className="w-full justify-start h-8 text-left bg-white border border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 text-xs"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Process
          </div>
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Workflow</DialogTitle>
            <DialogDescription>
              Enter a name for your workflow.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Workflow name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
