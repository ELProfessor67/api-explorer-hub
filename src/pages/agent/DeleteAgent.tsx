import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export default function DeleteAgent() {
  const sampleResponse = `{
  "success": true,
  "message": "Agent successfully deleted",
  "deleted_at": "2024-01-16T15:00:00Z"
}`;

  const parameters = [
    {
      name: "agent_id",
      type: "string",
      required: true,
      description: "The unique identifier of the agent to delete",
      default: "agent_abc123xyz",
    },
  ];

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="delete">DELETE</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /agents/{"{agent_id}"}
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Delete Agent</h1>
          <p className="text-muted-foreground max-w-2xl">
            Permanently delete an agent. This action cannot be undone. All
            associated data including call history will be retained but
            unlinked.
          </p>
        </div>

        {/* Warning */}
        <div className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-destructive">Danger Zone</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Deleting an agent is permanent and cannot be undone. Make sure to
              reassign any phone numbers before deletion.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Documentation */}
          <div className="space-y-8">
            {/* Path Parameters */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Path Parameters
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Parameter
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-card">
                      <td className="px-4 py-3">
                        <code className="text-primary">agent_id</code>
                        <span className="ml-2 text-[10px] text-destructive">
                          required
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        string
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        Unique identifier of the agent to delete
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Error Codes */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Error Codes
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Code
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { code: "404", description: "Agent not found" },
                      { code: "409", description: "Agent has active phone numbers assigned" },
                      { code: "403", description: "Insufficient permissions" },
                    ].map((row) => (
                      <tr key={row.code} className="bg-card">
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-destructive border-destructive/30">
                            {row.code}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Code Example */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Example</h2>
              <CodeBlock
                code={`const response = await fetch('https://api.example.com/v1/agents/agent_abc123xyz', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

if (response.ok) {
  console.log('Agent deleted successfully');
}`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="DELETE"
              endpoint="/v1/agents/{agent_id}"
              parameters={parameters}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
