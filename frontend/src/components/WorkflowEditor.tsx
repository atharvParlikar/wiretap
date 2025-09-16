"use client";

import { ReactFlow, ConnectionLineType, type Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Sidebar } from "./sidebar";
import {
  WebhookNode,
  EmailNode,
} from "./CustomNodes";
import { EmailMappingDialog } from "./EmailMappingDialog";
import { useWorkflowStore } from "@/lib/workflowStore";
import { useState } from "react";

export function WorkflowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, updateNodeMappings } =
    useWorkflowStore();
  const [isEmailMappingDialogOpen, setIsEmailMappingDialogOpen] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);
  const [webhookParams, setWebhookParams] = useState<string[]>([]);

  const nodeTypes = {
    webhookNode: WebhookNode,
    emailNode: EmailNode,
  };

  const handleConnect = (params: Connection) => {
    const targetNode = nodes.find(node => node.id === params.target);
    const sourceNode = nodes.find(node => node.id === params.source);

    if (targetNode?.type === "emailNode" && sourceNode?.type === "webhookNode") {
      // Show mapping dialog for email node connection
      setPendingConnection(params);
      setWebhookParams(sourceNode.data.params as string[] || []);
      setIsEmailMappingDialogOpen(true);
    } else {
      // Normal connection
      onConnect(params);
    }
  };

  const handleSaveMapping = (mappings: { to: string; subject: string; message: string }) => {
    if (pendingConnection) {
      // Update the email node's mappings
      updateNodeMappings(pendingConnection.target!, mappings);
      // Create the connection
      onConnect(pendingConnection);
      setPendingConnection(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onAddNode={addNode} />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.Straight}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#6b7280", strokeWidth: 1 },
          }}
        />
        <EmailMappingDialog
          open={isEmailMappingDialogOpen}
          onOpenChange={setIsEmailMappingDialogOpen}
          webhookParams={webhookParams}
          onSaveMapping={handleSaveMapping}
        />
      </div>
    </div>
  );
}
