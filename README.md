# NovaCart — Modern E-Commerce Website

A fully responsive, feature-rich e-commerce web application built with **React 19**, **Vite**, and **Tailwind CSS**. Includes dark mode, cart & wishlist management, smooth animations, and a complete multi-page shopping flow.

---

## Live Demo

[Visit Website](https://novacart-ecommerce-website.vercel.app)

---
## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v7 |
| Animations | Framer Motion |
| Icons | React Icons |
| State | React Context API |

---

## Features

- **Dark / Light Mode** — System-aware theme toggle persisted across sessions
- **Product Listing** — Filterable and sortable product grid with skeleton loaders
- **Product Detail** — Image gallery, size/color selector, add-to-cart & wishlist
- **Shopping Cart** — Quantity controls, item removal, live price totals
- **Wishlist** — Save items for later with one-click cart transfer
- **Checkout** — Multi-step form with order summary
- **User Account** — Profile, order history, and settings page
- **Responsive Design** — Mobile-first layout across all breakpoints
- **Smooth Animations** — Page transitions and micro-interactions via Framer Motion

---

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Product Listing |
| `/product/:id` | Product Detail |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/wishlist` | Wishlist |
| `/account` | User Account |

---

## Project Structure

```
src/
├── components/       # Shared UI components (Navbar, Footer, ProductCard, SkeletonLoader)
├── context/          # Global state (Cart, Wishlist, Auth, Theme, Toast)
├── data/             # Static product data
├── pages/            # Route-level page components
├── assets/           # Static assets
├── App.jsx           # Root component and routing
└── main.jsx          # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/AdityaS62/novacart-ecommerce-website.git
cd novacart-ecommerce-website
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## License

MIT
