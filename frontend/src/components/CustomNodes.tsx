"use client";

import { Handle, Position } from "@xyflow/react";

const baseNodeClasses =
  "relative border-2 border-gray-600 rounded-xs px-10 py-4 flex items-center";
const labelClasses = "text-xs font-medium";

export function WebhookNode({
  data,
}: {
  data: { label: string; params?: string[] };
}) {
  return (
    <div className={`${baseNodeClasses} border-green-500 bg-green-50`}>
      <div className={`${labelClasses} text-green-700`}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-green-500 border border-white absolute -right-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
