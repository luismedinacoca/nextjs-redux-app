"use client";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  type QuantityById = Record<string, number>;

  // Estado para las cantidades (si no existe, por defecto es 1)
  const [quantityById, setQuantityById] = useState<QuantityById>({});

  const getQuantity = (id: number) => {
    const key = String(id);
    return quantityById[key] ?? 1;
  };

  // Funciones para modificar cantidad
  const incrementQuantity = (id: number) => {
    const key = String(id);

    setQuantityById((prev) => {
      const currentQuantity = prev[key] ?? 1;
      return { ...prev, [key]: currentQuantity + 1 };
    });
  };

  const decrementQuantity = (id: number) => {
    const key = String(id);

    setQuantityById((prev) => {
      const currentQuantity = prev[key] ?? 1;
      const nextQuantity = Math.max(currentQuantity - 1, 1);

      if (nextQuantity === currentQuantity) {
        return prev;
      }

      return { ...prev, [key]: nextQuantity };
    });
  };

  // Calcular subtotal, tax y total
  const subtotal = cartItems.reduce((sum, item) => {
    const quantity = getQuantity(item.id);
    return sum + item.price * quantity;
  }, 0);

  const taxRate = 0.1; // 10% de impuesto
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

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

                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => decrementQuantity(prod.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={getQuantity(prod.id) <= 1}
                    >
                      <span className="text-lg font-medium">−</span>
                    </button>

                    <div className="min-w-14 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900">{getQuantity(prod.id)}</span>
                    </div>

                    <button
                      onClick={() => incrementQuantity(prod.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="font-medium text-gray-900">${(prod.price * getQuantity(prod.id)).toFixed(2)}</span>

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
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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
