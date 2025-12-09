import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function GetCalls() {
  const sampleResponse = `{
  "data": [
    {
      "id": "call_xyz789abc",
      "agent_id": "agent_abc123xyz",
      "phone_number": "+1234567890",
      "direction": "inbound",
      "status": "completed",
      "duration": 245,
      "started_at": "2024-01-15T10:30:00Z",
      "ended_at": "2024-01-15T10:34:05Z",
      "recording_url": "https://storage.example.com/recordings/call_xyz789abc.mp3"
    },
    {
      "id": "call_def456ghi",
      "agent_id": "agent_abc123xyz",
      "phone_number": "+0987654321",
      "direction": "outbound",
      "status": "completed",
      "duration": 180,
      "started_at": "2024-01-15T11:00:00Z",
      "ended_at": "2024-01-15T11:03:00Z",
      "recording_url": "https://storage.example.com/recordings/call_def456ghi.mp3"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 142,
    "total_pages": 8
  }
}`;

  const parameters = [
    {
      name: "agent_id",
      type: "string",
      required: false,
      description: "Filter by agent ID",
    },
    {
      name: "status",
      type: "string",
      required: false,
      description: "Filter by status (completed, failed, in_progress)",
    },
    {
      name: "page",
      type: "integer",
      required: false,
      description: "Page number",
      default: "1",
    },
    {
      name: "per_page",
      type: "integer",
      required: false,
      description: "Results per page (max 100)",
      default: "20",
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
              /calls
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Get Calls</h1>
          <p className="text-muted-foreground max-w-2xl">
            Retrieve a paginated list of all calls. Filter by agent, status, or
            date range to find specific call records.
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
                      { field: "agent_id", type: "string", description: "Filter by specific agent" },
                      { field: "status", type: "string", description: "Filter by call status" },
                      { field: "direction", type: "string", description: "Filter by inbound/outbound" },
                      { field: "start_date", type: "string", description: "Filter calls after date (ISO 8601)" },
                      { field: "end_date", type: "string", description: "Filter calls before date (ISO 8601)" },
                      { field: "page", type: "integer", description: "Page number (default: 1)" },
                      { field: "per_page", type: "integer", description: "Results per page (default: 20, max: 100)" },
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
  'https://api.example.com/v1/calls?agent_id=agent_abc123xyz&status=completed&page=1',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const { data, pagination } = await response.json();
console.log(\`Found \${pagination.total} calls\`);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="GET"
              endpoint="/v1/calls"
              parameters={parameters}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
