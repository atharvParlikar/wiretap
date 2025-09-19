"use client";

import { ReactFlow, ConnectionLineType, type Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Sidebar } from "./sidebar";
import {
  WebhookNode,
  EmailNode,
  nodeSchemas,
} from "./CustomNodes";
import { NodeMappingDialog } from "./NodeMappingDialog";
import { useWorkflowStore } from "@/lib/workflowStore";
import { useState } from "react";

export function WorkflowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, updateNodeMappings } =
    useWorkflowStore();
  const [isNodeMappingDialogOpen, setIsNodeMappingDialogOpen] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);
  const [sourceOutputs, setSourceOutputs] = useState<string[]>([]);
  const [targetInputs, setTargetInputs] = useState<string[]>([]);

  const nodeTypes = {
    webhookNode: WebhookNode,
    emailNode: EmailNode,
  };

  const handleConnect = (params: Connection) => {
    const targetNode = nodes.find(node => node.id === params.target);
    const sourceNode = nodes.find(node => node.id === params.source);

    if (!targetNode || !sourceNode) return;

    const sourceSchema = nodeSchemas[sourceNode.type as keyof typeof nodeSchemas];
    const targetSchema = nodeSchemas[targetNode.type as keyof typeof nodeSchemas];

    if (!sourceSchema || !targetSchema) {
      // Unknown node types, allow connection
      onConnect(params);
      return;
    }

    // Check if this is a valid connection (source has output, target has input)
    const isValidConnection = (sourceNode.data.output && sourceNode.data.output.length > 0) &&
                             (targetNode.data.input && Object.keys(targetNode.data.input).length > 0);

    if (isValidConnection) {
      // Show mapping dialog for valid input-output connections
      setPendingConnection(params);
      setSourceOutputs(sourceNode.data.output as string[] || []);
      setTargetInputs(targetSchema.input);
      setIsNodeMappingDialogOpen(true);
    } else {
      // Invalid connection (output to output or input to input), don't allow
      console.warn("Invalid connection: cannot connect output to output or input to input");
    }
  };

  const handleSaveMapping = (mappings: { [key: string]: string }) => {
    if (pendingConnection) {
      // Update the target node's mappings
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
        <NodeMappingDialog
          open={isNodeMappingDialogOpen}
          onOpenChange={setIsNodeMappingDialogOpen}
          sourceOutputs={sourceOutputs}
          targetInputs={targetInputs}
          onSaveMapping={handleSaveMapping}
        />
      </div>
    </div>
  );
}
