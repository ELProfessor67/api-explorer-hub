import { ApiLayout } from "@/components/ApiLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Key, Shield, Zap, BookOpen } from "lucide-react";

export default function Introduction() {
  return (
    <ApiLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Hero */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/30">
              v1.0.0
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            API <span className="text-gradient">Reference</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Build powerful voice AI applications with our comprehensive API. 
            Create intelligent agents, manage call history, and scale your 
            communications infrastructure.
          </p>
        </section>

        {/* Quick Start */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            Quick Start
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Get API Key",
                description: "Create an account and generate your API key from the dashboard.",
              },
              {
                step: "02",
                title: "Make Request",
                description: "Use your API key to authenticate requests to any endpoint.",
              },
              {
                step: "03",
                title: "Build & Scale",
                description: "Integrate our APIs into your application and scale as needed.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Key className="w-6 h-6 text-primary" />
            Authentication
          </h2>
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <p className="text-muted-foreground">
              All API requests require authentication using an API key. Include your 
              API key in the request header:
            </p>
            <CodeBlock
              code={`curl -X GET "https://api.example.com/v1/agents" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              title="Example Request"
            />
          </div>
        </section>

        {/* Creating API Key */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            Creating an API Key
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Follow these steps to generate your API key:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Sign in to Dashboard",
                  description:
                    "Navigate to dashboard.example.com and sign in with your account credentials.",
                },
                {
                  title: "Go to API Settings",
                  description:
                    'Click on "Settings" in the sidebar, then select "API Keys" from the menu.',
                },
                {
                  title: "Generate New Key",
                  description:
                    'Click "Create New Key", give it a name, select the required permissions, and click "Generate".',
                },
                {
                  title: "Copy & Secure",
                  description:
                    "Copy your API key immediately. For security reasons, it won't be shown again.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Base URL */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            Base URL
          </h2>
          <div className="p-6 rounded-xl bg-card border border-border">
            <p className="text-muted-foreground mb-4">
              All API endpoints are relative to the base URL:
            </p>
            <div className="px-4 py-3 rounded-lg bg-muted font-mono text-sm text-primary">
              https://api.example.com/v1
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Rate Limits</h2>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Requests/min
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Requests/day
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-card">
                  <td className="px-6 py-4 text-foreground">Free</td>
                  <td className="px-6 py-4 text-muted-foreground">60</td>
                  <td className="px-6 py-4 text-muted-foreground">1,000</td>
                </tr>
                <tr className="bg-card">
                  <td className="px-6 py-4 text-foreground">Pro</td>
                  <td className="px-6 py-4 text-muted-foreground">300</td>
                  <td className="px-6 py-4 text-muted-foreground">50,000</td>
                </tr>
                <tr className="bg-card">
                  <td className="px-6 py-4 text-foreground">Enterprise</td>
                  <td className="px-6 py-4 text-muted-foreground">Unlimited</td>
                  <td className="px-6 py-4 text-muted-foreground">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ApiLayout>
  );
}
