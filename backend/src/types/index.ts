export type Node = {
  id: string,
  type: string,
  data: {
    input: Record<string, string> | string[],
    output: string[]
  }
}

export type Edge = {
  source: string,
  target: string,
}

export type Graph = {
  nodes: Node[],
  edges: Edge[]
}
