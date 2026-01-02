"use client";

import { useAppSelector } from "@/store/hooks/hooks";

const Page = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  console.log("CartItems", cartItems);
  return (
    <div>
      <h2>Shopping Cart ({cartItems.length})</h2>
    </div>
  );
};

export default Page;
