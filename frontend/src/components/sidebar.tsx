"use client";

import { Button } from "@/components/ui/button";

interface SidebarProps {
  onAddNode: (type: string) => void;
}

export function Sidebar({ onAddNode }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Add Nodes</h2>
      <div className="space-y-3">
        <Button
          onClick={() => onAddNode("default")}
          className="w-full justify-start h-12 text-left"
          variant="outline"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
            Default Node
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("input")}
          className="w-full justify-start h-12 text-left"
          variant="outline"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
            Input Node
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("output")}
          className="w-full justify-start h-12 text-left"
          variant="outline"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
            Output Node
          </div>
        </Button>
        <Button
          onClick={() => onAddNode("process")}
          className="w-full justify-start h-12 text-left"
          variant="outline"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
            Process Node
          </div>
        </Button>
      </div>
    </div>
  );
}
