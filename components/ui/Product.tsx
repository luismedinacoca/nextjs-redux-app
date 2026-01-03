"use client";
import { useState, useEffect } from "react";
import { Check, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { Product as ProductType } from "@/types/types";
import { addProductToCart, removeProductFromCart } from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import toast from "react-hot-toast";

const Product = ({ product }: { product: ProductType }) => {
  const [existing, setExisting] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const toastStyles = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  const CartToast = ({
    title,
    action,
    icon,
    color,
  }: {
    title: string;
    action: string;
    icon: React.ReactNode;
    color: keyof typeof toastStyles;
  }) => {
    const styles = toastStyles[color];

    return (
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${styles.bg} ${styles.text}`}>{icon}</div>

        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">
            Item <span className={`italic font-bold ${styles.text}`}>{action}</span> successfully
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // check if poroduct already exits in cart:
    const isExisting = cartItems.some((item) => item.id === product.id);
    setExisting(isExisting);
  }, [cartItems, product.id]);
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    const newCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      description: product.description,
    };

    dispatch(addProductToCart(newCartItem));
    localStorage.setItem("cart", JSON.stringify([...cartItems, newCartItem]));
    setExisting(true);
    // toast.success(
    //   <span>
    //     Item:{" "}
    //     <strong className="text-green-500 font-bold">
    //       {product.title} <span className="italic">added</span>
    //     </strong>{" "}
    //     successfully!
    //   </span>
    // );
    toast.success(
      <CartToast title={product.title} action="added to cart" color="green" icon={<ShoppingBag className="w-4 h-4" />} />
    );
  };

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(product.id));
    localStorage.setItem("cart", JSON.stringify(cartItems.filter((item) => item.id !== id)));
    setExisting(false);
    // toast.success(
    //   <span>
    //     Item:{" "}
    //     <strong className="text-red-500 font-bold">
    //       {product.title} <span className="italic">removed</span>
    //     </strong>{" "}
    //     from cart successfully!
    //   </span>
    // );
    toast.success(
      <CartToast title={product.title} action="removed from cart" color="red" icon={<ShoppingBag className="w-4 h-4" />} />
    );
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow-lg p-4 transition-transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative bg-gray-100 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <Star className="w-5 h-5" />
        </button>

        <Image
          src={product.images?.[0] ?? "/macbook-14.png"}
          alt={product.title}
          width={160}
          height={160}
          className="object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>

        <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">{product.description}</p>

        <p className="mt-3 font-bold text-gray-900">${product.price}</p>

        {/* Button inside card */}
        {existing ? (
          <Button
            variant="destructive"
            onClick={() => handleRemove(product.id!)}
            className="mt-4 w-full rounded-full flex items-center justify-center text-xs min-[375px]:text-sm py-1.5 min-[375px]:py-2"
          >
            <ShoppingBag className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 mr-1 min-[375px]:mr-2" />
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            className="mt-4 w-full rounded-full flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-xs min-[375px]:text-sm py-1.5 min-[375px]:py-2"
          >
            <ShoppingBag className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 mr-1 min-[375px]:mr-2" />
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;
