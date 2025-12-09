import { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { cn } from "@/lib/utils";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

interface TryItPanelProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  parameters?: Parameter[];
  requestBody?: string;
  sampleResponse: string;
}

export function TryItPanel({
  method,
  endpoint,
  parameters = [],
  requestBody,
  sampleResponse,
}: TryItPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  const methodVariant = method.toLowerCase() as "get" | "post" | "put" | "delete";

  const handleTryIt = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResponse(sampleResponse);
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary/30">
        <Badge variant={methodVariant}>{method}</Badge>
        <code className="text-sm font-mono text-foreground">{endpoint}</code>
      </div>

      {/* Parameters */}
      {parameters.length > 0 && (
        <div className="p-4 border-b border-border space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Parameters</h4>
          <div className="space-y-3">
            {parameters.map((param) => (
              <div key={param.name} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-mono text-foreground">
                    {param.name}
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {param.type}
                  </span>
                  {param.required && (
                    <span className="text-[10px] text-destructive font-medium">
                      required
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={param.default || param.description}
                  value={paramValues[param.name] || ""}
                  onChange={(e) =>
                    setParamValues((prev) => ({
                      ...prev,
                      [param.name]: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body */}
      {requestBody && (
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Request Body
          </h4>
          <CodeBlock code={requestBody} language="json" />
        </div>
      )}

      {/* Try It Button */}
      <div className="p-4 border-b border-border">
        <Button
          variant="tryit"
          className="w-full"
          onClick={handleTryIt}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Try It
            </>
          )}
        </Button>
      </div>

      {/* Response */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Response</h4>
          {response && (
            <Badge variant="outline" className="text-success border-success/30">
              200 OK
            </Badge>
          )}
        </div>
        <CodeBlock
          code={response || sampleResponse}
          language="json"
          className={cn(!response && "opacity-50")}
        />
      </div>
    </div>
  );
}
