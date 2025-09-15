"use client";

import { WorkflowEditor } from "@/components/WorkflowEditor";

export default function WorkflowPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Workflow Maker</h1>
            <nav className="flex space-x-4">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <WorkflowEditor />
      </main>
    </div>
  );
}
