import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function GetCalls() {
  const sampleResponse = `{
  "success": true,
  "recordings": [
    {
      "_id": "6741b6f0d2d3c40012ab3456",
      "user_id": "673ff9e1b1e3f900129a0001",
      "caller_id": "call-uuid-123",
      "calltype": "ph-outbound",
      "direction": "outbound",
      "from_phone_number": "+15551234567",
      "plivo_phone_number": "+15559876543",
      "voice_engine_id": "deepgram",
      "chatgpt_model": "cerebras/llama-4-scout-17b-16e-instruct",
      "agent_id": "673ffa11b1e3f900129a0010",
      "voice_name": "Asteria",
      "voice_id": "aura-2-asteria-en",
      "call_status": "Successful",
      "user_sentiment": "Neutral",
      "call_duration": 180,
      "created_time": "2025-12-15T10:00:00.000Z"
    }
  ]
}`;

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="get">GET</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /fetch-call-history
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Get Call History</h1>
          <p className="text-muted-foreground max-w-2xl">
            Returns the call history for the authenticated user, sorted by newest first.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Documentation */}
          <div className="space-y-8">
            {/* Headers */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Headers</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Header</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-card">
                      <td className="px-4 py-3"><code className="text-primary">authorization</code></td>
                      <td className="px-4 py-3 text-muted-foreground">&lt;UC_API_KEY&gt;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Response Fields */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Response Fields</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Field</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { field: "_id", type: "string", description: "Unique call record ID" },
                      { field: "user_id", type: "string", description: "User who owns this call" },
                      { field: "caller_id", type: "string", description: "Unique call session UUID" },
                      { field: "calltype", type: "string", description: "Call type (e.g., ph-outbound)" },
                      { field: "direction", type: "string", description: "Call direction (inbound/outbound)" },
                      { field: "from_phone_number", type: "string", description: "Caller's phone number" },
                      { field: "plivo_phone_number", type: "string", description: "Plivo phone number used" },
                      { field: "voice_engine_id", type: "string", description: "Voice engine used" },
                      { field: "chatgpt_model", type: "string", description: "AI model used for conversation" },
                      { field: "agent_id", type: "string", description: "AI agent ID handling the call" },
                      { field: "voice_name", type: "string", description: "Voice name used" },
                      { field: "voice_id", type: "string", description: "Voice identifier" },
                      { field: "call_status", type: "string", description: "Call status (Successful, Failed, etc.)" },
                      { field: "user_sentiment", type: "string", description: "Detected user sentiment" },
                      { field: "call_duration", type: "number", description: "Duration in seconds" },
                      { field: "created_time", type: "string", description: "Call timestamp (ISO 8601)" },
                    ].map((row) => (
                      <tr key={row.field} className="bg-card">
                        <td className="px-4 py-3">
                          <code className="text-primary">{row.field}</code>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{row.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
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
                code={`const response = await fetch('http://localhost:8080/api/fetch-call-history', {
  method: 'GET',
  headers: {
    'authorization': '<UC_API_KEY>'
  }
});

const { success, recordings } = await response.json();
console.log(\`Found \${recordings.length} calls\`);

recordings.forEach(call => {
  console.log(\`Call \${call._id}: \${call.call_status} - \${call.call_duration}s\`);
});`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="GET"
              endpoint="/api/fetch-call-history"
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
