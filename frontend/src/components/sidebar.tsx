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
import axios from "axios";
import { useWorkflowStore } from "@/lib/workflowStore";
import { WebhookDialog } from "./WebhookDialog";

interface SidebarProps {
  onAddNode: (type: string, params?: string[]) => void;
}

export function Sidebar({ onAddNode }: SidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const { nodes, edges } = useWorkflowStore();

  const handleSave = async () => {
    await axios.post(
      "http://localhost:8000/api/workflow/create",
      {
        name: workflowName,
        graph: {
          nodes: nodes.map((n) => {
            id: n.id;
          }),
          edges,
        },
      },
      {
        withCredentials: true,
      },
    );

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
          onClick={() => setIsWebhookDialogOpen(true)}
          className="w-full justify-start h-8 text-left bg-white border border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 text-xs"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Webhook
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
      <WebhookDialog
        open={isWebhookDialogOpen}
        onOpenChange={setIsWebhookDialogOpen}
        onAddNode={(params) => onAddNode("webhook", params)}
      />
    </div>
  );
}
