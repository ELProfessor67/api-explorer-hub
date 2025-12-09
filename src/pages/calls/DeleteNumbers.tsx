import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export default function DeleteNumbers() {
  const sampleResponse = `{
  "success": true,
  "message": "Phone number successfully released",
  "phone_number": "+14155551234",
  "deleted_at": "2024-01-16T15:00:00Z"
}`;

  const parameters = [
    {
      name: "number_id",
      type: "string",
      required: true,
      description: "The unique identifier of the phone number",
      default: "num_abc123",
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
              /numbers/{"{number_id}"}
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Delete Numbers</h1>
          <p className="text-muted-foreground max-w-2xl">
            Release a phone number from your account. The number will become
            available for other users to purchase. This action cannot be undone.
          </p>
        </div>

        {/* Warning */}
        <div className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-destructive">Warning</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Releasing a phone number is permanent. Once released, you cannot
              reclaim the same number. Make sure to update any external systems
              using this number.
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
                        <code className="text-primary">number_id</code>
                        <span className="ml-2 text-[10px] text-destructive">
                          required
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        string
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        Unique identifier of the phone number
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Important Notes */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Important Notes
              </h2>
              <ul className="space-y-2">
                {[
                  "Active calls will be disconnected immediately upon deletion",
                  "Any scheduled outbound calls using this number will be cancelled",
                  "Call history and recordings will be retained for your records",
                  "You will not be charged for the number after deletion",
                ].map((note, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
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
                      { code: "404", description: "Phone number not found" },
                      { code: "409", description: "Number has active calls in progress" },
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
                code={`const response = await fetch(
  'https://api.example.com/v1/numbers/num_abc123',
  {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

if (response.ok) {
  const result = await response.json();
  console.log(\`Released: \${result.phone_number}\`);
}`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="DELETE"
              endpoint="/v1/numbers/{number_id}"
              parameters={parameters}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
