# Redux Cart Flow (Next.js App Router) — Lecture Notes

This project implements a simple cart using **Redux Toolkit** + **React Redux** in a **Next.js (App Router)** application.

## Key files (what they do)

- **`types/types.ts`**: Source of truth for the `Product` shape returned by the API (`dummyjson.com`).
- **`actions/products.tsx`**: Server-side data fetch for products (`getAllProducts()`).
- **`app/shop/page.tsx`**: Server Component that fetches products and renders a list of `<Product />` cards.
- **`components/ui/Product.tsx`**: Client Component that lets the user add/remove the product to/from the cart (Redux + `localStorage` + toast).
- **`store/slices/cartSlice.ts`**: Redux Toolkit slice with `addProductToCart` / `removeProductFromCart` reducers and a `localStorage`-based initial state.
- **`store/store.ts`**: Redux store configuration (registers `cart` and `counter` slices).
- **`store/hooks/hooks.ts`**: Typed hooks (`useAppDispatch`, `useAppSelector`) for type-safe access to Redux.
- **`providers/Providers.tsx`**: Client wrapper that mounts React Redux `<Provider store={store} />` (and the toast `<Toaster />`).
- **`app/layout.tsx`**: Root layout that wraps the entire app with `<Providers>`.
- **`app/cart/page.tsx`**: Client cart page that reads `cartItems` from Redux and can remove items (also handles quantities locally).

## Redux wiring (how state becomes global)

### 1) Store creation

- `store/store.ts` creates a Redux store via `configureStore()`.
- It registers reducers under keys:
  - `counter`
  - `cart`

### 2) Provider at the root

- `providers/Providers.tsx` is a **Client Component** (`"use client"`).
- It renders:
  - `<Provider store={store}>` to make the Redux store available to all descendants
  - `<Toaster />` for toast notifications

### 3) Layout wraps the whole app

- `app/layout.tsx` uses `<Providers>` so every route can dispatch actions and read state.

### 4) Typed hooks for dispatch/select

- `store/hooks/hooks.ts` defines:
  - `useAppDispatch` (typed dispatch)
  - `useAppSelector` (typed selector)

This avoids repeatedly typing `RootState` and `AppDispatch` across components.

## Cart state model (what’s in Redux)

### State shape (cart slice)

- `state.cart.cartItems` is an array of cart items.
- The cart slice reads from `localStorage` at initialization to preload persisted cart contents.

### Persistence (important detail)

- **Redux is the source of truth in-memory.**
- `localStorage` is updated manually in UI components after dispatching actions.
- On refresh, the cart slice initializes from `localStorage` again.

## Flow: Add product to cart (Shop → Product card)

### Where it starts

- The user is on `app/shop/page.tsx` (server-rendered list).
- Each product is rendered using the client component `components/ui/Product.tsx`.

### What happens when “Add to cart” is clicked

- `Product.tsx` builds `newCartItem` from the `Product` data.
- It dispatches `addProductToCart(newCartItem)`.
- The cart reducer pushes the item into `state.cart.cartItems`.
- The component writes the updated array to `localStorage`.
- A toast is shown, and UI toggles to “Remove from cart” because:
  - `useAppSelector` observes the updated Redux state
  - `useEffect` recomputes `existing` based on `cartItems`

## Flow: Remove product/item from cart

There are **two removal entry points** in this project:

### A) Remove from the product card (Shop page)

- Click “Remove from cart” in `components/ui/Product.tsx`.
- Dispatch `removeProductFromCart(product.id)`.
- Update `localStorage` to remove the item.
- The UI flips back to “Add to cart”.

### B) Remove from the cart page

- Go to `app/cart/page.tsx`.
- Click the trash button (desktop has `onClick`, mobile icon currently renders without an `onClick`).
- `handleRemove(id)` dispatches `removeProductFromCart(id)` and updates `localStorage`.
- The cart list re-renders from Redux state.

> Note: Quantity and totals are **local component state** in `app/cart/page.tsx` (`quantityById`). They are not stored in Redux.

