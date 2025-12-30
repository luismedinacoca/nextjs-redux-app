# Next.js Redux App

A modern web application demonstrating the integration of Redux Toolkit with Next.js 16, TypeScript, and Tailwind CSS. This project showcases state management patterns in a server-rendered React environment, providing practical examples of global state handling across multiple routes and components.

## Features

- Global state management using Redux Toolkit
- Counter implementation with increment/decrement actions
- Type-safe Redux store with TypeScript
- Custom typed hooks for Redux (`useAppDispatch`, `useAppSelector`)
- Server-side rendering with Next.js App Router
- Responsive UI components built with Tailwind CSS
- Shadcn UI integration for accessible components
- Lucide React icons for consistent iconography

## Key Concepts

This project demonstrates:

- **Redux Toolkit slice pattern**: Modular state management with `createSlice`
- **Provider architecture**: Client-side Redux store wrapped around the App Router
- **Type-safe state access**: Custom hooks that infer types from the store configuration
- **Client/Server boundaries**: Proper use of `"use client"` directives in Next.js 16

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit 2.11](https://redux-toolkit.js.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Turbopack](https://turbo.build/)

## Installation

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-redux-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Usage

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

### Example: Adding a New Redux Slice

1. Create a new slice in `store/slices/`:

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  data: string;
}

const initialState: ExampleState = {
  data: "",
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = exampleSlice.actions;
export default exampleSlice.reducer;
```

2. Register the slice in `store/store.ts`:

```typescript
import exampleSlice from "./slices/exampleSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    example: exampleSlice, // Add here
  },
});
```

## Project Structure

```
nextjs-redux-app/
├── actions/              # Server actions
│   └── products.tsx
├── app/                  # Next.js App Router
│   ├── counter/         # Counter demo page
│   ├── shop/            # Shop demo page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── loading.tsx      # Loading UI
│   └── page.tsx         # Home page
├── components/          # React components
│   └── ui/              # UI components
│       ├── Counter.tsx
│       ├── CounterValue.tsx
│       └── Product.tsx
├── lib/                 # Utility functions
│   └── utils.ts
├── providers/           # Context providers
│   └── Providers.tsx    # Redux Provider wrapper
├── public/              # Static assets
├── store/               # Redux store configuration
│   ├── store.ts         # Store setup
│   ├── hooks/
│   │   └── hooks.ts     # Typed Redux hooks
│   └── slices/
│       └── counterSlice.ts
├── types/               # TypeScript type definitions
│   └── types.ts
└── package.json
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific configuration:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### ESLint Configuration

The project uses Next.js ESLint configuration. Customize rules in `eslint.config.mjs`.

### TypeScript Configuration

TypeScript settings are defined in `tsconfig.json` with strict mode enabled for type safety.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## Testing & Quality

The project is configured with:

- **ESLint**: Static code analysis with Next.js recommended rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

To maintain code quality:

```bash
npm run lint
```

## Contribution Guidelines

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure:
- Code follows the existing style and conventions
- TypeScript types are properly defined
- ESLint passes without errors
- Commit messages are clear and descriptive

## Roadmap

Planned features and improvements:

- [ ] Multi-step form with Redux state management
- [ ] Shopping cart functionality with product management
- [ ] Redux persist for state persistence
- [ ] Unit tests with Jest and React Testing Library
- [ ] Integration tests for Redux flows
- [ ] API integration examples with RTK Query
- [ ] Dark/light theme toggle

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built with modern web development tools and best practices:

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
