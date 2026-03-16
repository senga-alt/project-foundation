

# StackFlow — Implementation Plan (Phase 1)

## Design System
- **Typography**: Fraunces (display) + DM Sans (body) via Google Fonts. Fluid `clamp()` type scale from `--text-xs` to `--text-5xl`. Monospace only for wallet addresses/txids.
- **Color**: oklch-based palette — warm amber/gold brand hue, deep teal accent. Warm off-white backgrounds, near-black text. Both light and dark themes, honoring system preference via `next-themes`.
- **Spacing**: Fluid `clamp()` spacing tracks (tight/base/wide). No card-heavy layouts — rows for feeds, inline stats.
- **Motion**: `ease-out-quint` entrances, `ease-in-quart` exits. Odometer-style digit transitions for stats. `grid-template-rows: 0fr → 1fr` for expandable sections.
- **Shadows over borders**: Layered box-shadows instead of solid borders. Concentric border-radius.

## Pages

### 1. Home / Landing (`/`)
- Asymmetric hero: headline + live stats (left), Tip Composer (right) on desktop. Stacks vertically on mobile.
- Live counters with odometer-style animation (mock data: total tips, total STX volume).
- Primary CTA "Send a tip" scrolls to composer. Secondary "Explore activity" links to `/feed`.
- No hero illustration — the numbers are the hero.

### 2. Tip Composer (embedded in Home + `/tip`)
- Progressive disclosure: starts with recipient address field → amount + fee preview → optional message (expands via grid animation).
- States: Idle → Filling → Ready → Pending → Confirmed → Failed — all inline, no modals.
- Mock wallet state: shows "Connect wallet" deactivated state, with a simulated connected state toggle.
- Fee (0.5%) shown only when amount is entered. Receipt with mock txid on "confirmation."

### 3. Activity Feed (`/feed`)
- Chronological rows (not cards). Row: `[timestamp] [sender] → [recipient] [amount] [message excerpt]`.
- `AddressPill` component: truncated addresses with hover tooltip showing full address + copy.
- `AmountDisplay`: STX with μSTX tooltip.
- Loading: skeleton rows. Empty: instructional empty state with sample tip and CTA.
- Mock data: ~15 realistic tip entries with varied amounts, messages, timestamps.

## Shared Components
- `AddressPill` — truncated address + copy + link to profile
- `AmountDisplay` — STX value + μSTX tooltip
- `TipRow` — feed item, expandable for full message
- `StatValue` — large number + small label, no card
- `SkeletonRow` — feed loading placeholder
- `EmptyState` — teaches the UI
- `TxStatus` — pending/confirmed/failed indicator
- **Nav**: Protocol name left, "Connect wallet" button right. Connected state shows truncated address with dropdown (copy, disconnect). No modals — inline drawer pattern.

## Routing
- `/` — Home with embedded composer
- `/tip` — Standalone composer page
- `/feed` — Activity feed

## Technical Notes
- All blockchain data mocked with realistic fixtures via TanStack Query (easy to swap for real Hiro API later).
- Dark/light theme toggle using `next-themes`, CSS variables in oklch.
- Responsive: fluid layout with container queries for composer and stat values.
- Accessibility: visible focus rings, aria-labels on truncated addresses, aria-live for tx status, keyboard-operable.

