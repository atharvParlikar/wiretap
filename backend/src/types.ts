export type Node = {
  id: string,
  source: string,
  target: string,
}

export type Edge = {
  id: string,
  source: string,
  target: string,
}

export type Graph = {
  nodes: Node[],
  edges: Edge[]
}
