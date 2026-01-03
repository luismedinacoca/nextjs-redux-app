"use client";
import { useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { Product as ProductType } from "@/types/types";
import { addProductToCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks/hooks";
import toast from "react-hot-toast";

const Product = ({ product }: { product: ProductType }) => {
  const [existing, setExisting] = useState(false);
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
    setExisting(true);
    toast.success(
      <span>
        Item: <strong>{product.title}</strong> added successfully!
      </span>
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
            onClick={handleAdd}
            className="mt-4 w-full rounded-full flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            className="mt-4 w-full rounded-full flex items-center justify-center bg-orange-400 hover:bg-orange-500"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;

{
  /*
<div className="flex flex-col items-center justify-center ">
      <Image
        className="w-36 h-36 object-cover rounded"
        width={300}
        height={300}
        src={product.images[0] ?? "/macbook-14.png"}
        alt={product.title}
      />
      <h3 className="font-semibold text-xl">{product.title}</h3>
      <p className="font-semibold text-sm py-2">Price: ${product.price}</p>
      <Button>
        <ShoppingBag className="w-4 h-4 mr-2" />
        <span>Add to Cart</span>
      </Button>
    </div>
*/
}
