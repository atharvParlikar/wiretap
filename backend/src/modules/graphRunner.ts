import type { Graph, Node } from "../types";

export type NodeHandler = (inputs: Record<string, any>) => Promise<Record<string, any>> | Record<string, any>;

export type NodeHandlerMap = Record<string, NodeHandler>;

export class GraphRunner {
  private graph: Graph;
  private handlers: NodeHandlerMap;

  constructor(graph: Graph, handlers: NodeHandlerMap) {
    this.graph = graph;
    this.handlers = handlers;
  }

  async run(initialState: Record<string, any> = {}) {
    const state: Record<string, any> = { ...initialState };

    const order = this.topologicalSort();

    for (const node of order) {
      if (node.type === "webhookNode") {
        node.data.output.forEach((param: string) => {
          if (param in initialState) {
            state[param] = initialState[param];
          }
        });
        continue;
      }

      const handler = this.handlers[node.type];
      if (!handler) throw new Error(`No handler found for node type "${node.type}"`);

      const inputs: Record<string, any> = {};
      if (Array.isArray(node.data.input)) {
        node.data.input.forEach((key: string) => {
          inputs[key] = state[key];
        });
      } else {
        for (const [inputKey, value] of Object.entries(node.data.input)) {
          if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
            const param = value.slice(2, -2);
            inputs[inputKey] = state[param];
          } else {
            inputs[inputKey] = value;
          }
        }
      }

      const outputs = await handler(inputs);

      node.data.output.forEach((outputKey: string) => {
        if (!(outputKey in outputs)) {
          throw new Error(`Node "${node.id}" expected output "${outputKey}" but handler didn't return it`);
        }
        state[outputKey] = outputs[outputKey];
      });
    }

    return state;
  }

  private topologicalSort(): Node[] {
    const inDegree: Record<string, number> = {};
    const nodeMap: Record<string, Node> = {};

    for (const node of this.graph.nodes) {
      inDegree[node.id] = 0;
      nodeMap[node.id] = node;
    }

    for (const edge of this.graph.edges) {
      inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
    }

    const queue = Object.keys(inDegree).filter((id) => inDegree[id] === 0);
    const sorted: Node[] = [];

    while (queue.length > 0) {
      const id = queue.shift()!;
      sorted.push(nodeMap[id]!);

      for (const edge of this.graph.edges) {
        if (edge.source === id) {
          const targetDegree = inDegree[edge.target];
          if (targetDegree !== undefined) {
            const newDegree = targetDegree - 1;
            inDegree[edge.target] = newDegree;
            if (newDegree === 0 && nodeMap[edge.target]) queue.push(edge.target);
          }
        }
      }
    }

    if (sorted.length !== this.graph.nodes.length) {
      throw new Error("Graph has cycles — topological sort failed.");
    }

    return sorted;
  }
}
