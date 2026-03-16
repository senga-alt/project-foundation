import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AddressPillProps {
  address: string;
  className?: string;
}

export function AddressPill({ address, className = '' }: AddressPillProps) {
  const [copied, setCopied] = useState(false);
  const truncated = `${address.slice(0, 5)}…${address.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-mono text-[length:var(--text-xs)] text-secondary-foreground transition-colors hover:bg-muted ${className}`}
          aria-label={`Copy address ${address}`}
        >
          <span>{truncated}</span>
          {copied ? (
            <Check className="h-3 w-3 text-success" />
          ) : (
            <Copy className="h-3 w-3 opacity-50" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="font-mono text-[length:var(--text-xs)]">
        {address}
      </TooltipContent>
    </Tooltip>
  );
}