## Mermaid sequence diagram (Add + Remove)

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant Shop as Shop Page (Server Component)
  participant Card as Product Card (Client Component)
  participant RH as React-Redux Provider
  participant Store as Redux Store
  participant Slice as cartSlice Reducer
  participant LS as localStorage
  participant Cart as Cart Page (Client Component)

  Note over Shop,Card: Shop page fetches products server-side and renders Product cards.
  Shop->>Card: Render product list (props: Product)
  RH->>Store: Store is provided via <Provider>

  alt Add product to cart (from Product card)
    U->>Card: Click "Add to cart"
    Card->>Store: dispatch(addProductToCart(newCartItem))
    Store->>Slice: reducer addProductToCart
    Slice-->>Store: state.cart.cartItems.push(item)
    Store-->>Card: cartItems updated (selector re-runs)
    Card->>LS: setItem("cart", JSON.stringify(updatedCart))
    Card-->>U: Toast "added to cart" + button becomes "Remove"
  else Remove product (from Product card)
    U->>Card: Click "Remove from cart"
    Card->>Store: dispatch(removeProductFromCart(product.id))
    Store->>Slice: reducer removeProductFromCart
    Slice-->>Store: state.cart.cartItems = filter(id !== payload)
    Store-->>Card: cartItems updated (selector re-runs)
    Card->>LS: setItem("cart", JSON.stringify(filteredCart))
    Card-->>U: Toast "removed from cart" + button becomes "Add"
  else Remove product (from Cart page)
    U->>Cart: Click trash icon (desktop)
    Cart->>Store: dispatch(removeProductFromCart(id))
    Store->>Slice: reducer removeProductFromCart
    Slice-->>Store: state.cart.cartItems filtered
    Store-->>Cart: cartItems updated (selector re-runs)
    Cart->>LS: setItem("cart", JSON.stringify(filteredCart))
    Cart-->>U: Item disappears from cart list
  end
```

---

## Additional diagrams (Redux / Store / Slice / Providers)

### 1) App architecture diagram (Provider → Store → UI)

```mermaid
flowchart TB
  subgraph NextApp["Next.js App Router"]
    Layout["app/layout.tsx (Server Component)"]
    Providers["providers/Providers.tsx (Client Component)"]
  end

  subgraph Redux["Redux Layer"]
    Store["store/store.ts (configureStore)"]
    CartSlice["store/slices/cartSlice.ts (createSlice: cart)"]
    CounterSlice["store/slices/counterSlice.ts (createSlice: counter)"]
    TypedHooks["store/hooks/hooks.ts (useAppDispatch/useAppSelector)"]
  end

  subgraph UI["UI Layer"]
    Shop["app/shop/page.tsx (Server Component)"]
    ProductCard["components/ui/Product.tsx (Client Component)"]
    CartPage["app/cart/page.tsx (Client Component)"]
  end

  Layout --> Providers
  Providers --> Store

  Store --> CartSlice
  Store --> CounterSlice

  ProductCard --> TypedHooks
  CartPage --> TypedHooks

  TypedHooks --> Store

  Shop --> ProductCard
  Shop -->|Link| CartPage
```

### 2) Redux update cycle (what happens on a click)

```mermaid
flowchart LR
  U["User click"] --> Evt["UI handler (handleAdd or handleRemove)"]
  Evt --> D["dispatch action"]
  D --> S["Redux store"]
  S --> R["slice reducer runs"]
  R --> NS["next state produced"]
  NS --> N["react-redux notifies subscribers"]
  N --> Sel["selectors re-run"]
  Sel --> RR["subscribed components re-render"]
  RR --> U
