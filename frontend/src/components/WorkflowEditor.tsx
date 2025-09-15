"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  ReactFlow,
  ConnectionLineType,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import { Sidebar } from "./sidebar";
import {
  PixelNode,
  InputPixelNode,
  OutputPixelNode,
  ProcessPixelNode,
} from "./CustomNodes";

export function WorkflowEditor() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onAddNode = useCallback((type: string) => {
    const nodeTypes = {
      default: "pixelNode",
      input: "inputPixelNode",
      output: "outputPixelNode",
      process: "processPixelNode",
    };

    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: nodeTypes[type as keyof typeof nodeTypes] || "pixelNode",
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: `${type.toUpperCase()}` },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const nodeTypes = {
    pixelNode: PixelNode,
    inputPixelNode: InputPixelNode,
    outputPixelNode: OutputPixelNode,
    processPixelNode: ProcessPixelNode,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onAddNode={onAddNode} />
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
            type: "step",
            style: { stroke: "#6b7280", strokeWidth: 1 },
          }}
        />
      </div>
    </div>
  );
}
