# WebTray — Project Context for Claude

## What this project is
WebTray (package name: `webTrey`) is a Next.js 15 / React 19 SaaS platform for small and medium-sized businesses. It's an all-in-one commerce tool covering storefront, inventory, orders, customers, and payments. There is a public-facing store at `/store/[slug]` and a private dashboard at `/dashboard`.

## Tech stack
- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **UI components:** Radix UI primitives via `components/ui/`, shadcn/ui conventions
- **Icons:** Tabler Icons React (`@tabler/icons-react`) + Lucide React — both are used, don't consolidate
- **State:** Zustand (`store/useAuthStore.ts`, `store/use-cart-store.ts`)
- **Data fetching:** TanStack Query v5
- **Forms:** React Hook Form + Zod / Yup
- **HTTP:** Axios (`lib/axios.ts`) — base URL from `NEXT_PUBLIC_API_BASE_URL`
- **Auth tokens:** JWT stored in cookies (`accessToken`, `refreshToken`), verified in middleware with `jose`
- **Toasts:** Sonner

## Running locally
```
npm install
npm run dev        # starts on port 3000
```

There is no `.env.local` file — the backend API is not available locally. To preview the dashboard UI without a backend, the middleware has a dev bypass already in place:

```ts
// middleware.ts — top of the middleware function
if (process.env.NODE_ENV === "development") {
  return NextResponse.next();
}
```

This is intentional and local-only. Do NOT commit `middleware.ts`. Navigate directly to `/dashboard` after `npm run dev`.

To revert the bypass when needed: `git checkout middleware.ts`

## Project structure (key paths)
```
app/
  (auth)/                        # Sign in, sign up, OTP, reset password
  (route)/
    (private)/
      dashboard/                 # All dashboard pages
        analytics/
        customer/
        inventory/
        order/
        settings/                # account, business, notifications, payment, security, shipping
        storefront/
        subscription/
        wallet/                  # ← Added by Precious (UI only, mock data)
      profile/
      register-business/
      welcome/
    (public)/
      (landing)/                 # Landing page, features, pricing, contact
      wait-list/
  store/[slug]/                  # Public customer-facing storefront

components/
  app-sidebar.tsx                # Main nav — add new pages here
  nav-main.tsx                   # Renders sidebar nav items
  ui/                            # shadcn/ui primitives

store/
  useAuthStore.ts                # Auth state + actions (login, logout, checkAuth)

middleware.ts                    # JWT route protection — DO NOT COMMIT dev bypass
```

## UI conventions (follow these exactly)
- **Primary blue:** `#365BEB`
- **Body text:** `#4D4D4D`, secondary: `#808080`, headings: `#111827`
- **Border radius on cards:** `rounded-[24px]`
- **Buttons:** always `rounded-full`
- **Status badges:** `px-2 py-1 rounded-full text-xs font-medium capitalize` + `bg-green-100 text-green-700` / `bg-red-100 text-red-700` / `bg-yellow-100 text-yellow-700`
- **Page wrapper:** `flex flex-col gap-6 py-4 md:py-6 max-w-6xl w-full`
- **Cards:** `rounded-[24px] border border-gray-200 shadow-sm`
- **Tables:** header `text-sm font-medium text-gray-400 border-b border-gray-100`, rows `border-b border-gray-50 hover:bg-gray-50/50`
- **Blue banner card** (like balance card): `bg-[#365BEB] rounded-[24px]` with white text

## Adding a new page — checklist
1. Create `app/(route)/(private)/dashboard/[page-name]/page.tsx`
2. Create `app/(route)/(private)/dashboard/[page-name]/_components/[page-name]-client.tsx` (client component)
3. Add nav item to `components/app-sidebar.tsx` → `data.navMain` array using the same `{ title, url, icon }` shape
4. Use icons from `@tabler/icons-react` or `lucide-react` (check which is already imported in the sidebar)

## Git workflow
- My fork: `https://github.com/Preshchukwu/webTray`
- Always work on a **feature branch**, never commit directly to `main`
- Branch naming: `feat/[feature-name]`
- To send work to the devs: push branch to fork → open PR targeting the original repo's `main`
- Never commit `middleware.ts` (contains local dev bypass)

## Features built so far
| Feature | Status | Notes |
|---|---|---|
| Wallet page | UI complete, mock data | `/dashboard/wallet` — balance, payment link, virtual account, transaction history |

## What the devs own
The backend API is built separately. This repo is frontend-only. When the devs are ready to wire up a feature, they will replace mock data with real API calls using the existing Axios instance in `lib/axios.ts`.
