# Library Book Checkout

A library book checkout UI for librarians to manage book checkouts. State is managed locally with seeded sample data and persisted to localStorage.

**Live preview:** https://library-ui-test.vercel.app

## Features

- View all books and their availability status
- Check out an available book to a library member (14-day loan period)
- Return a checked-out book
- Prevents double checkout of the same book
- Dedicated overdue view to track late returns
- Responsive layout: table on desktop, card list on mobile
- State persists across page refreshes (localStorage)

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Next.js 16** (App Router, dynamic rendering)
- **Tailwind CSS v4** for styling
- **Context + useReducer** for state management
- **Vitest + React Testing Library** for unit tests

## Project Structure

```
src/
  app/            → Next.js app router (page, layout, globals.css)
  components/     → UI components (BookTable, CheckoutModal, Badge, Button, StatusBadge)
  context/        → LibraryContext + libraryReducer
  hooks/          → useLibrary hook (derived state + actions)
  utils/          → enrichBooks, storage (localStorage)
  types/          → TypeScript interfaces (Book, Member, Checkout, EnrichedBook)
  constants.ts    → Shared constants (CHECKOUT_DURATION_DAYS, STORAGE_KEY)
  data/           → Seed data (15 books, 8 members, sample checkouts)
  __tests__/      → Unit tests (mirrors src/ structure)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI) |
| `npm run lint` | Run ESLint |
