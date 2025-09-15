"use client";

import { Handle, Position } from "@xyflow/react";

const baseNodeClasses = "relative border-2 border-gray-600 rounded-xs px-10 py-4 flex items-center";
const labelClasses = "text-xs font-medium";

export function PixelNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeClasses}`}>
      <div className={`${labelClasses} text-gray-700`}>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-400 border absolute -left-1 top-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-400 border absolute -right-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export function InputPixelNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeClasses}`}>
      <div className={`${labelClasses}`}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-blue-500 border border-white absolute -right-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export function OutputPixelNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeClasses}`}>
      <div className={`${labelClasses}`}>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-red-500 border border-white absolute -left-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export function ProcessPixelNode({ data }: { data: { label: string } }) {
  return (
    <div className={`${baseNodeClasses}`}>
      <div className={`${labelClasses}`}>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-purple-500 border border-white absolute -left-1 top-1/2 -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-purple-500 border border-white absolute -right-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
