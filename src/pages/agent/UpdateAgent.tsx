import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function UpdateAgent() {
  const requestBody = `{
  "name": "Updated Sales Assistant",
  "voice": "nova",
  "system_prompt": "You are an updated helpful assistant...",
  "temperature": 0.8
}`;

  const sampleResponse = `{
  "id": "agent_abc123xyz",
  "name": "Updated Sales Assistant",
  "voice": "nova",
  "language": "en-US",
  "system_prompt": "You are an updated helpful assistant...",
  "greeting": "Hello! How can I help you today?",
  "model": "gpt-4",
  "temperature": 0.8,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:22:00Z",
  "status": "active"
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
            <Badge variant="put">PUT</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /agents/{"{agent_id}"}
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Update Agent</h1>
          <p className="text-muted-foreground max-w-2xl">
            Update an existing agent's configuration. Only provide the fields you
            want to update - all other fields will remain unchanged.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Documentation */}
          <div className="space-y-8">
            {/* Request Body */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Request Body
              </h2>
              <p className="text-sm text-muted-foreground">
                All fields are optional. Only include fields you want to update.
              </p>
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
                      { field: "name", type: "string", description: "Updated display name" },
                      { field: "voice", type: "string", description: "Updated voice ID" },
                      { field: "language", type: "string", description: "Updated language code" },
                      { field: "system_prompt", type: "string", description: "Updated system instructions" },
                      { field: "greeting", type: "string", description: "Updated greeting message" },
                      { field: "temperature", type: "number", description: "Updated creativity (0-1)" },
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
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Sales Assistant',
    voice: 'nova'
  })
});

const agent = await response.json();
console.log('Updated:', agent.updated_at);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="PUT"
              endpoint="/v1/agents/{agent_id}"
              parameters={parameters}
              requestBody={requestBody}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
