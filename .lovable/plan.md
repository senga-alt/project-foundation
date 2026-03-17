
# Profile Page + Tip Detail Page

## 1. Profile Page (`/profile/:address`)

**Layout**: Same `max-w-3xl` container as Feed. Header section with address pill, copy button, and computed stats. Tabbed view (Sent / Received) filtering `MOCK_TIPS` by sender/recipient.

**Stats bar**: Three `StatValue` components — Tips Sent count, Tips Received count, Net Volume (STX). Computed from filtered mock data.

**Tabs**: Reuse `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` from existing UI. Each tab renders filtered `TipRow` list with existing skeleton/empty states.

**Navigation**: Add a link from `AddressPill` to `/profile/:address`. Add "Profile" link in the Navbar wallet dropdown when connected.

**Mock data helper**: Add `getTipsForAddress(address)` utility to `mock.ts` returning `{ sent, received }`.

## 2. Tip Detail Page (`/tip/:id`)

**Layout**: Single card-style layout with full transaction details.

**Sections**:
- **Header**: Amount (large) + status badge
- **Participants**: Sender → Recipient with full `AddressPill` components
- **Message**: Full message display (if present), styled quote block
- **Transaction details**: txid (truncated + copy), fee, timestamp (full date), block height (mock)
- **Status timeline**: Vertical stepper showing `Submitted → Mempool → Confirmed` (or `Failed`). Each step has timestamp. Uses simple CSS timeline (dot + line). Pending steps show pulse animation.

**Mock data**: Add `blockHeight` field to `TipEntry`. Add `getTipById(id)` helper.

**Navigation**: Make `TipRow` clickable — clicking the row navigates to `/tip/:id` (message expand still works via chevron only).

## 3. Routing Updates (`App.tsx`)

Add two new routes:
- `/profile/:address` → `Profile` page
- `/tip/:id` → `TipDetail` page

## Files to create/edit:
- `src/data/mock.ts` — add `blockHeight`, helper functions
- `src/pages/Profile.tsx` — new page
- `src/pages/TipDetail.tsx` — new page
- `src/components/StatusTimeline.tsx` — vertical stepper component
- `src/components/TipRow.tsx` — make row linkable to detail
- `src/components/AddressPill.tsx` — add link to profile
- `src/components/Navbar.tsx` — add profile link in dropdown
- `src/App.tsx` — add routes
