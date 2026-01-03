"use client";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const Page = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="bg-[#f2f7ff] min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
          <span className="text-sm text-gray-500">{cartItems.length} items</span>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="divide-y">
              {cartItems.map((prod) => (
                <div key={prod.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-6">
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={prod.image ?? "/macbook-14.png"}
                      alt={prod.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />

                    <div>
                      <p className="text-sm text-gray-500">Product</p>
                      <h3 className="font-medium text-gray-900">{prod.title}</h3>
                    </div>
                  </div>

                  {/* Quantity (UI only by now) */}
                  <div className="flex items-center justify-center gap-3">
                    <button className="w-8 h-8 border rounded text-gray-500 hover:bg-gray-100">-</button>
                    <span className="w-8 text-center text-sm font-medium">1</span>
                    <button className="w-8 h-8 border rounded text-gray-500 hover:bg-gray-100">+</button>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="font-medium text-gray-900">${prod.price}</span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-2
                      rounded-full
                      text-red-500
                      hover:text-red-600
                      hover:bg-red-50
                      transition-colors
                      duration-200"
                    >
                      <Trash className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="flex justify-end border-t px-6 py-6">
              <div className="w-full sm:w-1/2 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  {/* <span>${tax.toFixed(2)}</span> */}
                </div>

                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  {/* <span>${total.toFixed(2)}</span> */}
                </div>

                <Button className="w-full mt-4 rounded-full bg-red-500 hover:bg-red-600">Proceed to checkout →</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-gray-700 text-3xl">No items in cart</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
