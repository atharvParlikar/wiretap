import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  onConnect: (params: Connection) => void;
  addNode: (type: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  onConnect: (params) =>
    set((state) => ({
      edges: addEdge(params, state.edges),
    })),
  addNode: (type, params?: string[]) => {
    const nodeTypes = {
      default: "pixelNode",
      input: "inputPixelNode",
      output: "outputPixelNode",
      process: "processPixelNode",
      webhook: "webhookNode",
    };

    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: nodeTypes[type as keyof typeof nodeTypes] || "pixelNode",
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: `${type.toUpperCase()}`, ...(params && { params }) },
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },
}));
