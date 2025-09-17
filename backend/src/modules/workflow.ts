import type { Graph } from "../types";
import { GraphRunner, type NodeHandlerMap } from "./graphRunner";
import { functionMap } from "./nodes/functionMap";

export class Workflow {
  graphRunner: GraphRunner;

  constructor(graph: Graph) {
    this.graphRunner = new GraphRunner(graph, functionMap);
  }

  invoke(data: any) {
    this.graphRunner.run(data);
  }
}
