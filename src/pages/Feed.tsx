import { useState } from 'react';
import { motion } from 'framer-motion';
import { TipRow } from '@/components/TipRow';
import { SkeletonRow } from '@/components/SkeletonRow';
import { EmptyState } from '@/components/EmptyState';
import { MOCK_TIPS } from '@/data/mock';
import { useQuery } from '@tanstack/react-query';

export default function Feed() {
  const { data: tips, isLoading } = useQuery({
    queryKey: ['tips'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 800));
      return MOCK_TIPS;
    },
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-[var(--space-wide)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-display text-[length:var(--text-2xl)] font-bold text-foreground mb-1">
          Activity
        </h1>
        <p className="text-[length:var(--text-sm)] text-muted-foreground mb-[var(--space-wide)]">
          Recent tips across the network
        </p>

        <div className="rounded-lg bg-card shadow-base overflow-hidden">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : !tips || tips.length === 0 ? (
            <EmptyState />
          ) : (
            tips.map(tip => <TipRow key={tip.id} tip={tip} />)
          )}
        </div>
      </motion.div>
    </main>
  );
}
