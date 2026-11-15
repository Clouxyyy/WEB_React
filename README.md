# Product Management (React + Vite)

A simple app for managing a product list. Users can view products, search by name, and add, edit, and delete products through popups.

## Features

- Product list displayed as cards (ID, name, price)
- Search products by name
- **Add Product** popup with validation (name is required, price must be greater than 0)
- **Edit Product** popup
- **Delete Product** popup with confirmation
- Popups can be closed with the × button, the Cancel button, a click outside the popup, or the Esc key

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- ESLint

## Prerequisites

Make sure the following are installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) version 20 or newer (includes npm)

Check the versions:

```bash
git --version
node -v
npm -v
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Clouxyyy/WEB_React.git
cd WEB_React
```

Or with SSH:

```bash
git clone git@github.com:Clouxyyy/WEB_React.git
cd WEB_React
```

### 2. Switch to the `tugas-3` branch

```bash
git checkout tugas-3
```

Skip this step if the branch has already been merged into `main`.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173) in your browser.

Press `Ctrl + C` in the terminal to stop the server.

### 5. Other commands (optional)

| Command | Description |
|---|---|
| `npm run build` | Create a production build in the `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code with ESLint |

## Project Structure

```
WEB_React/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DeleteConfirm.jsx   # delete confirmation popup content
│   │   ├── Modal.jsx           # popup wrapper (overlay, close button, Esc)
│   │   ├── PageHeader.jsx      # page title and Add Product button
│   │   ├── ProductCard.jsx     # a single product card
│   │   ├── ProductForm.jsx     # form for adding and editing products
│   │   ├── ProductList.jsx     # list of product cards
│   │   ├── SearchBar.jsx       # search input and product count
│   │   └── *.css               # styles for each component
│   ├── data/
│   │   └── products.js         # initial product data
│   ├── utils/
│   │   └── formatPrice.js      # formats prices as rupiah (Rp12.000)
│   ├── App.jsx                 # main state and component wiring
│   ├── App.css
│   ├── index.css               # global styles and color variables
│   └── main.jsx                # application entry point
├── index.html
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Data Flow

- The `products`, `query`, and `modal` states live in `App.jsx`.
- Data is passed down to child components through props (one-way data flow).
- Child components notify `App` through callback functions (`onAdd`, `onEdit`, `onDelete`, `onSubmit`, `onConfirm`, `onCancel`).
