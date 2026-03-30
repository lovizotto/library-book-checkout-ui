# Library Book Checkout

A small library book checkout UI that a librarian can use to manage book checkouts. All data is managed in local state with seeded sample data.

## Features

- View all books and their availability status
- Check out an available book to a library member (14-day loan period)
- Return a checked-out book
- Prevents double checkout of the same book
- Dedicated overdue view to track late returns
- Responsive layout: table on desktop, card list on mobile

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Next.js 16** (App Router)
- **Tailwind CSS v4** for styling
- **Context + useReducer** for state management

## Project Structure

```
src/
  app/          → Next.js app router (page, layout, globals.css)
  components/   → UI components (BookTable, CheckoutModal, Badge, Button)
  context/      → LibraryContext with reducer for state management
  hooks/        → useLibrary hook (derived state + actions)
  types/        → TypeScript interfaces (Book, Member, Checkout)
  data/         → Seed data (15 books, 8 members, sample checkouts)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
