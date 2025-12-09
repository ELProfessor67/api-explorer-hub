import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function GetCallStats() {
  const sampleResponse = `{
  "period": {
    "start": "2024-01-01T00:00:00Z",
    "end": "2024-01-31T23:59:59Z"
  },
  "summary": {
    "total_calls": 1542,
    "completed_calls": 1489,
    "failed_calls": 53,
    "total_duration": 385620,
    "average_duration": 259,
    "success_rate": 96.6
  },
  "by_direction": {
    "inbound": {
      "count": 892,
      "average_duration": 245
    },
    "outbound": {
      "count": 650,
      "average_duration": 278
    }
  },
  "by_agent": [
    {
      "agent_id": "agent_abc123xyz",
      "agent_name": "Sales Assistant",
      "total_calls": 542,
      "average_duration": 312,
      "success_rate": 97.2
    },
    {
      "agent_id": "agent_def456ghi",
      "agent_name": "Support Bot",
      "total_calls": 1000,
      "average_duration": 231,
      "success_rate": 96.3
    }
  ],
  "hourly_distribution": [
    { "hour": 9, "count": 145 },
    { "hour": 10, "count": 189 },
    { "hour": 11, "count": 201 }
  ]
}`;

  const parameters = [
    {
      name: "start_date",
      type: "string",
      required: false,
      description: "Start of period (ISO 8601)",
      default: "2024-01-01",
    },
    {
      name: "end_date",
      type: "string",
      required: false,
      description: "End of period (ISO 8601)",
      default: "2024-01-31",
    },
    {
      name: "agent_id",
      type: "string",
      required: false,
      description: "Filter stats by agent",
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
              /calls/stats
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Get Call Stats</h1>
          <p className="text-muted-foreground max-w-2xl">
            Retrieve aggregated call statistics for a specified time period.
            Includes breakdowns by agent, direction, and hourly distribution.
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
                      { field: "start_date", type: "string", description: "Start of period (default: 30 days ago)" },
                      { field: "end_date", type: "string", description: "End of period (default: today)" },
                      { field: "agent_id", type: "string", description: "Filter by specific agent" },
                      { field: "granularity", type: "string", description: "hourly, daily, or weekly" },
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
                Response Structure
              </h2>
              <div className="space-y-3">
                {[
                  { field: "summary", description: "Overall statistics including totals, averages, and success rate" },
                  { field: "by_direction", description: "Breakdown of inbound vs outbound calls" },
                  { field: "by_agent", description: "Per-agent statistics and performance metrics" },
                  { field: "hourly_distribution", description: "Call volume distribution by hour of day" },
                ].map((item) => (
                  <div key={item.field} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <code className="text-primary text-sm">{item.field}</code>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Code Example */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Example</h2>
              <CodeBlock
                code={`const response = await fetch(
  'https://api.example.com/v1/calls/stats?start_date=2024-01-01&end_date=2024-01-31',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const stats = await response.json();
console.log(\`Success rate: \${stats.summary.success_rate}%\`);
console.log(\`Average duration: \${stats.summary.average_duration}s\`);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="GET"
              endpoint="/v1/calls/stats"
              parameters={parameters}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
