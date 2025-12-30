import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { Product as ProductType } from "@/types/types";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <div
      className="
        group
        flex flex-col items-center justify-between
        p-4
        bg-[#F9DFDF]
        border border-gray-200 rounded-xl
        shadow-md
        transition-colors
        duration-1250
        ease-in-out
        hover:bg-[#BBE0EF]
      "
    >
      <div className="overflow-hidden rounded-md">
        <Image
          className="
            w-36 h-36 object-cover
            transition-transform
            duration-900
            ease-in-out
            group-hover:scale-110
          "
          width={300}
          height={300}
          src={product.images?.[0] ?? "/macbook-14.png"}
          alt={product.title}
        />
      </div>

      <h3 className="mt-4 font-semibold text-xl text-center text-gray-900">{product.title}</h3>

      <p className="mt-2 font-bold text-sm text-gray-700">Price: ${product.price}</p>

      <Button className="mt-4 flex items-center justify-center">
        <ShoppingBag className="w-4 h-4 mr-2" />
        <span>Add to Cart</span>
      </Button>
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
