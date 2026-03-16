import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AddressPill } from './AddressPill';
import { AmountDisplay } from './AmountDisplay';
import { TxStatus } from './TxStatus';
import type { TipEntry } from '@/data/mock';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TipRowProps {
  tip: TipEntry;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function TipRow({ tip }: TipRowProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMessage = !!tip.message;

  return (
    <div className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/40">
      <button
        onClick={() => hasMessage && setExpanded(!expanded)}
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3 text-left',
          hasMessage && 'cursor-pointer'
        )}
        disabled={!hasMessage}
        aria-expanded={hasMessage ? expanded : undefined}
      >
        <span className="shrink-0 text-[length:var(--text-xs)] text-muted-foreground tabular-nums w-14">
          {timeAgo(tip.timestamp)}
        </span>

        <AddressPill address={tip.sender} />

        <span className="text-muted-foreground text-[length:var(--text-xs)]">→</span>

        <AddressPill address={tip.recipient} />

        <AmountDisplay amountSTX={tip.amountSTX} className="ml-auto text-[length:var(--text-sm)]" />

        <TxStatus status={tip.status} className="hidden sm:inline-flex w-20" />

        {hasMessage && (
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
              expanded && 'rotate-180'
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {expanded && tip.message && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pl-[calc(3.5rem+0.75rem)]">
              <p className="text-[length:var(--text-sm)] text-muted-foreground italic">
                "{tip.message}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
