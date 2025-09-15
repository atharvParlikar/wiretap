import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Wiretap
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create and manage your workflows with our intuitive visual editor.
            Build complex processes with ease using drag-and-drop functionality.
          </p>
          <div className="space-y-4">
            <Link href="/workflow">
              <Button size="lg" className="text-lg px-8 py-3">
                Open Workflow Maker
              </Button>
            </Link>
            <div className="flex justify-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
