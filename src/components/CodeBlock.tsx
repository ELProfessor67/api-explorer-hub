import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (code: string) => {
    // Simple syntax highlighting
    return code
      .replace(/(["'`])([^"'`]*)\1/g, '<span class="text-syntax-string">$&</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|async|await|export|import|from)\b/g, '<span class="text-syntax-keyword">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-syntax-number">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-syntax-comment">$1</span>')
      .replace(/(\w+)(?=\()/g, '<span class="text-syntax-function">$1</span>')
      .replace(/("?\w+"?)(?=:)/g, '<span class="text-syntax-property">$1</span>');
  };

  return (
    <div className={cn("rounded-lg overflow-hidden bg-muted/50 border border-border", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
          <span className="text-xs font-mono text-muted-foreground">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-7 px-2 text-muted-foreground hover:text-foreground"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
        <pre className="p-4 overflow-x-auto text-sm">
          <code
            className="font-mono text-foreground"
            dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
          />
        </pre>
      </div>
    </div>
  );
}
