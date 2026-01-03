"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { removeProductFromCart } from "@/store/slices/cartSlice";

const Page = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id));
    localStorage.setItem("cart", JSON.stringify(cartItems.filter((item) => item.id !== id)));
  };

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
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
          <span className="text-sm text-gray-500">{cartItems.length} items</span>
        </div>

        {cartItems.length > 0 ? (
          <>
            {/* Encabezados de columnas (solo en desktop) */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b">
              <div className="md:col-span-5">
                <span className="text-sm font-medium text-gray-500">Product</span>
              </div>
              <div className="md:col-span-2 text-center">
                <span className="text-sm font-medium text-gray-500">Quantity</span>
              </div>
              <div className="md:col-span-2 text-center md:text-right">
                <span className="text-sm font-medium text-gray-500">Price</span>
              </div>
              <div className="md:col-span-3 text-center md:text-right">
                <span className="text-sm font-medium text-gray-500">Action</span>
              </div>
            </div>

            <div className="divide-y">
              {cartItems.map((prod) => (
                <div key={prod.id} className="border-b last:border-b-0 px-4 py-6">
                  {/* Fila superior para móvil, en desktop se mantiene el grid */}
                  <div className="md:grid md:grid-cols-12 md:gap-6">
                    {/* Producto - en móvil ocupa toda la fila, en desktop 5 columnas */}
                    <div className="md:col-span-5 flex items-start gap-4 mb-4 md:mb-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                        <Image
                          src={prod.image ?? "/macbook-14.png"}
                          alt={prod.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900">{prod.title}</h3>
                        <div className="mt-1">
                          <span className="text-sm text-gray-600">Unit: ${prod.price.toFixed(2)}</span>
                        </div>
                      </div>
                      {/* En móvil, el botón de eliminar se coloca aquí, a la derecha */}
                      <div className="block md:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-2 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    {/* Cantidad - en móvil ocupa toda la fila, centrada; en desktop 2 columnas */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center mb-4 md:mb-0">
                      <span className="text-sm font-medium text-gray-500 mb-2 md:hidden">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrementQuantity(prod.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={getQuantity(prod.id) <= 1}
                        >
                          <span className="text-lg font-medium">−</span>
                        </button>
                        <div className="min-w-10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-900">{getQuantity(prod.id)}</span>
                        </div>
                        <button
                          onClick={() => incrementQuantity(prod.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200"
                        >
                          <span className="text-lg font-medium">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Precio - en móvil oculto, en desktop 2 columnas, alineado a la derecha */}
                    <div className="hidden md:flex md:col-span-2 flex-col items-end justify-center">
                      <div className="text-right">
                        <div className="font-medium text-gray-900 text-lg">
                          ${(prod.price * getQuantity(prod.id)).toFixed(2)}
                        </div>
                        {getQuantity(prod.id) > 1 && (
                          <div className="text-sm text-gray-500 mt-1">${prod.price.toFixed(2)} each</div>
                        )}
                      </div>
                    </div>

                    {/* Acción (Eliminar) - en móvil oculto (ya se mostró arriba), en desktop 3 columnas, alineado a la derecha */}
                    <div className="hidden md:flex md:col-span-3 items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                        onClick={() => handleRemove(prod.id)}
                      >
                        <Trash className="w-7 h-7" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-end border-t px-6 py-6">
              <div className="w-full md:w-1/2 space-y-3">
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

                <div className="flex min-[441px]:justify-end mt-4">
                  <Button className="w-full px-8 rounded-full bg-red-500 hover:bg-red-600 min-[441px]:w-[55%]">
                    Proceed to checkout →
                  </Button>
                </div>
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
