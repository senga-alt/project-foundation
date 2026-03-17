

# Leaderboard Page

## New route: `/leaderboard`

A page with two ranked tables side-by-side on desktop (stacked on mobile): **Top Tippers** (by total STX sent) and **Most Tipped** (by total STX received).

## Data helper (`mock.ts`)

Add `getLeaderboard()` that aggregates `MOCK_TIPS` by sender/recipient, returning sorted arrays of `{ address, totalSTX, tipCount, rank }`.

## Page (`src/pages/Leaderboard.tsx`)

- Same `max-w-3xl` container, `motion` entrance animation, `useQuery` pattern as Feed/Profile.
- Two-column grid (`grid-cols-1 md:grid-cols-2`) with a ranked list in each column.
- Each row: rank medal (🥇🥈🥉 for top 3, number otherwise), `AddressPill`, tip count, total STX via `AmountDisplay`.
- Loading state with `SkeletonRow`.

## Navigation

- Add "Leaderboard" link in Navbar's `<nav>` between Home and Activity.
- Add route in `App.tsx`.

## Files to create/edit
- `src/data/mock.ts` — add `getLeaderboard()`
- `src/pages/Leaderboard.tsx` — new page
- `src/components/Navbar.tsx` — add nav link
- `src/App.tsx` — add route

