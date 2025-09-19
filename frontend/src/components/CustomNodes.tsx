"use client";

import { Handle, Position } from "@xyflow/react";

const baseNodeClasses =
  "relative border-2 border-gray-600 rounded-xs px-10 py-4 flex items-center";
const labelClasses = "text-xs font-medium";

// Node schemas defining input/output data shapes (only keys, all values are strings)
// This determines which handles are rendered and validates connections
export const nodeSchemas = {
  webhookNode: {
    input: [], // Webhook nodes don't have inputs (they start workflows)
    output: [] // Will be populated with actual parameter names when node is created
  },
  emailNode: {
    input: ["to", "subject", "message"], // Email needs these input fields
    output: [] // Email nodes don't have outputs (they end workflows)
  }
};

export function WebhookNode({
  data,
}: {
  data: { label: string; input: { [key: string]: string }; output: string[] };
}) {
  const hasOutputs = data.output.length > 0;

  return (
    <div className={`${baseNodeClasses} border-green-500 bg-green-50`}>
      <div className={`${labelClasses} text-green-700`}>{data.label}</div>
      {hasOutputs && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-2 h-2 bg-green-500 border border-white absolute -right-1 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}

export function EmailNode({
  data,
}: {
  data: { label: string; input: { [key: string]: string }; output: string[] };
}) {
  const hasInputs = Object.keys(data.input).length > 0;
  const hasOutputs = data.output.length > 0;

  return (
    <div className={`${baseNodeClasses} border-blue-500 bg-blue-50`}>
      {hasInputs && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-2 h-2 bg-blue-500 border border-white absolute -left-1 top-1/2 -translate-y-1/2"
        />
      )}
      <div className={`${labelClasses} text-blue-700`}>{data.label}</div>
      {hasOutputs && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-2 h-2 bg-blue-500 border border-white absolute -right-1 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
