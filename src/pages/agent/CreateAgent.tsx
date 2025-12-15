import { ApiLayout } from "@/components/ApiLayout";
import { TryItPanel } from "@/components/TryItPanel";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";

export default function CreateAgent() {
  const requestBody = `{
  "name": "UrbanChat Assistant",
  "base_prompt": "You are a helpful phone assistant for a pizza restaurant. The restaurant is open between 10-12 pm. You can help the customer reserve a table for the restaurant.",
  "chatgpt_model": "cerebras/llama-4-scout-17b-16e-instruct",
  "STT_name": "deepgram",
  "who_speaks_first": "ai",
  "welcome_msg": "Hello, how are you?",
  "voice_engine_name": "deepgram",
  "voice_id": "aura-2-asteria-en",
  "voice_name": "Asteria",
  "voice_speed": 1,
  "voice_loudness": 1,
  "voice_pitch": 0,
  "language": "en",
  "agent_type": "single_prompt",
  "calendar_tools": [
    {
      "cal_api_key": "",
      "cal_event_type_id": "",
      "cal_timezone": "America/Los_Angeles"
    }
  ]
}`;

  const sampleResponse = `{
  "success": true,
  "agent": {
    "_id": "673ffa11b1e3f900129a0010",
    "user_id": "673ff9e1b1e3f900129a0001",
    "name": "UrbanChat Assistant",
    "base_prompt": "You are a helpful phone assistant...",
    "chatgpt_model": "cerebras/llama-4-scout-17b-16e-instruct",
    "voice_id": "aura-2-asteria-en",
    "voice_name": "Asteria",
    "created_at": "2025-12-15T10:00:00.000Z"
  }
}`;

  return (
    <ApiLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="post">POST</Badge>
            <code className="text-sm font-mono text-muted-foreground">
              /create-ai-agent
            </code>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Create AI Agent</h1>
          <p className="text-muted-foreground max-w-2xl">
            Creates a new voice AI agent for the authenticated user. The user_id is 
            taken from the Authorization token.
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
              <h2 className="text-xl font-semibold text-foreground">
                Request Body
              </h2>
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
                      { field: "name", type: "string", required: true, description: "Display name for the agent" },
                      { field: "base_prompt", type: "string", required: true, description: "Instructions for the agent's behavior" },
                      { field: "chatgpt_model", type: "string", required: true, description: "AI model to use (e.g., cerebras/llama-4-scout-17b-16e-instruct)" },
                      { field: "STT_name", type: "string", required: false, description: "Speech-to-text engine (e.g., deepgram)" },
                      { field: "who_speaks_first", type: "string", required: false, description: "Who initiates: 'ai' or 'user'" },
                      { field: "welcome_msg", type: "string", required: true, description: "Initial greeting message" },
                      { field: "voice_engine_name", type: "string", required: false, description: "Voice engine (e.g., deepgram, elevenlabs)" },
                      { field: "voice_id", type: "string", required: true, description: "Voice identifier" },
                      { field: "voice_name", type: "string", required: true, description: "Voice display name" },
                      { field: "voice_speed", type: "number", required: false, description: "Voice speed multiplier (default: 1)" },
                      { field: "voice_loudness", type: "number", required: false, description: "Voice loudness (default: 1)" },
                      { field: "voice_pitch", type: "number", required: false, description: "Voice pitch adjustment (default: 0)" },
                      { field: "language", type: "string", required: false, description: "Language code (default: en)" },
                      { field: "agent_type", type: "string", required: false, description: "Agent type (e.g., single_prompt)" },
                      { field: "calendar_tools", type: "array", required: false, description: "Calendar integration config" },
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

            {/* Code Example */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Example</h2>
              <CodeBlock
                code={`const response = await fetch('http://localhost:8080/api/create-ai-agent', {
  method: 'POST',
  headers: {
    'authorization': '<UC_API_KEY>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'UrbanChat Assistant',
    base_prompt: 'You are a helpful phone assistant...',
    chatgpt_model: 'cerebras/llama-4-scout-17b-16e-instruct',
    voice_id: 'aura-2-asteria-en',
    voice_name: 'Asteria',
    welcome_msg: 'Hello, how are you?'
  })
});

const { success, agent } = await response.json();
console.log(agent._id);`}
                title="JavaScript"
              />
            </section>
          </div>

          {/* Try It Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TryItPanel
              method="POST"
              endpoint="/api/create-ai-agent"
              requestBody={requestBody}
              sampleResponse={sampleResponse}
            />
          </div>
        </div>
      </div>
    </ApiLayout>
  );
}
