import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function GetNumbers() {
  const sampleResponse = `{
  "data": [
    {
      "id": "num_abc123",
      "phone_number": "+14155551234",
      "friendly_name": "Sales Line",
      "agent_id": "agent_abc123xyz",
      "agent_name": "Sales Assistant",
      "capabilities": ["voice", "sms"],
      "country": "US",
      "region": "CA",
      "status": "active",
      "created_at": "2024-01-10T08:00:00Z"
    },
    {
      "id": "num_def456",
      "phone_number": "+14155555678",
      "friendly_name": "Support Line",
      "agent_id": "agent_def456ghi",
      "agent_name": "Support Bot",
      "capabilities": ["voice"],
      "country": "US",
      "region": "CA",
      "status": "active",
      "created_at": "2024-01-12T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 5,
    "total_pages": 1
  }
}`;

  const parameters = [
    {
      name: "agent_id",
      type: "string",
      required: false,
      description: "Filter by assigned agent",
    },
    {
      name: "status",
      type: "string",
      required: false,
      description: "Filter by status (active, inactive)",
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
              /numbers
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Get Numbers</h1>
          <p className="text-muted-foreground max-w-2xl">
            Retrieve a list of all phone numbers in your account. Each number
            shows its assigned agent, capabilities, and current status.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Documentation */}
          <div className="space-y-8">
            {/* Query Parameters */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Query Parameters
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
                    {[
                      { field: "agent_id", type: "string", description: "Filter by assigned agent" },
                      { field: "status", type: "string", description: "Filter by active or inactive" },
                      { field: "country", type: "string", description: "Filter by country code (US, GB, etc.)" },
                      { field: "capabilities", type: "string", description: "Filter by capability (voice, sms)" },
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
                      { field: "phone_number", type: "string", description: "E.164 formatted phone number" },
                      { field: "friendly_name", type: "string", description: "Human-readable name" },
                      { field: "agent_id", type: "string", description: "ID of assigned agent (if any)" },
                      { field: "capabilities", type: "array", description: "List of capabilities (voice, sms)" },
                      { field: "status", type: "string", description: "active or inactive" },
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
                code={`const response = await fetch(
  'https://api.example.com/v1/numbers?status=active',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const { data } = await response.json();
data.forEach(num => {
  console.log(\`\${num.friendly_name}: \${num.phone_number}\`);
});`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="GET"
              endpoint="/v1/numbers"
              parameters={parameters}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
