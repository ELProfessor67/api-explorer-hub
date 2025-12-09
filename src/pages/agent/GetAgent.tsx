import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function GetAgent() {
  const sampleResponse = `{
  "id": "agent_abc123xyz",
  "name": "Sales Assistant",
  "voice": "alloy",
  "language": "en-US",
  "system_prompt": "You are a helpful sales assistant...",
  "greeting": "Hello! How can I help you today?",
  "model": "gpt-4",
  "temperature": 0.7,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "status": "active",
  "total_calls": 142,
  "average_duration": 245
}`;

  const parameters = [
    {
      name: "agent_id",
      type: "string",
      required: true,
      description: "The unique identifier of the agent",
      default: "agent_abc123xyz",
    },
  ];

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="get">GET</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /agents/{"{agent_id}"}
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Get Agent</h1>
          <p className="text-muted-foreground max-w-2xl">
            Retrieve detailed information about a specific agent, including its
            configuration, usage statistics, and current status.
          </p>
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
                        Unique identifier of the agent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Response Fields */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Response Fields
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Field
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
                    {[
                      { field: "id", type: "string", description: "Unique agent identifier" },
                      { field: "name", type: "string", description: "Agent display name" },
                      { field: "status", type: "string", description: "Current status (active, inactive, error)" },
                      { field: "total_calls", type: "integer", description: "Total number of calls handled" },
                      { field: "average_duration", type: "integer", description: "Average call duration in seconds" },
                    ].map((row) => (
                      <tr key={row.field} className="bg-card">
                        <td className="px-4 py-3">
                          <code className="text-primary">{row.field}</code>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {row.type}
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
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const agent = await response.json();
console.log(agent.name, agent.status);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="GET"
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
