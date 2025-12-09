import { ApiSidebar } from "@/components/ApiSidebar";

interface ApiLayoutProps {
  children: React.ReactNode;
}

export function ApiLayout({ children }: ApiLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <ApiSidebar />
      <main className="md:pl-72">
        <div className="max-w-5xl mx-auto px-6 py-12 md:px-12">
          {children}
        </div>
      </main>
    </div>
  );
}
