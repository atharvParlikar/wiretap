"use client";

import {
  ReactFlow,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Sidebar } from "./sidebar";
import {
  PixelNode,
  InputPixelNode,
  OutputPixelNode,
  ProcessPixelNode,
} from "./CustomNodes";
import { useWorkflowStore } from "@/lib/workflowStore";

export function WorkflowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useWorkflowStore();

  const nodeTypes = {
    pixelNode: PixelNode,
    inputPixelNode: InputPixelNode,
    outputPixelNode: OutputPixelNode,
    processPixelNode: ProcessPixelNode,
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
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.Straight}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#6b7280", strokeWidth: 1 },
          }}
        />
      </div>
    </div>
  );
}