```

### 3) “Redux classes” view (UML-ish class diagram)

```mermaid
classDiagram
  direction LR

  class Product {
    +number id
    +string title
    +string description
    +number price
    +string[] images
  }

  class CartItem {
    +number id
    +string title
    +number price
    +string image
    +string description
  }

  class CartState {
    +CartItem[] cartItems
  }

  class RootState {
    +counter: CounterState
    +cart: CartState
  }

  class Store {
    +dispatch(action): void
    +getState(): RootState
  }

  class CartSlice {
    +addProductToCart(item: CartItem)
    +removeProductFromCart(id: number)
  }

  class Providers {
    +children: ReactNode
  }

  class ProductCard {
    +product: Product
    +handleAdd(): void
    +handleRemove(id: number): void
  }

  class CartPage {
    +handleRemove(id: number): void
    +quantityById: Record~string, number~
  }

  Product <|-- CartItem : mappedFrom
  CartState "1" o-- "many" CartItem : cartItems
  RootState "1" o-- "1" CartState : cart
  Store "1" o-- "1" RootState : state
  Store ..> CartSlice : usesReducer

  Providers ..> Store : provides
  ProductCard ..> Store : dispatch/select
  CartPage ..> Store : dispatch/select
```

### 3.1) Sequence diagram based on the class diagram (state update using Store + CartSlice)

```mermaid
sequenceDiagram
  autonumber
  participant Providers
  participant Store
  participant CartSlice
  participant RootState
  participant ProductCard
  participant CartPage

  Note over Providers,Store: Providers exposes Store to components.

  alt Add item from ProductCard
    ProductCard->>Store: dispatch addProductToCart(item)
    Store->>CartSlice: addProductToCart reducer
    CartSlice-->>RootState: cart.cartItems updated
    RootState-->>Store: next state available
    Store-->>ProductCard: selected cartItems updated
    Store-->>CartPage: selected cartItems updated
  else Remove item from CartPage
    CartPage->>Store: dispatch removeProductFromCart(id)
    Store->>CartSlice: removeProductFromCart reducer
    CartSlice-->>RootState: cart.cartItems updated
    RootState-->>Store: next state available
    Store-->>ProductCard: selected cartItems updated
    Store-->>CartPage: selected cartItems updated
  end
```

### 4) React-Redux subscription + re-render boundaries (why only some components re-render)

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant C as Client Component (Product.tsx / cart/page.tsx)
  participant H as Typed hooks (useAppDispatch/useAppSelector)
  participant RR as React-Redux (Provider + subscription)
  participant S as Redux Store
  participant R as cartSlice reducer

  Note over RR,S: Provider sets up a subscription to store updates.
  U->>C: Click button (add/remove)
  C->>H: useAppDispatch()
  H->>S: dispatch(action)
  S->>R: run reducer with (state, action)
  R-->>S: next state
  S-->>RR: notify subscribers "state changed"
  RR-->>H: re-run useSelector selectors for subscribed components
  H-->>C: selector returns new selected value (cartItems)
  alt selected value changed (by reference / equality)
    C-->>C: component re-renders with new props/state
  else selected value unchanged
    C-->>C: no re-render triggered by Redux
  end
```

### 5) Typed hooks “type flow” (where RootState/AppDispatch come from)

```mermaid
flowchart TB
  StoreFile[store/store.ts] -->|exports| RootState[RootState = ReturnType<typeof store.getState>]
  StoreFile -->|exports| AppDispatch[AppDispatch = typeof store.dispatch]

  RootState --> HooksFile[store/hooks/hooks.ts]
  AppDispatch --> HooksFile

  HooksFile --> useAppSelector["useAppSelector: useSelector.withTypes(RootState)"]
  HooksFile --> useAppDispatch["useAppDispatch: useDispatch.withTypes(AppDispatch)"]

  useAppSelector --> Components["Client Components (Product.tsx, cart/page.tsx, CounterValue, ...)"]
  useAppDispatch --> Components
```

### 6) Persistence boundaries (Redux vs localStorage)

```mermaid
flowchart TB
  subgraph Memory["In memory"]
    RS["Redux state cartItems"]
  end

  subgraph Disk["localStorage"]
    LS["key cart"]
  end

  Init["App start or refresh"] --> Read["read stored cart"]
  Read --> RS

  Act["Add or remove action"] --> RS
  RS --> Write["UI writes updated array"]
  Write --> LS
```

