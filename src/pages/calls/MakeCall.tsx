import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function MakeCall() {
  const requestBody = `{
  "from": "+15559876543",
  "to": "+15551234567",
  "context": {
    "customer_name": "John Doe",
    "order_id": "12345"
  }
}`;

  const sampleResponse = `{
  "success": true,
  "call_id": "call-uuid-456",
  "status": "initiated",
  "from": "+15559876543",
  "to": "+15551234567",
  "agent_id": "673ffa11b1e3f900129a0010"
}`;

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="post">POST</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /phone/call
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Make Outbound Call</h1>
          <p className="text-muted-foreground max-w-2xl">
            Triggers an outbound SIP call using Plivo. The agent is resolved from the 'from' phone number.
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
                    <tr className="bg-card">
                      <td className="px-4 py-3"><code className="text-primary">Content-Type</code></td>
                      <td className="px-4 py-3 text-muted-foreground">application/json</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Request Body */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Request Body</h2>
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
                      { field: "from", type: "string", required: true, description: "Plivo phone number to call from (must be registered)" },
                      { field: "to", type: "string", required: true, description: "Destination phone number to call" },
                      { field: "context", type: "object", required: false, description: "Optional context object passed to the agent" },
                    ].map((row) => (
                      <tr key={row.field} className="bg-card">
                        <td className="px-4 py-3">
                          <code className="text-primary">{row.field}</code>
                          {row.required && (
                            <span className="ml-2 text-[10px] text-destructive">required</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{row.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Notes */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Important Notes</h2>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• The <code className="text-primary">from</code> number must exist as a Plivo phone record</li>
                  <li>• The <code className="text-primary">from</code> number must match an AiAgent's plivo_phone_number</li>
                  <li>• The agent is automatically resolved based on the <code className="text-primary">from</code> number</li>
                </ul>
              </div>
            </section>

            {/* Code Example */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Example</h2>
              <CodeBlock
                code={`const response = await fetch('http://localhost:8080/api/phone/call', {
  method: 'POST',
  headers: {
    'authorization': '<UC_API_KEY>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: '+15559876543',
    to: '+15551234567',
    context: {
      customer_name: 'John Doe',
      order_id: '12345'
    }
  })
});

const { success, call_id, status } = await response.json();
console.log(\`Call initiated: \${call_id} - Status: \${status}\`);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="POST"
              endpoint="/api/phone/call"
              requestBody={requestBody}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
