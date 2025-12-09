import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function CreateAgent() {
  const requestBody = `{
  "name": "Sales Assistant",
  "voice": "alloy",
  "language": "en-US",
  "system_prompt": "You are a helpful sales assistant...",
  "greeting": "Hello! How can I help you today?",
  "model": "gpt-4",
  "temperature": 0.7
}`;

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
  "status": "active"
}`;

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="post">POST</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /agents
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create Agent</h1>
          <p className="text-muted-foreground max-w-2xl">
            Create a new AI voice agent with custom configuration. Agents can be
            assigned to phone numbers and handle inbound/outbound calls.
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
                      {
                        field: "name",
                        type: "string",
                        required: true,
                        description: "Display name for the agent",
                      },
                      {
                        field: "voice",
                        type: "string",
                        required: true,
                        description: "Voice ID (alloy, echo, fable, onyx, nova, shimmer)",
                      },
                      {
                        field: "language",
                        type: "string",
                        required: false,
                        description: "Language code (default: en-US)",
                      },
                      {
                        field: "system_prompt",
                        type: "string",
                        required: true,
                        description: "Instructions for the agent's behavior",
                      },
                      {
                        field: "greeting",
                        type: "string",
                        required: false,
                        description: "Initial greeting message",
                      },
                      {
                        field: "model",
                        type: "string",
                        required: false,
                        description: "AI model (default: gpt-4)",
                      },
                      {
                        field: "temperature",
                        type: "number",
                        required: false,
                        description: "Response creativity 0-1 (default: 0.7)",
                      },
                    ].map((row) => (
                      <tr key={row.field} className="bg-card">
                        <td className="px-4 py-3">
                          <code className="text-primary">{row.field}</code>
                          {row.required && (
                            <span className="ml-2 text-[10px] text-destructive">
                              required
                            </span>
                          )}
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
                code={`const response = await fetch('https://api.example.com/v1/agents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Sales Assistant',
    voice: 'alloy',
    system_prompt: 'You are a helpful sales assistant...'
  })
});

const agent = await response.json();
console.log(agent.id);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="POST"
              endpoint="/v1/agents"
              requestBody={requestBody}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
