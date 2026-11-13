# Big Hawk Inbox

A modern multi-channel messaging and CRM dashboard designed specifically for appointment-based businesses such as salons, spas, dental practices, and wellness clinics.

---

## Phase 1 Overview

Phase 1 establishes the complete application shell, design system, typography, and interactive **Overview Dashboard** powered entirely by typed, deterministic mock datasets.

- **Zero External Dependencies / Auth / Database**: Completely self-contained for UI evaluation.
- **Deterministic 90-Day Metrics**: Seeded pseudo-random metric generator keeps numbers consistent across page reloads.
- **Empty State Switcher**: Toggle the single `USE_EMPTY_STATE` flag in `lib/config.ts` to inspect all cards and charts with zero values and deliberate empty states.
- **Light & Dark Mode**: Persistent theme toggle powered by `next-themes` with custom brand tokens.
- **Client-Side CSV Export**: Export currently filtered time-series data with one click.
- **Placeholder Pages**: Every sidebar destination outside the Overview dashboard renders a structured placeholder explaining its upcoming capabilities.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (latest App Router with TypeScript in strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` brand tokens
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [lucide-react](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## Project Structure

```
big-hawk-inbox/
├── app/
│   ├── globals.css                 # Tailwind v4 import & theme CSS variables (light/dark/brand)
│   ├── layout.tsx                  # Root layout (Geist font, ThemeProvider, TooltipProvider)
│   └── (dashboard)/
│       ├── layout.tsx              # Dashboard shell: Sidebar + Topbar + Content container
│       ├── page.tsx                # Overview dashboard page
│       └── [section]/
│           └── page.tsx            # Static placeholder route for all sidebar navigation links
├── components/
│   ├── dashboard/
│   │   ├── ContactGrowthChart.tsx  # Area/Line chart for Total vs. New contacts per day
│   │   ├── GettingSetupCard.tsx    # Progress ring + 8-step setup checklist
│   │   ├── MessageActivityChart.tsx# Bar chart of Sent vs. Received with summary metric tiles
│   │   ├── NeedsAttentionCard.tsx  # Open conversations preview with relative timestamps
│   │   ├── OverviewHeader.tsx      # Date line, personalized time greeting & summary sentence
│   │   ├── PeriodToggle.tsx        # 7D, 14D, 30D, and 90D filter controls
│   │   ├── ReachOutCard.tsx        # 24-hour customer inquiry distribution bar chart
│   │   ├── ReplyRateRing.tsx       # Circular SVG reply rate progress indicator
│   │   ├── StatCard.tsx            # Standardized KPI card with icon badge and accent line
│   │   └── StatsRow.tsx            # 4-card KPI summary row (Contacts, Convs, Messages, Rate)
│   ├── layout/
│   │   ├── MobileSidebar.tsx       # Responsive mobile sheet drawer
│   │   ├── SetupProgressCard.tsx   # Sidebar setup percentage card with CTA
│   │   ├── Sidebar.tsx             # 240px desktop sidebar with navigation categories
│   │   ├── Topbar.tsx              # Breadcrumbs, Ctrl+K search, dark mode toggle, user chip
│   │   └── WorkspaceSwitcher.tsx   # Workspace switcher card ("Ilyas Salon")
│   ├── providers/
│   │   └── ThemeProvider.tsx       # Next-themes client wrapper
│   ├── shared/
│   │   ├── EmptyState.tsx          # Reusable empty state view
│   │   └── PlaceholderPage.tsx     # Generic page placeholder for non-Overview sections
│   └── ui/                         # shadcn/ui components (card, button, badge, input, etc.)
├── lib/
│   ├── config.ts                   # USE_EMPTY_STATE configuration toggle
│   ├── utils.ts                    # Date formatting, numbers, CSV exporter, cn helper
│   └── mock/
│       ├── contacts.ts             # 25 realistic mock contacts (+92 format, tags)
│       ├── conversations.ts        # 8 mock open conversations
│       ├── metrics.ts              # Deterministic 90-day time-series & 24h activity PRNG
│       └── workspace.ts            # Workspace metadata, admin user details, setup steps
└── types/
    └── index.ts                    # Complete TypeScript definitions (strict, no any)
```

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm (or yarn / pnpm)

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Dashboard will be accessible at http://localhost:3000

# 3. Production build
npm run build
npm start
```

---

## Toggling Empty State

To test the zero-data and empty-state visualizations:

1. Open `lib/config.ts`.
2. Change `USE_EMPTY_STATE` to `true`:
   ```ts
   export const USE_EMPTY_STATE = true;
   ```
3. Save the file. The dashboard will instantly update to show flat-line charts with "No contacts yet" / "No messages yet" banners, zeroed KPI cards, and "All caught up!" empty conversation placeholders.

---

## Next Phase (Phase 2 & 3 Roadmap)

### Phase 2: Core Messaging & Contact Management
- **Unified Multi-Channel Inbox**: Connect WhatsApp Business Cloud API, Instagram Graph API, Facebook Messenger, and SMS via Twilio.
- **Live Contact Directory**: Searchable, filterable contact table with tag management, custom fields, and profile notes.
- **Canned Responses & Template Library**: Quick-reply snippets and media attachment repository.
- **Broadcast Marketing**: Campaign sender targeting contacts by tag (e.g., "Bridal", "VIP").
- **Authentication & RBAC**: Multi-tenant user login (NextAuth / Supabase) with role-based permissions (Admin, Receptionist, Stylist).

### Phase 3: Automation, Voice & Booking Engine
- **Visual Flow Builder**: Drag-and-drop conversational automation engine.
- **Calendar & Appointment Booking**: Native booking engine synced with Google Calendar and Apple Calendar.
- **Voice Call Management**: Inbound/outbound softphone, call logs, recording playback, and AI transcription.
- **Autonomous AI Receptionist**: Fine-tuned appointment booking bot answering service FAQs 24/7.
