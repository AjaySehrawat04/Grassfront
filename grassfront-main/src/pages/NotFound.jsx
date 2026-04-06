import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl text-muted-foreground">Page not found</p>
      <Button className="mt-4">
        <a href="/" className="flex items-center gap-2">
          Back to Home
          <ArrowRight size={18} />
        </a>
      </Button>
    </div>
  );
}
